import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostData } from "@/lib/posts";
import { format } from 'date-fns';

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-3xl px-4 py-20 sm:py-32 md:px-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{format(new Date(post.date), 'MMMM d, yyyy')}</p>
      </div>
      <div className="prose prose-lg dark:prose-invert mx-auto" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
