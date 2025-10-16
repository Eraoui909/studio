
'use server';

/**
 * @fileOverview A flow for handling contact form submissions.
 *
 * - sendContactEmail - A function that sends an email with the contact form data.
 * - ContactFormInput - The input type for the sendContactEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { ContactFormInputSchema, type ContactFormInput } from '@/lib/types';


export async function sendContactEmail(input: ContactFormInput): Promise<void> {
  return contactFlow(input);
}

const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    console.log('New contact form submission:');
    console.log(`From: ${input.name} <${input.email}>`);
    console.log(`Message: ${input.message}`);

    // In a real application, you would use an email service here.
    // For example, using a hypothetical 'email' plugin:
    /*
    await ai.tool('sendEmail').run({
      to: personalData.contact.email,
      subject: `New message from ${input.name} via your portfolio`,
      body: `
        You have a new contact form submission:

        Name: ${input.name}
        Email: ${input.email}

        Message:
        ${input.message}
      `,
    });
    */

    // For now, we just log to the console to show it's working.
    // To implement actual email sending, you would need to integrate a service like Resend, SendGrid, or Nodemailer.
  }
);
