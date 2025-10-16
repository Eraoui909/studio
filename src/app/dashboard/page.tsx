
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { blogPosts } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, Heart } from 'lucide-react';

const chartConfig = {
  views: {
    label: 'Views',
    color: 'hsl(var(--chart-1))',
  },
  likes: {
    label: 'Likes',
    color: 'hsl(var(--chart-2))',
  },
};

export default function Dashboard() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-20 sm:py-32 md:px-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Dashboard
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A private overview of your blog post statistics.
        </p>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Post Engagement</CardTitle>
          <CardDescription>
            A chart showing views and likes for each blog post.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={blogPosts}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="title"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 15) + '...'}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="views" fill="var(--color-views)" radius={4} />
              <Bar dataKey="likes" fill="var(--color-likes)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>
            A detailed list of all your blog posts and their stats.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Likes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.map((post) => (
                <TableRow key={post.slug}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views?.toLocaleString()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="gap-1">
                      <Heart className="h-3 w-3" />
                      {post.likes?.toLocaleString()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
