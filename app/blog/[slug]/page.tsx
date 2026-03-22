import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPortfolioData, getPublishedPostBySlug } from "@/lib/site-data";
import { formatDate } from "@/lib/utils";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt
  };
}

export async function generateStaticParams() {
  const { posts } = await getPortfolioData();

  return posts.filter((post) => post.published).map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="noise min-h-screen">
      <div className="mx-auto max-w-4xl px-5 py-10 md:px-8">
        <div className="mb-10 flex items-center justify-between">
          <Link href="/blog" className="text-sm uppercase tracking-[0.24em] text-white/65">
            Back to blog
          </Link>
          <Link href="/" className="text-sm text-white/70">
            Home
          </Link>
        </div>

        <article className="section-shell rounded-[2.5rem] p-8 md:p-12">
          <p className="eyebrow">{formatDate(post.publishedAt)}</p>
          <h1 className="display-font mt-4 text-5xl leading-tight text-white md:text-7xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">{post.excerpt}</p>
          {post.coverImage ? (
            <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImage} alt={post.title} className="h-[380px] w-full object-cover" />
            </div>
          ) : null}
          <div className="prose prose-invert mt-10 max-w-none whitespace-pre-wrap text-lg leading-8 text-white/84">
            {post.content}
          </div>
        </article>
      </div>
    </main>
  );
}
