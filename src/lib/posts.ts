import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { BlogPost } from './types';
import { cache } from 'react';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 230;
  // Strip HTML tags and count words
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}


export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    const readingTime = calculateReadingTime(matterResult.content);

    return {
      slug,
      readingTime,
      ...(matterResult.data as { title: string; date: string; description: string, views?: number, likes?: number }),
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.md$/, ''),
    };
  });
}

export const getPostData = cache(async (slug: string): Promise<BlogPost> => {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const content = processedContent.toString();

  const readingTime = calculateReadingTime(content);

  return {
    slug,
    content,
    readingTime,
    ...(matterResult.data as { title: string; date: string; description: string, views?: number, likes?: number }),
  };
});
