
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
    // This flow is for demonstration purposes.
    // In a real application, you would integrate an email service here.
    console.log('Contact form submission received:', input);
  }
);
