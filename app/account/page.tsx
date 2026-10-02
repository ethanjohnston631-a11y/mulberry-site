"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import { useCart } from "@/lib/cart-context";

type Order = {
  id: string;
  number: string;
  created: number;
  total: number;
  currency: string;
  status: string;
  preorder: boolean;
  items: { description: string; quantity: number }[];
};

const field =
  "mt-2 w-full border-b border-black/20 bg-transparent py-3 text-base text-ink focus:border-ink focus:outline-none";
const primary =
  "bg-ink px-9 py-4 text-[11px] uppercase tracking-widest2 text-bone transition hover:bg-gold disabled:opacity-50";
const quiet = "text-[11px] uppercase tracking-widest2 text-stone underline-offset-4 transition hover:text-ink hover:underline";

async function post(url: string, body: unknown, method = "POST") {
  const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
  return data;
}

export default function AccountPage() {
  const { user, sessionLoaded, accountsEnabled, setUser } = useCart();

  return (
    <main className="bg-ivory">
      <section className="mx-auto max-w-2xl px-6 py-20 lg:px-10">
        <SectionLabel>Account</SectionLabel>
        {!sessionLoaded ? (
          <p className="text-sm text-stone" aria-live="polite">Loading…</p>
        ) : !accountsEnabled ? (
          <>
            <h1 className="font-serif text-4xl font-normal text-ink md:text-5xl">Accounts are coming soon.</h1>
            <p className="mt-4 text-sm leading-relaxed text-stone">
              Your bag is saved on this device in the meantime. For anything about an order, write to{" "}
              <a href="mailto:info@mulberryempire.com" className="text-gold underline underline-offset-2">info@mulberryempire.com</a>.
            </p>
          </>
        ) : user ? (
          <SignedIn email={user.email} marketingOptIn={user.marketingOptIn} onSignedOut={() => setUser(null)} onUpdate={setUser} />
        ) : (
          <SignIn onSignedIn={setUser} />
        )}
      </section>
    </main>
  );
}

