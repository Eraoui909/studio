
import { OpenSource } from "@/components/sections/open-source";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open Source | Hamza Eraoui',
  description: 'A showcase of open source projects and contributions by Hamza Eraoui.',
};


export default function OpenSourcePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-20 sm:py-32 md:px-8">
      <OpenSource />
    </div>
  );
}
