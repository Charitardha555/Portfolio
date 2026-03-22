import type {
  Experience,
  Post,
  Profile,
  Project,
  SiteSetting,
  SocialLink
} from "@prisma/client";

import { prisma } from "@/lib/db";

export const defaultProfile: Profile = {
  id: "local-profile",
  ownerKey: "primary",
  name: "Your Name",
  tagline: "Engineer, builder, and storyteller shaping modern digital experiences.",
  bio: "This starter portfolio blends a cinematic public site with an admin system for editing the important parts without opening the codebase.",
  avatarUrl:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  resumeUrl: "https://example.com/resume.pdf",
  contactEmail: "hello@example.com",
  location: "India",
  availability: "Open to selective freelance and product opportunities.",
  createdAt: new Date(),
  updatedAt: new Date()
};

export const defaultSocialLinks: SocialLink[] = [
  {
    id: "social-github",
    platform: "GitHub",
    label: "@yourhandle",
    url: "https://github.com/yourhandle",
    order: 1,
    profileId: defaultProfile.id,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "social-linkedin",
    platform: "LinkedIn",
    label: "Your Name",
    url: "https://linkedin.com/in/yourhandle",
    order: 2,
    profileId: defaultProfile.id,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const defaultProjects: Project[] = [
  {
    id: "project-nebula-command",
    title: "Nebula Command",
    slug: "nebula-command",
    summary: "A cinematic operations dashboard with live metrics and premium interaction design.",
    description:
      "Nebula Command showcases how product engineering and visual storytelling can work together. The experience focuses on calm layouts, strong motion rhythm, and clear information hierarchy.",
    stack: ["Next.js", "TypeScript", "Postgres", "Tailwind CSS"],
    imageUrl:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/yourhandle/nebula-command",
    featured: true,
    published: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "project-signal-forge",
    title: "Signal Forge",
    slug: "signal-forge",
    summary: "A portfolio CMS starter with a bold frontend and editable backend.",
    description:
      "Signal Forge is a Vercel-friendly content system designed for personal brands and product builders who want both performance and expression.",
    stack: ["React", "Prisma", "Auth.js", "Vercel"],
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/yourhandle/signal-forge",
    featured: true,
    published: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const defaultExperience: Experience[] = [
  {
    id: "experience-astra-labs",
    company: "Astra Labs",
    role: "Founding Engineer",
    period: "2024 - Present",
    description:
      "Leading product architecture, developer systems, and launch-quality frontend execution for a fast-moving digital platform.",
    highlights: ["Product architecture", "Performance-focused delivery", "High-end frontend systems"],
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "experience-independent",
    company: "Independent",
    role: "Freelance Product Engineer",
    period: "2022 - 2024",
    description:
      "Built custom portfolio sites, internal tools, and branded product surfaces for startups and creators.",
    highlights: ["Custom design systems", "Admin dashboards", "SEO-first launches"],
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const defaultPosts: Post[] = [
  {
    id: "post-premium-portfolios",
    title: "Designing Portfolios That Feel Premium",
    slug: "designing-portfolios-that-feel-premium",
    excerpt: "A closer look at what gives modern personal sites that memorable, high-trust feel.",
    content:
      "Great portfolios are built on pacing, contrast, and narrative clarity. The strongest ones balance expressive visuals with content that quickly answers who you are, what you build, and why someone should trust you with important work.",
    coverImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    published: true,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const defaultSettings: SiteSetting[] = [
  {
    id: "setting-heroBadge",
    key: "heroBadge",
    value: "Available for selected projects in 2026",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "setting-contactHeadline",
    key: "contactHeadline",
    value: "Let us build something unforgettable.",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export type PortfolioData = {
  profile: Profile;
  socialLinks: SocialLink[];
  projects: Project[];
  experiences: Experience[];
  posts: Post[];
  settings: SiteSetting[];
};

function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export async function getPortfolioData(): Promise<PortfolioData> {
  if (!hasDatabase()) {
    return {
      profile: defaultProfile,
      socialLinks: defaultSocialLinks,
      projects: defaultProjects,
      experiences: defaultExperience,
      posts: defaultPosts,
      settings: defaultSettings
    };
  }

  try {
    const [profile, socialLinks, projects, experiences, posts, settings] =
      await Promise.all([
        prisma.profile.findUnique({ where: { ownerKey: "primary" } }),
        prisma.socialLink.findMany({ orderBy: { order: "asc" } }),
        prisma.project.findMany({
          where: { published: true },
          orderBy: [{ featured: "desc" }, { order: "asc" }]
        }),
        prisma.experience.findMany({ orderBy: { order: "asc" } }),
        prisma.post.findMany({
          where: { published: true },
          orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }]
        }),
        prisma.siteSetting.findMany({ orderBy: { key: "asc" } })
      ]);

    return {
      profile: profile ?? defaultProfile,
      socialLinks: socialLinks.length ? socialLinks : defaultSocialLinks,
      projects: projects.length ? projects : defaultProjects,
      experiences: experiences.length ? experiences : defaultExperience,
      posts: posts.length ? posts : defaultPosts,
      settings: settings.length ? settings : defaultSettings
    };
  } catch {
    return {
      profile: defaultProfile,
      socialLinks: defaultSocialLinks,
      projects: defaultProjects,
      experiences: defaultExperience,
      posts: defaultPosts,
      settings: defaultSettings
    };
  }
}

export async function getPublishedPostBySlug(slug: string) {
  if (!hasDatabase()) {
    return defaultPosts.find((post) => post.slug === slug) ?? null;
  }

  try {
    return await prisma.post.findFirst({
      where: { slug, published: true }
    });
  } catch {
    return defaultPosts.find((post) => post.slug === slug) ?? null;
  }
}

export function settingValue(settings: SiteSetting[], key: string, fallback = "") {
  return settings.find((item) => item.key === key)?.value ?? fallback;
}
