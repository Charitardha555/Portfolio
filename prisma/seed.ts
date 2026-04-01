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
      { key: "contactHeadline", value: "Let us build something unforgettable." },
      { key: "heroEyebrow", value: "Portfolio / Product / Identity" },
      { key: "heroTitlePrefix", value: "Build a brand that" },
      { key: "heroTitleHighlight", value: "looks fearless" },
      { key: "heroTitleSuffix", value: "and ships with substance." },
      { key: "heroPrimaryCtaLabel", value: "Explore projects" },
      { key: "heroSecondaryCtaLabel", value: "Read the writing" },
      { key: "heroStatOneLabel", value: "Years shaping products" },
      { key: "heroStatOneValue", value: "4+" },
      { key: "heroStatTwoLabel", value: "Live-ready builds launched" },
      { key: "heroStatTwoValue", value: "18" },
      { key: "heroStatThreeLabel", value: "Focus areas" },
      { key: "heroStatThreeValue", value: "Web, SaaS, portfolios" },
      { key: "aboutEyebrow", value: "About" },
      { key: "aboutTitle", value: "Sharp engineering with a cinematic pulse." },
      {
        key: "aboutParagraphOne",
        value:
          "I build portfolio systems, SaaS surfaces, and product experiences that carry a clear point of view. The aim is simple: fast sites, convincing storytelling, and backend structure that stays useful after launch."
      },
      {
        key: "aboutParagraphTwo",
        value:
          "This starter ships with a Vercel-friendly architecture, an editable admin panel, structured content models, and a visual language designed to feel deliberate instead of generic."
      },
      { key: "projectsEyebrow", value: "Featured Work" },
      { key: "projectsTitle", value: "Case studies designed to feel premium before a single line is read." },
      {
        key: "projectsCopy",
        value:
          "Each project card carries both product context and visual weight, mirroring the kind of portfolio presence that makes people stop scrolling."
      },
      { key: "experienceEyebrow", value: "Experience" },
      { key: "experienceTitle", value: "A timeline built around shipping real work." },
      { key: "writingEyebrow", value: "Writing" },
      { key: "writingTitle", value: "Thoughtful notes on frontend systems, product craft, and digital presence." },
      {
        key: "contactCopy",
        value:
          "Whether you want a striking portfolio, a refined product surface, or a launch-ready full-stack app, this starter is set up to get you there fast."
      }
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
