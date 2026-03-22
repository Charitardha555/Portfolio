"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth, isAuthorizedAdmin, signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { splitCommaSeparated } from "@/lib/utils";

function requireDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to use the admin dashboard.");
  }
}

async function requireAdmin() {
  requireDatabase();

  const session = await auth();

  if (!session?.user?.email || !isAuthorizedAdmin(session.user.email)) {
    redirect("/admin");
  }

  return session.user;
}

function checkbox(formData: FormData, name: string) {
  return formData.get(name) === "on";
}

function cleanSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const profileSchema = z.object({
  name: z.string().min(2),
  tagline: z.string().min(6),
  bio: z.string().min(20),
  avatarUrl: z.string().url().or(z.literal("")),
  resumeUrl: z.string().url().or(z.literal("")),
  contactEmail: z.string().email(),
  location: z.string().optional(),
  availability: z.string().optional()
});

const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  summary: z.string().min(10),
  description: z.string().min(20),
  stack: z.string().min(2),
  imageUrl: z.string().url().or(z.literal("")),
  liveUrl: z.string().url().or(z.literal("")),
  repoUrl: z.string().url().or(z.literal("")),
  order: z.coerce.number().int().min(0)
});

const experienceSchema = z.object({
  company: z.string().min(2),
  role: z.string().min(2),
  period: z.string().min(2),
  description: z.string().min(20),
  highlights: z.string().optional(),
  order: z.coerce.number().int().min(0)
});

const postSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  coverImage: z.string().url().or(z.literal(""))
});

const socialSchema = z.object({
  platform: z.string().min(2),
  label: z.string().min(2),
  url: z.string().url(),
  order: z.coerce.number().int().min(0)
});

const settingSchema = z.object({
  key: z.string().min(2),
  value: z.string().min(1)
});

export async function signInWithGoogle() {
  await signIn("google");
}

export async function signOutFromAdmin() {
  await signOut({ redirectTo: "/admin" });
}

export async function saveProfile(formData: FormData) {
  await requireAdmin();

  const parsed = profileSchema.parse({
    name: formData.get("name"),
    tagline: formData.get("tagline"),
    bio: formData.get("bio"),
    avatarUrl: formData.get("avatarUrl"),
    resumeUrl: formData.get("resumeUrl"),
    contactEmail: formData.get("contactEmail"),
    location: formData.get("location"),
    availability: formData.get("availability")
  });

  await prisma.profile.upsert({
    where: { ownerKey: "primary" },
    update: parsed,
    create: {
      ownerKey: "primary",
      ...parsed
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function saveProject(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const parsed = projectSchema.parse({
    title: formData.get("title"),
    slug: cleanSlug(String(formData.get("slug") || formData.get("title") || "")),
    summary: formData.get("summary"),
    description: formData.get("description"),
    stack: formData.get("stack"),
    imageUrl: formData.get("imageUrl"),
    liveUrl: formData.get("liveUrl"),
    repoUrl: formData.get("repoUrl"),
    order: formData.get("order")
  });

  const payload = {
    ...parsed,
    stack: splitCommaSeparated(parsed.stack),
    featured: checkbox(formData, "featured"),
    published: checkbox(formData, "published")
  };

  if (id) {
    await prisma.project.update({
      where: { id },
      data: payload
    });
  } else {
    await prisma.project.create({ data: payload });
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (id) {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin");
  }
}

export async function saveExperience(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const parsed = experienceSchema.parse({
    company: formData.get("company"),
    role: formData.get("role"),
    period: formData.get("period"),
    description: formData.get("description"),
    highlights: formData.get("highlights"),
    order: formData.get("order")
  });

  const payload = {
    ...parsed,
    highlights: splitCommaSeparated(parsed.highlights ?? "")
  };

  if (id) {
    await prisma.experience.update({
      where: { id },
      data: payload
    });
  } else {
    await prisma.experience.create({ data: payload });
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteExperience(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (id) {
    await prisma.experience.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin");
  }
}

export async function savePost(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const parsed = postSchema.parse({
    title: formData.get("title"),
    slug: cleanSlug(String(formData.get("slug") || formData.get("title") || "")),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverImage: formData.get("coverImage")
  });

  const published = checkbox(formData, "published");
  const payload = {
    ...parsed,
    published,
    publishedAt: published ? new Date() : null
  };

  if (id) {
    await prisma.post.update({
      where: { id },
      data: payload
    });
  } else {
    await prisma.post.create({ data: payload });
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (id) {
    await prisma.post.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/admin");
  }
}

export async function saveSocialLink(formData: FormData) {
  await requireAdmin();

  const profile = await prisma.profile.findUnique({
    where: { ownerKey: "primary" }
  });

  if (!profile) {
    throw new Error("Create the profile before adding social links.");
  }

  const id = String(formData.get("id") ?? "").trim();
  const parsed = socialSchema.parse({
    platform: formData.get("platform"),
    label: formData.get("label"),
    url: formData.get("url"),
    order: formData.get("order")
  });

  const payload = {
    ...parsed,
    profileId: profile.id
  };

  if (id) {
    await prisma.socialLink.update({
      where: { id },
      data: payload
    });
  } else {
    await prisma.socialLink.create({ data: payload });
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteSocialLink(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (id) {
    await prisma.socialLink.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin");
  }
}

export async function saveSiteSetting(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const parsed = settingSchema.parse({
    key: formData.get("key"),
    value: formData.get("value")
  });

  if (id) {
    await prisma.siteSetting.update({
      where: { id },
      data: parsed
    });
  } else {
    await prisma.siteSetting.upsert({
      where: { key: parsed.key },
      update: { value: parsed.value },
      create: parsed
    });
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteSiteSetting(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (id) {
    await prisma.siteSetting.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin");
  }
}
