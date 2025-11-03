
"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, PlusCircle } from "lucide-react";

type Note = {
  id: string;
  content: string;
};

type BlogNotesProps = {
  slug: string;
};

export function BlogNotes({ slug }: BlogNotesProps) {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const localStorageKey = `blog-notes-${slug}`;

  React.useEffect(() => {
    try {
      const savedNotes = localStorage.getItem(localStorageKey);
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error("Failed to read notes from local storage:", error);
      setNotes([]);
    }
  }, [localStorageKey]);

  const saveNotes = (newNotes: Note[]) => {
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(newNotes));
    } catch (error) {
      console.error("Failed to save notes to local storage:", error);
    }
  };

  const addNote = () => {
    const newNote = { id: Date.now().toString(), content: "" };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const updateNoteContent = (id: string, content: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content } : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  return (
    <div className="space-y-4">
      <Card className="bg-muted/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <Image
                src="/logos/happy-face-bg-rm.png"
                alt="Notes Logo"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <div>
                <CardTitle className="font-headline text-lg">My Private Notes</CardTitle>
                <CardDescription className="text-xs">
                  Saved in your browser.
                </CardDescription>
              </div>
            </div>
             <Button variant="ghost" size="icon" onClick={addNote}>
                <PlusCircle className="h-5 w-5" />
               <span className="sr-only">Add Note</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="max-h-[60vh] overflow-y-auto space-y-4">
          {notes.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <p>Click the icon to add a note!</p>
            </div>
          )}
          {notes.map((note) => (
            <Card key={note.id} className="relative group">
              <CardContent className="p-0">
                <Textarea
                  value={note.content}
                  onChange={(e) => updateNoteContent(note.id, e.target.value)}
                  placeholder="Jot down your thoughts..."
                  className="min-h-[120px] resize-none border-0 focus-visible:ring-0"
                />
                 <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteNote(note.id)}
                    className="absolute top-1 right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete note</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

