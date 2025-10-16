import { experience } from "@/lib/data";
import { Briefcase, GraduationCap } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-32">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Resume & Experience
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          My professional journey as a software engineer and problem-solver.
        </p>
      </div>
      <div className="relative mt-12">
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
        {experience.map((item, index) => (
          <div key={item.company} className="relative mb-12">
            <div className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                <div className="p-6 bg-card rounded-lg shadow-md border">
                  <p className="text-sm text-primary font-semibold">{item.period}</p>
                  <h3 className="mt-1 font-headline text-xl font-bold">{item.role}</h3>
                  <p className="mt-1 font-medium">{item.company}</p>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {item.role.toLowerCase().includes("b.s.") ? <GraduationCap className="h-5 w-5" /> : <Briefcase className="h-5 w-5" />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
