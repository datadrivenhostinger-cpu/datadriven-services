import { Button, Container, ContactForm, Reveal, SITE } from './ui'

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden pastel-band py-14 text-ink lg:py-20">
      <Container className="relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
        <Reveal className="lg:col-span-7">
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-1.5 font-mono text-[13px] text-ink shadow-card">
            <span className="h-2 w-2 rounded-full bg-ember" />
            Contact Us
          </div>
          <h2 className="font-display text-[clamp(1.84rem,5.6vw,3.69rem)] font-bold leading-[1.02] tracking-[-0.035em]">
            Lead Generation <span className="text-ember-deep">Made Easy!</span>
          </h2>
          <p className="mt-8 max-w-lg text-[16px] leading-[1.75] text-ink/70">
            Contact us for a free consultation to take your business to the next level.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={SITE + 'contact/'}>Make Appointment</Button>
            <Button href="/book-a-meeting" variant="outline">Book a Meeting</Button>
          </div>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-5">
          <div className="rounded-[2rem] bg-white p-7 shadow-lift sm:p-10">
            <ContactForm light />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
