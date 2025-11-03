import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostData } from "@/lib/posts";
import { format } from 'date-fns';
import type { Metadata, ResolvingMetadata } from 'next'
import { personalData } from "@/lib/data";
import { BlogNotes } from "@/components/blog-notes";
import { ReadingProgress } from "@/components/reading-progress";
import { SocialShare } from "@/components/social-share";

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

  const postUrl = `https://hamzaeraoui.com/blog/${post.slug}`;

  return (
    <>
      <ReadingProgress />
      <div className="container mx-auto max-w-7xl px-4 py-20 sm:py-32 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <article>
              <div className="text-center mb-12">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  {post.title}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  {format(new Date(post.date), 'MMMM d, yyyy')} • {post.readingTime} min read
                </p>
              </div>
              <div id="article-content" className="prose prose-lg dark:prose-invert mx-auto" dangerouslySetInnerHTML={{ __html: post.content }} />
              <div className="mt-12">
                <SocialShare url={postUrl} title={post.title} />
              </div>
            </article>
          </div>

          <aside className="lg:col-span-1 lg:sticky lg:top-24 self-start mt-12 lg:mt-0">
            <BlogNotes slug={post.slug} />
          </aside>
        </div>
      </div>
    </>
  );
}
