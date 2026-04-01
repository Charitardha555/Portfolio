import Link from "next/link";

import { AuthButton } from "@/components/auth-buttons";
import { auth, isAuthorizedAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { defaultExperience, defaultPosts, defaultProfile, defaultProjects, defaultSettings, defaultSocialLinks } from "@/lib/site-data";

import {
  deleteExperience,
  deletePost,
  deleteProject,
  deleteSiteSetting,
  deleteSocialLink,
  saveExperience,
  savePost,
  saveProfile,
  saveProject,
  saveSiteSetting,
  saveSocialLink,
  signInWithGoogle,
  signOutFromAdmin
} from "./actions";

async function getAdminData() {
  if (!process.env.DATABASE_URL) {
    return {
      profile: defaultProfile,
      projects: defaultProjects,
      experiences: defaultExperience,
      posts: defaultPosts,
      socialLinks: defaultSocialLinks,
      settings: defaultSettings,
      persistent: false
    };
  }

  const [profile, projects, experiences, posts, socialLinks, settings] = await Promise.all([
    prisma.profile.findUnique({ where: { ownerKey: "primary" } }),
    prisma.project.findMany({ orderBy: [{ featured: "desc" }, { order: "asc" }] }),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.post.findMany({ orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }] }),
    prisma.socialLink.findMany({ orderBy: { order: "asc" } }),
    prisma.siteSetting.findMany({ orderBy: { key: "asc" } })
  ]);

  return {
    profile: profile ?? defaultProfile,
    projects,
    experiences,
    posts,
    socialLinks,
    settings,
    persistent: true
  };
}

function panelTitle(title: string, copy: string) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="text-sm leading-6 text-white/60">{copy}</p>
    </div>
  );
}

