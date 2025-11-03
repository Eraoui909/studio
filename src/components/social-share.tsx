
'use client';

import { Button } from '@/components/ui/button';
import { Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

type SocialShareProps = {
  url: string;
  title: string;
};

export function SocialShare({ url, title }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;

  return (
    <div className="flex items-center justify-center gap-4 mt-8 py-8 border-t">
      <p className="text-sm font-medium text-muted-foreground">Enjoyed this article? Share it!</p>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Share on Twitter</span>
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">Share on LinkedIn</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
