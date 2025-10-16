import Image from "next/image";
import Link from "next/link";
import { personalData } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Download, Send } from "lucide-react";

export function Hero() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile');

  return (
    <section id="home" className="py-20 sm:py-32">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:col-span-2">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {personalData.name}
          </h1>
          <p className="mt-4 text-lg text-primary font-medium font-headline">
            {personalData.tagline}
          </p>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            {personalData.bio}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="lg">
              <Link href={personalData.resumeUrl} target="_blank">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#contact">
                <Send className="mr-2 h-4 w-4" />
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          {profileImage && (
            <div className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 transform -translate-x-4 -translate-y-4"></div>
              <Image
                src={profileImage.imageUrl}
                alt={profileImage.description}
                width={400}
                height={400}
                priority
                className="rounded-full object-cover border-4 border-background shadow-lg"
                data-ai-hint={profileImage.imageHint}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
