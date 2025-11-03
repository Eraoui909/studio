
'use client';

import * as React from 'react';
import { archiveItems } from '@/lib/archive-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Link as LinkIcon } from 'lucide-react';

export default function ArchivePage() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredItems = archiveItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  React.useEffect(() => {
    document.title = 'Archive | Hamza Eraoui';
  }, []);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-20 sm:py-32 md:px-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Archive
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A curated collection of useful links, tools, and resources.
        </p>
      </div>

      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm mx-auto"
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Resource</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.title}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="text-muted-foreground hidden md:table-cell">{item.description}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-8 w-8 text-primary hover:text-primary/80"
                  >
                    <LinkIcon className="h-4 w-4" />
                    <span className="sr-only">Visit link</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
