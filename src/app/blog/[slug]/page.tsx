import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostData } from "@/lib/posts";
import { format } from 'date-fns';
import type { Metadata, ResolvingMetadata } from 'next'
import { personalData } from "@/lib/data";

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPostData(params.slug);

  if (!post) {
    return {
      title: 'Not Found',
      description: "The page you're looking for does not exist.",
    };
  }
 
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: `${post.title} | ${personalData.name}`,
    description: post.description,
    openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        url: `https://hamzaeraoui.com/blog/${post.slug}`,
        images: ['/images/opensource-story.jpeg', ...previousImages],
        authors: [personalData.name],
        publishedTime: post.date,
    },
     twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/images/opensource-story.jpeg'],
      creator: '@' + personalData.name.replace(/\s/g, ''),
    },
  }
}

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
