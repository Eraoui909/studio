"use client";

import { TerminalContactForm } from "@/components/terminal-contact-form";

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-32">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Contact & Connect
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a project in mind or just want to say hi? Let's connect.
        </p>
      </div>
      <div className="mt-12">
        <TerminalContactForm />
      </div>
    </section>
  );
}
