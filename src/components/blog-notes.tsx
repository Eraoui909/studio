"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { NotebookPen } from "lucide-react";

type BlogNotesProps = {
  slug: string;
};

export function BlogNotes({ slug }: BlogNotesProps) {
  const [notes, setNotes] = React.useState("");
  const localStorageKey = `blog-notes-${slug}`;

  React.useEffect(() => {
    try {
      const savedNotes = localStorage.getItem(localStorageKey);
      if (savedNotes) {
        setNotes(savedNotes);
      }
    } catch (error) {
      console.error("Failed to read notes from local storage:", error);
    }
  }, [localStorageKey]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    try {
      localStorage.setItem(localStorageKey, newNotes);
    } catch (error) {
      console.error("Failed to save notes to local storage:", error);
    }
  };

  return (
    <Card className="bg-muted/30">
      <CardHeader>
        <div className="flex items-center gap-3">
          <NotebookPen className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="font-headline">My Private Notes</CardTitle>
            <CardDescription>
              Your notes are saved in your browser and are only visible to you.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Textarea
          value={notes}
          onChange={handleNotesChange}
          placeholder="Jot down your thoughts, ideas, or key takeaways here..."
          className="min-h-[150px] resize-y"
        />
      </CardContent>
    </Card>
  );
}