function SignIn({ onSignedIn }: { onSignedIn: (u: { email: string; marketingOptIn: boolean }) => void }) {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function requestCode(e?: FormEvent) {
    e?.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await post("/api/auth/request-code", { email });
      setStep("code");
      setNotice(`We sent a 6-digit code to ${email}. It expires in 10 minutes.`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function verify(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { user } = await post("/api/auth/verify-code", { email, code });
      onSignedIn(user);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h1 className="font-serif text-4xl font-normal text-ink md:text-5xl">Sign in or create an account.</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">
        No password to remember. We&apos;ll email you a one-time code. Your bag follows you across devices and your
        orders are kept in one place.
      </p>

      {step === "email" ? (
        <form onSubmit={requestCode} className="mt-12 space-y-8">
          <div>
            <label htmlFor="account-email" className="text-[11px] uppercase tracking-widest2 text-stone">Email</label>
            <input
              id="account-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={field}
            />
          </div>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={busy} className={primary}>{busy ? "Sending…" : "Email Me a Code"}</button>
        </form>
      ) : (
        <form onSubmit={verify} className="mt-12 space-y-8">
          {notice && <p className="text-sm text-stone" aria-live="polite">{notice}</p>}
          <div>
            <label htmlFor="account-code" className="text-[11px] uppercase tracking-widest2 text-stone">6-digit code</label>
            <input
              id="account-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className={`${field} font-serif text-2xl tracking-[0.5em]`}
            />
          </div>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <div className="flex flex-wrap items-center gap-6">
            <button type="submit" disabled={busy || code.length !== 6} className={primary}>
              {busy ? "Verifying…" : "Sign In"}
            </button>
            <button type="button" onClick={() => requestCode()} disabled={busy} className={quiet}>Resend code</button>
            <button type="button" onClick={() => { setStep("email"); setCode(""); setError(null); }} className={quiet}>
              Use a different email
            </button>
          </div>
        </form>
      )}

      <p className="mt-12 text-xs leading-relaxed text-stone">
        By signing in you agree to our <Link href="/terms" className="underline underline-offset-2">Terms</Link> and
        acknowledge our <Link href="/privacy-policy" className="underline underline-offset-2">Privacy Policy</Link>.
        We only use a single essential cookie to keep you signed in.
      </p>
    </>
  );
}

function SignedIn({
  email,
  marketingOptIn,
  onSignedOut,
  onUpdate,
}: {
  email: string;
  marketingOptIn: boolean;
  onSignedOut: () => void;
  onUpdate: (u: { email: string; marketingOptIn: boolean }) => void;
}) {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [prefBusy, setPrefBusy] = useState(false);
  const [prefError, setPrefError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState("");
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/orders", { cache: "no-store" })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setOrders(data.orders);
      })
      .catch((err) => setOrdersError(err.message || "Couldn't load your orders."));
  }, []);

  async function signOut(everywhere = false) {
    await post("/api/auth/sign-out", { everywhere }).catch(() => null);
    onSignedOut();
  }

  async function toggleMarketing() {
    setPrefBusy(true);
    setPrefError(null);
    try {
      const data = await post("/api/account", { marketingOptIn: !marketingOptIn }, "PATCH");
      onUpdate({ email, marketingOptIn: data.marketingOptIn });
    } catch (err) {
      setPrefError((err as Error).message);
    } finally {
      setPrefBusy(false);
    }
  }

  async function deleteAccount(e: FormEvent) {
    e.preventDefault();
    setDeleteError(null);
    try {
      await post("/api/account", { confirm: confirmDelete }, "DELETE");
      onSignedOut();
    } catch (err) {
      setDeleteError((err as Error).message);
    }
  }

  return (
    <>
      <h1 className="font-serif text-4xl font-normal text-ink md:text-5xl">Welcome back.</h1>
      <p className="mt-3 text-sm text-stone">Signed in as <span className="text-ink">{email}</span></p>

      <div className="mt-16">
        <h2 className="text-[11px] uppercase tracking-widest2 text-ink">Orders</h2>
        <div className="mt-4 border-t border-black/10">
          {ordersError ? (
            <p role="alert" className="py-6 text-sm text-red-700">{ordersError}</p>
          ) : orders === null ? (
            <p className="py-6 text-sm text-stone" aria-live="polite">Loading your orders…</p>
          ) : orders.length === 0 ? (
            <p className="py-6 text-sm text-stone">
              No orders yet. <Link href="/products" className="text-ink underline underline-offset-2">Visit the shop</Link>.
            </p>
          ) : (
            <ul className="divide-y divide-black/10">
              {orders.map((o) => (
                <li key={o.id} className="py-6 text-sm">
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="font-medium text-ink">{o.number}</span>
                    <span className="text-stone">
                      {new Date(o.created * 1000).toLocaleDateString(undefined, { dateStyle: "medium" })}
                    </span>
                  </div>
                  <ul className="mt-2 text-stone">
                    {o.items.map((i, idx) => (
                      <li key={idx}>{i.quantity} × {i.description}</li>
                    ))}
                  </ul>
                  <div className="mt-2 flex justify-between text-stone">
                    <span>{o.status}{o.preorder ? " · Pre-order" : ""}</span>
                    <span className="text-ink">${o.total.toFixed(2)} {o.currency}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="mt-3 text-xs text-stone">
          Need to change, cancel or return something? <Link href="/contact" className="underline underline-offset-2">Contact us</Link> with your order number.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-[11px] uppercase tracking-widest2 text-ink">Email Preferences</h2>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-6">
          <p className="max-w-sm text-sm text-stone">
            {marketingOptIn
              ? "You're receiving The Dispatch: release news, restocks and care notes."
              : "You're not subscribed to The Dispatch. Order emails are always sent."}
          </p>
          <button onClick={toggleMarketing} disabled={prefBusy} className={quiet}>
            {marketingOptIn ? "Unsubscribe" : "Subscribe"}
          </button>
        </div>
        {prefError && <p role="alert" className="mt-2 text-sm text-red-700">{prefError}</p>}
      </div>

      <div className="mt-16">
        <h2 className="text-[11px] uppercase tracking-widest2 text-ink">Security &amp; Privacy</h2>
        <div className="mt-4 flex flex-col gap-4 border-t border-black/10 pt-6 sm:flex-row sm:flex-wrap sm:gap-8">
          <button onClick={() => signOut(false)} className={quiet}>Sign out</button>
          <button onClick={() => signOut(true)} className={quiet}>Sign out of all devices</button>
          <a href="/api/account/export" className={quiet}>Download my data</a>
        </div>

        <form onSubmit={deleteAccount} className="mt-10 border border-black/10 p-6">
          <h3 className="text-sm font-medium text-ink">Delete account</h3>
          <p className="mt-2 text-xs leading-relaxed text-stone">
            This permanently removes your account, saved bag and email preferences. Records of past orders are kept by our
            payment processor as required for tax and accounting. Type DELETE to confirm.
          </p>
          <label htmlFor="confirm-delete" className="sr-only">Type DELETE to confirm</label>
          <input
            id="confirm-delete"
            value={confirmDelete}
            onChange={(e) => setConfirmDelete(e.target.value)}
            className={`${field} max-w-xs text-sm`}
            autoComplete="off"
          />
          {deleteError && <p role="alert" className="mt-2 text-sm text-red-700">{deleteError}</p>}
          <button
            type="submit"
            disabled={confirmDelete !== "DELETE"}
            className="mt-4 border border-red-700 px-6 py-3 text-[11px] uppercase tracking-widest2 text-red-700 transition hover:bg-red-700 hover:text-white disabled:opacity-40"
          >
            Delete My Account
          </button>
        </form>
      </div>
    </>
  );
}
