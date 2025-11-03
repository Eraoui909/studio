
"use client";

import Image from "next/image";
import { projects } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../image-with-fallback";

export function OpenSource() {
  const storyImage = PlaceHolderImages.find((p) => p.id === 'opensource-story');

  return (
    <section id="open-source" className="py-20 sm:py-32">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          My Open Source Stories
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Behind every project is a purpose. Here are the stories of my key open source contributions.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="relative col-span-1 hidden lg:block">
          {storyImage && (
            <ImageWithFallback
              src={storyImage.imageUrl}
              fallbackSrc={`https://picsum.photos/seed/opensource/600/800`}
              alt={storyImage.description}
              fill
              className="rounded-lg object-cover"
              data-ai-hint={storyImage.imageHint}
            />
          )}
           <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent via-background/60"></div>
        </div>

        <div className="lg:col-span-2">
          <Accordion type="single" collapsible className="w-full">
            {projects.map((project, index) => {
               const projectImage = PlaceHolderImages.find(p => p.id === project.image);
              return (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4">
                     {project.logo && (
                      <Image
                        src={project.logo}
                        alt={`${project.title} logo`}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                    )}
                    <div className="text-left">
                      <h3 className="font-headline text-lg font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="overflow-hidden border-none bg-muted/30 dark:bg-muted/10">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                       {projectImage && (
                        <div className="md:col-span-1">
                          <ImageWithFallback
                            src={projectImage.imageUrl}
                            fallbackSrc={`https://picsum.photos/seed/project-${index}/600/400`}
                            alt={projectImage.description}
                            width={600}
                            height={400}
                            className="h-full w-full object-cover"
                            data-ai-hint={projectImage.imageHint}
                          />
                        </div>
                      )}
                      <div className="md:col-span-2">
                        <CardContent className="p-6">
                            <div className="mb-4 space-y-4">
                                <div>
                                    <h4 className="font-semibold text-sm mb-1">Problem Solved</h4>
                                    <p className="text-sm text-muted-foreground">{project.problem}</p>
                                </div>
                                 <div>
                                    <h4 className="font-semibold text-sm mb-1">My Contribution</h4>
                                    <p className="text-sm text-muted-foreground">{project.contribution}</p>
                                </div>
                            </div>
                           <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {project.stars && <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Star className="h-4 w-4 text-primary" />
                                <span>{project.stars?.toLocaleString()}</span>
                              </div>}
                              {project.forks && <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <GitFork className="h-4 w-4 text-primary" />
                                <span>{project.forks?.toLocaleString()}</span>
                              </div>}
                            </div>
                            <div className="flex items-center space-x-2">
                               {project.githubUrl && (
                                <Button variant="outline" size="icon" asChild>
                                    <Link href={project.githubUrl} target="_blank">
                                    <Github className="h-4 w-4" />
                                    <span className="sr-only">GitHub</span>
                                    </Link>
                                </Button>
                                )}
                                {project.liveUrl && (
                                <Button variant="default" size="icon" asChild>
                                    <Link href={project.liveUrl} target="_blank">
                                    <ExternalLink className="h-4 w-4" />
                                    <span className="sr-only">Live Demo</span>
                                    </Link>
                                </Button>
                                )}
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            )})}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
