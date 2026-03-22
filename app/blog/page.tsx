import Link from "next/link";

import { getPortfolioData } from "@/lib/site-data";
import { formatDate } from "@/lib/utils";

export default async function BlogIndexPage() {
  const { posts, profile } = await getPortfolioData();

  return (
    <main className="noise min-h-screen">
      <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
        <div className="mb-10 flex items-center justify-between">
          <Link href="/" className="text-sm uppercase tracking-[0.24em] text-white/65">
            Back to portfolio
          </Link>
          <Link href="/admin" className="text-sm text-white/70">
            Admin
          </Link>
        </div>

        <section className="section-shell rounded-[2.5rem] p-8 md:p-12">
          <p className="eyebrow">Blog</p>
          <h1 className="display-font mt-4 text-5xl text-white md:text-7xl">
            Writing from {profile.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
            Notes on design systems, product engineering, interactive storytelling, and building a
            portfolio that feels intentional from the first second.
          </p>
        </section>

        <div className="mt-8 grid gap-5">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="section-shell card-hover grid gap-6 rounded-[2rem] p-6 md:grid-cols-[1.2fr_0.8fr]"
            >
              <div>
                <p className="eyebrow">{formatDate(post.publishedAt)}</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">{post.title}</h2>
                <p className="mt-4 story-copy">{post.excerpt}</p>
              </div>
              {post.coverImage ? (
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.coverImage} alt={post.title} className="h-56 w-full object-cover" />
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
