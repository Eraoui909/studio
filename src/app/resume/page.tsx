
'use client';

import { personalData, experience, skills } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Briefcase, Download, GraduationCap, Mail, Phone, Linkedin, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ResumePage() {

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-20 sm:py-32 md:px-8">
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-area, .printable-area * {
            visibility: visible;
          }
          .printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none;
          }
        }
      `}</style>

      <div className="flex items-center justify-between mb-12 no-print">
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Resume
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">My professional background and skills.</p>
        </div>
        <Button onClick={handlePrint}>
          <Download className="mr-2 h-4 w-4" />
          Export to PDF
        </Button>
      </div>

      <div className="printable-area p-4 sm:p-8 border rounded-lg bg-card text-card-foreground shadow-sm">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 border-b">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">{personalData.name}</h1>
            <h2 className="text-lg sm:text-xl font-medium text-muted-foreground">{personalData.tagline}</h2>
          </div>
          <div className="mt-4 sm:mt-0 text-sm text-right">
            <a href={`mailto:${personalData.contact.email}`} className="flex items-center justify-end gap-2 mb-1 hover:text-primary">
              {personalData.contact.email} <Mail className="h-4 w-4" />
            </a>
             {personalData.contact.social.map(social => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-2 mb-1 hover:text-primary">
                {social.name} <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </header>

        <section className="mt-8">
          <h3 className="text-2xl font-bold font-headline mb-4 border-b pb-2 text-primary">Summary</h3>
          <p className="text-muted-foreground">{personalData.bio}</p>
        </section>

        <section className="mt-8">
          <h3 className="text-2xl font-bold font-headline mb-6 border-b pb-2 text-primary">Experience</h3>
          <div className="relative">
             <div className="absolute left-4 top-4 h-full w-0.5 -translate-x-1/2 bg-border hidden sm:block"></div>
             {experience.map((item, index) => (
              <div key={item.company} className="relative pl-8 sm:pl-12 mb-10">
                <div className="absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                 {item.role.toLowerCase().includes("b.s.") ? <GraduationCap className="h-5 w-5" /> : <Briefcase className="h-5 w-5" />}
                </div>
                 <p className="text-xs text-muted-foreground font-semibold">{item.period}</p>
                <h4 className="mt-1 font-headline text-lg font-bold">{item.role}</h4>
                <p className="font-medium text-primary">{item.company}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
            <h3 className="text-2xl font-bold font-headline mb-4 border-b pb-2 text-primary">Skills</h3>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
            </div>
        </section>
      </div>
    </div>
  );
}
