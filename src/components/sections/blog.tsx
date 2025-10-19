import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Blog() {
  const allPosts = getSortedPostsData();
  const latestPosts = allPosts.slice(0, 3);

  return (
    <section id="blog" className="py-20 sm:py-32">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          From the Blog
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Technical articles, personal reflections, and engineering stories.
        p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {latestPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
            <CardHeader className="flex-grow">
              <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
              <p className="pt-2 text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString()}</p>
              <CardDescription className="pt-4">{post.description}</CardDescription>
            </CardHeader>
            <CardFooter>
               <Button variant="link" className="p-0" asChild>
                 <Link href={`/blog/${post.slug}`}>
                   Read more <ArrowRight className="ml-2 h-4 w-4" />
                 </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <div className="mt-12 text-center">
        <Button asChild>
          <Link href="/blog">
            View All Posts <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
