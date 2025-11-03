import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Blog } from "@/components/sections/blog";
import { Services } from "@/components/sections/services";
// import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="container mx-auto max-w-5xl px-4 md:px-8">
      <Hero />
      <Blog />
      <Projects />
      <Services />
      {/* <Contact /> */}
    </div>
  );
}
