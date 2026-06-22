import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

export const metadata = { title: "Privacy Policy — Mulberry" };

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-ivory">
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <Reveal>
          <SectionLabel>Legal</SectionLabel>
          <h1 className="font-serif text-4xl font-normal text-ink md:text-5xl">Privacy Policy</h1>
          <p className="mt-6 text-sm text-stone">Last updated: 2026</p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 space-y-8 text-sm leading-relaxed text-stone">
            <p>
              This is placeholder policy content for Mulberry Empire ("Mulberry," "we," "us"). It outlines, in
              general terms, how we intend to handle customer information. Replace this section with your
              finalized privacy policy, ideally reviewed by counsel, before launch.
            </p>
            <div>
              <h2 className="mb-2 text-sm uppercase tracking-widest2 text-ink">Information We Collect</h2>
              <p>
                Contact details (name, email, shipping address) provided at checkout or newsletter signup,
                and payment information processed securely through Stripe — we do not store full card details
                on our servers.
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-sm uppercase tracking-widest2 text-ink">How We Use It</h2>
              <p>
                To fulfill orders, respond to inquiries, and — only if you opt in — send the Dispatch
                newsletter. We do not sell customer data to third parties.
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-sm uppercase tracking-widest2 text-ink">Your Rights</h2>
              <p>
                You may request access to, correction of, or deletion of your personal data at any time by
                contacting info@mulberryempire.com.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
