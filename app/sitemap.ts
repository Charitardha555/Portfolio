import type { MetadataRoute } from "next";

import { getPortfolioData } from "@/lib/site-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.vercel.app";
  const { posts } = await getPortfolioData();

  return [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.85 },
    ...posts
      .filter((post) => post.published)
      .map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.7
      }))
  ];
}
