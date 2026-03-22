import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const profile = await prisma.profile.upsert({
    where: { ownerKey: "primary" },
    update: {},
    create: {
      ownerKey: "primary",
      name: "Charitardha Pulipati",
      tagline: "Engineer, builder, and storyteller creating internet experiences that feel alive.",
      bio: "I design and ship products that blend clean engineering, sharp narrative, and a polished visual edge. This portfolio is set up so you can manage the important parts without touching code.",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
      resumeUrl: "https://example.com/resume.pdf",
      contactEmail: "charitardhapulipati@example.com",
      location: "India",
      availability: "Available for selective freelance and full-time opportunities."
    }
  });

  await prisma.socialLink.createMany({
    data: [
      {
        profileId: profile.id,
        platform: "GitHub",
        label: "@yourhandle",
        url: "https://github.com/yourhandle",
        order: 1
      },
      {
        profileId: profile.id,
        platform: "LinkedIn",
        label: "Your Name",
        url: "https://linkedin.com/in/yourhandle",
        order: 2
      },
      {
        profileId: profile.id,
        platform: "X",
        label: "@yourhandle",
        url: "https://x.com/yourhandle",
        order: 3
      }
    ],
    skipDuplicates: true
  });

  await prisma.project.createMany({
    data: [
      {
        title: "Nebula Command",
        slug: "nebula-command",
        summary: "A cinematic operations dashboard with live metrics and immersive interaction design.",
        description:
          "Nebula Command is a full-stack product experiment focused on rich telemetry, story-driven UI, and fast operational workflows. It combines performance-minded architecture with a distinctly premium visual language.",
        stack: ["Next.js", "TypeScript", "Postgres", "Tailwind CSS"],
        imageUrl:
          "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/yourhandle/nebula-command",
        featured: true,
        published: true,
        order: 1
      },
      {
        title: "Signal Forge",
        slug: "signal-forge",
        summary: "A brand-forward portfolio CMS for creators who want speed, elegance, and ownership.",
        description:
          "Signal Forge is a publishing and portfolio management system that gives creators control over both content and presentation. The product emphasizes editorial clarity, reusable content primitives, and smooth interactions.",
        stack: ["React", "Prisma", "Auth.js", "Vercel"],
        imageUrl:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/yourhandle/signal-forge",
        featured: true,
        published: true,
        order: 2
      }
    ],
    skipDuplicates: true
  });

  await prisma.experience.createMany({
    data: [
      {
        company: "Astra Labs",
        role: "Founding Engineer",
        period: "2024 - Present",
        description:
          "Leading product architecture, developer systems, and launch-quality frontend execution for a high-growth digital platform.",
        highlights: ["Built core app foundation", "Improved performance budgets", "Shipped polished user journeys"],
        order: 1
      },
      {
        company: "Independent",
        role: "Freelance Product Engineer",
        period: "2022 - 2024",
        description:
          "Partnered with startups and personal brands to design, build, and deploy premium web experiences with strong SEO and maintainable systems.",
        highlights: ["Custom design systems", "Admin dashboards", "Vercel deployments"],
        order: 2
      }
    ],
    skipDuplicates: true
  });

  await prisma.post.createMany({
    data: [
      {
        title: "Designing Portfolios That Feel Premium",
        slug: "designing-portfolios-that-feel-premium",
        excerpt: "What separates a portfolio that looks nice from one that feels memorable.",
        content:
          "A premium portfolio is rarely about decoration alone. It is about rhythm, hierarchy, confidence, and narrative. Motion supports the story. Typography builds tone. Content structure removes friction. The goal is not to impress with noise, but to guide attention with intent.",
        coverImage:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        published: true,
        publishedAt: new Date()
      }
    ],
    skipDuplicates: true
  });

  await prisma.siteSetting.createMany({
    data: [
      { key: "heroBadge", value: "Available for selected projects in 2026" },
      { key: "heroPrimaryCta", value: "#projects" },
      { key: "heroSecondaryCta", value: "/blog" },
      { key: "contactHeadline", value: "Let us build something unforgettable." }
    ],
    skipDuplicates: true
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