export default async function AdminPage() {
  const session = await auth();
  const email = session?.user?.email ?? null;
  const authorized = isAuthorizedAdmin(email);
  const hasDb = Boolean(process.env.DATABASE_URL);

  if (!session) {
    return (
      <main className="noise admin-shell min-h-screen">
        <div className="mx-auto flex min-h-screen max-w-5xl items-center px-5 py-10 md:px-8">
          <section className="section-shell w-full rounded-[2.5rem] border border-[#00ff41]/25 bg-black/55 p-8 md:p-12">
            <p className="eyebrow text-[#a2ffbc]">Admin Console</p>
            <h1 className="display-font mt-4 max-w-3xl text-5xl text-white md:text-7xl">
              Private editing access powered by Google.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Sign in with the approved Google account to edit your profile, projects, writing, and
              site settings from one dashboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <AuthButton label="Continue with Google" action={signInWithGoogle} />
              <Link
                href="/"
                className="inline-flex items-center rounded-full border border-white/15 px-5 py-3 text-sm text-white/80"
              >
                Back home
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="noise admin-shell min-h-screen">
        <div className="mx-auto flex min-h-screen max-w-5xl items-center px-5 py-10 md:px-8">
          <section className="section-shell w-full rounded-[2.5rem] border border-[#ff577f]/35 bg-black/55 p-8 md:p-12">
            <p className="eyebrow text-[#ffc2d0]">Access denied</p>
            <h1 className="display-font mt-4 max-w-3xl text-5xl text-white md:text-7xl">
              This Google account is not allowed into the admin space.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Signed in as <span className="text-white">{email}</span>. Update `ADMIN_EMAIL` in your
              environment if this should be the owner account.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <AuthButton label="Sign out" action={signOutFromAdmin} variant="secondary" />
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-sand px-5 py-3 text-sm font-semibold text-ink"
              >
                Back home
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const data = await getAdminData();
  const metrics = [
    { label: "Projects", value: data.projects.length, color: "text-[#00ff41]" },
    { label: "Posts", value: data.posts.length, color: "text-[#00d4ff]" },
    { label: "Experience", value: data.experiences.length, color: "text-[#bf00ff]" },
    { label: "Settings", value: data.settings.length, color: "text-[#ff9f1c]" }
  ];

  return (
    <main className="noise admin-shell min-h-screen">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-[#98ffd6]">Admin Dashboard</p>
            <h1 className="display-font mt-3 text-5xl text-white md:text-6xl">
              <span className="text-[#caffd8]">Manage</span>{" "}
              <span className="text-[#79e8ff]">your</span>{" "}
              <span className="text-[#d8adff]">site</span>
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-[#00ff41]/35 bg-[#00ff41]/10 px-5 py-3 text-sm text-[#d3ffdf] transition hover:bg-[#00ff41]/20"
            >
              View portfolio
            </Link>
            <AuthButton label="Sign out" action={signOutFromAdmin} variant="secondary" />
          </div>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">{metric.label}</p>
              <p className={`mt-2 text-3xl font-semibold ${metric.color}`}>{metric.value}</p>
            </div>
          ))}
        </div>

        {!hasDb || !data.persistent ? (
          <div className="mb-6 rounded-[1.8rem] border border-amber-300/35 bg-amber-300/15 px-5 py-4 text-sm text-amber-100">
            `DATABASE_URL` is not configured yet, so the dashboard is showing starter content only.
            Add your database and run Prisma setup before expecting persistent edits.
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
          <section className="section-shell rounded-[2rem] p-6">
            {panelTitle("Profile", "Update your core identity, email, location, and hero copy.")}
            <form action={saveProfile} className="mt-6 grid gap-4">
              <input
                name="name"
                defaultValue={data.profile.name}
                placeholder="Name"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              />
              <input
                name="tagline"
                defaultValue={data.profile.tagline}
                placeholder="Tagline"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              />
              <textarea
                name="bio"
                defaultValue={data.profile.bio}
                rows={6}
                placeholder="Bio"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              />
              <input
                name="avatarUrl"
                defaultValue={data.profile.avatarUrl ?? ""}
                placeholder="Avatar URL"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              />
              <input
                name="resumeUrl"
                defaultValue={data.profile.resumeUrl ?? ""}
                placeholder="Resume URL"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              />
              <input
                name="contactEmail"
                defaultValue={data.profile.contactEmail}
                placeholder="Contact email"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              />
              <input
                name="location"
                defaultValue={data.profile.location ?? ""}
                placeholder="Location"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              />
              <input
                name="availability"
                defaultValue={data.profile.availability ?? ""}
                placeholder="Availability status"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
              />
              <button className="rounded-full bg-sand px-5 py-3 text-sm font-semibold text-ink">
                Save profile
              </button>
            </form>
          </section>

          <div className="grid gap-6">
            <section className="section-shell rounded-[2rem] p-6">
              {panelTitle(
                "Projects",
                "Create, reorder, feature, publish, and update your portfolio case studies."
              )}
              <div className="mt-6 grid gap-5">
                {data.projects.map((project) => (
                  <form key={project.id} action={saveProject} className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5">
                    <input type="hidden" name="id" value={project.id} />
                    <div className="grid gap-3 md:grid-cols-2">
                      <input name="title" defaultValue={project.title} placeholder="Title" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <input name="slug" defaultValue={project.slug} placeholder="Slug" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <input name="summary" defaultValue={project.summary} placeholder="Summary" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none md:col-span-2" />
                      <textarea name="description" defaultValue={project.description} rows={5} placeholder="Description" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none md:col-span-2" />
                      <input name="stack" defaultValue={project.stack.join(", ")} placeholder="Tech stack, comma separated" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none md:col-span-2" />
                      <input name="imageUrl" defaultValue={project.imageUrl ?? ""} placeholder="Image URL" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <input name="liveUrl" defaultValue={project.liveUrl ?? ""} placeholder="Live URL" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <input name="repoUrl" defaultValue={project.repoUrl ?? ""} placeholder="Repo URL" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <input name="order" type="number" defaultValue={project.order} placeholder="Order" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-5 text-sm text-white/70">
                      <label className="inline-flex items-center gap-2">
                        <input type="checkbox" name="featured" defaultChecked={project.featured} />
                        Featured
                      </label>
                      <label className="inline-flex items-center gap-2">
                        <input type="checkbox" name="published" defaultChecked={project.published} />
                        Published
                      </label>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ink">
                        Save project
                      </button>
                      <button formAction={deleteProject} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80">
                        Delete
                      </button>
                    </div>
                  </form>
                ))}

                <form action={saveProject} className="rounded-[1.8rem] border border-dashed border-white/15 bg-white/[0.02] p-5">
                  <h3 className="text-lg font-semibold text-white">Add project</h3>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <input name="title" placeholder="Title" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                    <input name="slug" placeholder="Slug" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                    <input name="summary" placeholder="Summary" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none md:col-span-2" />
                    <textarea name="description" rows={5} placeholder="Description" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none md:col-span-2" />
                    <input name="stack" placeholder="Tech stack, comma separated" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none md:col-span-2" />
                    <input name="imageUrl" placeholder="Image URL" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                    <input name="liveUrl" placeholder="Live URL" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                    <input name="repoUrl" placeholder="Repo URL" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                    <input name="order" type="number" defaultValue={0} placeholder="Order" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-5 text-sm text-white/70">
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" name="featured" />
                      Featured
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" name="published" defaultChecked />
                      Published
                    </label>
                  </div>
                  <button className="mt-5 rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ink">
                    Create project
                  </button>
                </form>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="section-shell rounded-[2rem] p-6">
                {panelTitle("Experience", "Maintain your timeline and the highlights shown on the homepage.")}
                <div className="mt-6 grid gap-5">
                  {data.experiences.map((item) => (
                    <form key={item.id} action={saveExperience} className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
                      <input type="hidden" name="id" value={item.id} />
                      <div className="grid gap-3">
                        <input name="company" defaultValue={item.company} placeholder="Company" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                        <input name="role" defaultValue={item.role} placeholder="Role" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                        <input name="period" defaultValue={item.period} placeholder="Period" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                        <textarea name="description" rows={4} defaultValue={item.description} placeholder="Description" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                        <input name="highlights" defaultValue={item.highlights.join(", ")} placeholder="Highlights, comma separated" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                        <input name="order" type="number" defaultValue={item.order} placeholder="Order" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      </div>
                      <div className="mt-4 flex gap-3">
                        <button className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ink">Save</button>
                        <button formAction={deleteExperience} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80">Delete</button>
                      </div>
                    </form>
                  ))}
                  <form action={saveExperience} className="rounded-[1.6rem] border border-dashed border-white/15 bg-white/[0.02] p-5">
                    <h3 className="text-lg font-semibold text-white">Add experience</h3>
                    <div className="mt-4 grid gap-3">
                      <input name="company" placeholder="Company" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <input name="role" placeholder="Role" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <input name="period" placeholder="Period" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <textarea name="description" rows={4} placeholder="Description" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <input name="highlights" placeholder="Highlights, comma separated" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <input name="order" type="number" defaultValue={0} placeholder="Order" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                    </div>
                    <button className="mt-4 rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ink">Create</button>
                  </form>
                </div>
              </div>

              <div className="section-shell rounded-[2rem] p-6">
                {panelTitle("Social links", "Control the profile links shown in the intro panel.")}
                <div className="mt-6 grid gap-5">
                  {data.socialLinks.map((item) => (
                    <form key={item.id} action={saveSocialLink} className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
                      <input type="hidden" name="id" value={item.id} />
                      <div className="grid gap-3">
                        <input name="platform" defaultValue={item.platform} placeholder="Platform" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                        <input name="label" defaultValue={item.label} placeholder="Label" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                        <input name="url" defaultValue={item.url} placeholder="URL" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                        <input name="order" type="number" defaultValue={item.order} placeholder="Order" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      </div>
                      <div className="mt-4 flex gap-3">
                        <button className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ink">Save</button>
                        <button formAction={deleteSocialLink} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80">Delete</button>
                      </div>
                    </form>
                  ))}
                  <form action={saveSocialLink} className="rounded-[1.6rem] border border-dashed border-white/15 bg-white/[0.02] p-5">
                    <h3 className="text-lg font-semibold text-white">Add social link</h3>
                    <div className="mt-4 grid gap-3">
                      <input name="platform" placeholder="Platform" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <input name="label" placeholder="Label" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <input name="url" placeholder="URL" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <input name="order" type="number" defaultValue={0} placeholder="Order" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                    </div>
                    <button className="mt-4 rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ink">Create</button>
                  </form>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="section-shell rounded-[2rem] p-6">
                {panelTitle("Posts", "Publish and unpublish blog entries from the same dashboard.")}
                <div className="mt-6 grid gap-5">
                  {data.posts.map((post) => (
                    <form key={post.id} action={savePost} className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5">
                      <input type="hidden" name="id" value={post.id} />
                      <div className="grid gap-3">
                        <input name="title" defaultValue={post.title} placeholder="Title" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                        <input name="slug" defaultValue={post.slug} placeholder="Slug" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                        <input name="excerpt" defaultValue={post.excerpt} placeholder="Excerpt" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                        <input name="coverImage" defaultValue={post.coverImage ?? ""} placeholder="Cover image URL" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                        <textarea name="content" defaultValue={post.content} rows={7} placeholder="Post content" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-white/70">
                        <label className="inline-flex items-center gap-2">
                          <input type="checkbox" name="published" defaultChecked={post.published} />
                          Published
                        </label>
                        <span>{post.publishedAt ? `Published ${post.publishedAt.toDateString()}` : "Draft"}</span>
                      </div>
                      <div className="mt-5 flex gap-3">
                        <button className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ink">Save post</button>
                        <button formAction={deletePost} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80">Delete</button>
                      </div>
                    </form>
                  ))}
                  <form action={savePost} className="rounded-[1.8rem] border border-dashed border-white/15 bg-white/[0.02] p-5">
                    <h3 className="text-lg font-semibold text-white">Add post</h3>
                    <div className="mt-4 grid gap-3">
                      <input name="title" placeholder="Title" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <input name="slug" placeholder="Slug" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <input name="excerpt" placeholder="Excerpt" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <input name="coverImage" placeholder="Cover image URL" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <textarea name="content" rows={7} placeholder="Post content" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                    </div>
                    <label className="mt-4 inline-flex items-center gap-2 text-sm text-white/70">
                      <input type="checkbox" name="published" defaultChecked />
                      Published
                    </label>
                    <button className="mt-4 rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ink">Create post</button>
                  </form>
                </div>
              </div>

              <div className="section-shell rounded-[2rem] p-6">
                {panelTitle("Site settings", "Tune reusable text like hero badges and key callouts.")}
                <div className="mt-6 grid gap-5">
                  {data.settings.map((setting) => (
                    <form key={setting.id} action={saveSiteSetting} className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
                      <input type="hidden" name="id" value={setting.id} />
                      <div className="grid gap-3">
                        <input name="key" defaultValue={setting.key} placeholder="Key" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                        <textarea name="value" rows={3} defaultValue={setting.value} placeholder="Value" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      </div>
                      <div className="mt-4 flex gap-3">
                        <button className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ink">Save</button>
                        <button formAction={deleteSiteSetting} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80">Delete</button>
                      </div>
                    </form>
                  ))}
                  <form action={saveSiteSetting} className="rounded-[1.6rem] border border-dashed border-white/15 bg-white/[0.02] p-5">
                    <h3 className="text-lg font-semibold text-white">Add setting</h3>
                    <div className="mt-4 grid gap-3">
                      <input name="key" placeholder="Key" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                      <textarea name="value" rows={3} placeholder="Value" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none" />
                    </div>
                    <button className="mt-4 rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ink">Create</button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
