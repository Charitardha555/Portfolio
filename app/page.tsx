import Link from "next/link";

import { getPortfolioData, settingValue } from "@/lib/site-data";

function sectionTitle(eyebrow: string, title: string, copy?: string) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display-font text-4xl tracking-tight text-white md:text-5xl">{title}</h2>
      {copy ? <p className="story-copy text-base md:text-lg">{copy}</p> : null}
    </div>
  );
}

export default async function HomePage() {
  const { profile, socialLinks, projects, experiences, posts, settings } = await getPortfolioData();
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const latestPosts = posts.slice(0, 3);
  const text = (key: string, fallback: string) => settingValue(settings, key, fallback);

  return (
    <main className="noise relative isolate overflow-hidden">
      <div className="ambient-line absolute inset-0 opacity-40" />
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-6 md:px-8 lg:px-12">
        <header className="section-shell sticky top-4 z-30 mb-8 flex items-center justify-between rounded-full px-5 py-3">
          <Link href="/" className="text-sm font-medium tracking-[0.24em] text-sand uppercase">
            {profile.name}
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <Link href="#projects">Projects</Link>
            <Link href="#experience">Experience</Link>
            <Link href="/blog">Blog</Link>
            <Link href="#contact">Contact</Link>
            <Link
              href="/admin"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white"
            >
              Admin
            </Link>
          </nav>
        </header>

        <section className="grid gap-8 pb-12 pt-4 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:pb-24">
          <div className="space-y-8">
            <span className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.26em] text-white/70">
              {settingValue(settings, "heroBadge", "Available for selected projects in 2026")}
            </span>
            <div className="space-y-6">
              <p className="eyebrow">{text("heroEyebrow", "Portfolio / Product / Identity")}</p>
              <h1 className="display-font max-w-4xl text-6xl leading-none md:text-8xl">
                {text("heroTitlePrefix", "Build a brand that")}{" "}
                <span className="gradient-text">{text("heroTitleHighlight", "looks fearless")}</span>{" "}
                {text("heroTitleSuffix", "and ships with substance.")}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
                {profile.tagline} {profile.bio}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href={text("heroPrimaryCta", "#projects")}
                className="rounded-full bg-sand px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white"
              >
                {text("heroPrimaryCtaLabel", "Explore projects")}
              </Link>
              <Link
                href={text("heroSecondaryCta", "/blog")}
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm text-white transition hover:bg-white/10"
              >
                {text("heroSecondaryCtaLabel", "Read the writing")}
              </Link>
            </div>

            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              {[
                [text("heroStatOneLabel", "Years shaping products"), text("heroStatOneValue", "4+")],
                [text("heroStatTwoLabel", "Live-ready builds launched"), text("heroStatTwoValue", "18")],
                [text("heroStatThreeLabel", "Focus areas"), text("heroStatThreeValue", "Web, SaaS, portfolios")]
              ].map(([label, value]) => (
                <div key={label} className="section-shell rounded-3xl p-5">
                  <div className="text-3xl font-semibold text-white">{value}</div>
                  <div className="mt-2 text-sm text-white/60">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="section-shell relative overflow-hidden rounded-[2rem] p-5 shadow-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
            <div className="relative space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.24em] text-white/60">Signal Profile</p>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200">
                  {profile.availability ?? "Open to opportunities"}
                </span>
              </div>
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={profile.avatarUrl ?? ""} alt={profile.name} className="h-[360px] w-full object-cover" />
              </div>
              <div className="space-y-3">
                <p className="text-2xl font-semibold text-white">{profile.name}</p>
                <p className="story-copy">{profile.location ?? "Remote / Global"} </p>
              </div>
              <div className="grid gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="card-hover flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    <span className="text-white">{link.platform}</span>
                    <span className="text-sm text-white/60">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="section-shell rounded-[2rem] p-8">
            {sectionTitle(
              text("aboutEyebrow", "About"),
              text("aboutTitle", "Sharp engineering with a cinematic pulse.")
            )}
          </div>
          <div className="section-shell rounded-[2rem] p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <p className="story-copy">{text("aboutParagraphOne", "I build portfolio systems, SaaS surfaces, and product experiences that carry a clear point of view. The aim is simple: fast sites, convincing storytelling, and backend structure that stays useful after launch.")}</p>
              <p className="story-copy">{text("aboutParagraphTwo", "This starter ships with a Vercel-friendly architecture, an editable admin panel, structured content models, and a visual language designed to feel deliberate instead of generic.")}</p>
            </div>
          </div>
        </section>

        <section id="projects" className="space-y-8 py-14">
          {sectionTitle(
            text("projectsEyebrow", "Featured Work"),
            text("projectsTitle", "Case studies designed to feel premium before a single line is read."),
            text("projectsCopy", "Each project card carries both product context and visual weight, mirroring the kind of portfolio presence that makes people stop scrolling.")
          )}
          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <article
                key={project.id}
                className="section-shell card-hover group rounded-[2rem] p-4"
              >
                <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.imageUrl ?? ""}
                    alt={project.title}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-4 p-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-white/45">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{project.stack.slice(0, 2).join(" / ")}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="story-copy">{project.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2 text-sm text-white/80">
                    {project.liveUrl ? (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        Live
                      </a>
                    ) : null}
                    {project.repoUrl ? (
                      <a href={project.repoUrl} target="_blank" rel="noreferrer">
                        Code
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>{sectionTitle(text("experienceEyebrow", "Experience"), text("experienceTitle", "A timeline built around shipping real work."))}</div>
          <div className="space-y-5">
            {experiences.map((item) => (
              <article key={item.id} className="section-shell rounded-[2rem] p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xl font-semibold text-white">{item.role}</p>
                    <p className="mt-1 text-white/70">{item.company}</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60">
                    {item.period}
                  </span>
                </div>
                <p className="story-copy mt-4">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.highlights.map((highlight) => (
                    <span key={highlight} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/65">
                      {highlight}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 py-14 lg:grid-cols-[1fr_0.9fr]">
          <div className="section-shell rounded-[2rem] p-8">
            {sectionTitle(
              text("writingEyebrow", "Writing"),
              text("writingTitle", "Thoughtful notes on frontend systems, product craft, and digital presence.")
            )}
          </div>
          <div className="space-y-4">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="section-shell card-hover block rounded-[2rem] p-6"
              >
                <p className="eyebrow">Journal / {post.publishedAt?.getFullYear() ?? "Draft"}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{post.title}</h3>
                <p className="mt-3 story-copy">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="contact" className="py-14">
          <div className="section-shell rounded-[2.4rem] p-8 md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div className="space-y-4">
                <p className="eyebrow">Contact</p>
                <h2 className="display-font max-w-3xl text-4xl text-white md:text-6xl">
                  {settingValue(settings, "contactHeadline", "Let us build something unforgettable.")}
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-white/70">
                  {text("contactCopy", "Whether you want a striking portfolio, a refined product surface, or a launch-ready full-stack app, this starter is set up to get you there fast.")}
                </p>
              </div>
              <div className="flex flex-col gap-4 lg:items-end">
                <a
                  href={`mailto:${profile.contactEmail}`}
                  className="rounded-full bg-sand px-6 py-3 text-sm font-semibold text-ink"
                >
                  {profile.contactEmail}
                </a>
                {profile.resumeUrl ? (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/15 px-6 py-3 text-sm text-white"
                  >
                    View resume
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
