import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.openpath.my.id/";

  // Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/list`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cerita-aplikan`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/peer-mentoring`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic Programs Pages
  let programRoutes: MetadataRoute.Sitemap = [];
  if (supabase) {
    try {
      const { data: programs } = await supabase.from("programs").select("slug, id, updated_at");

      if (programs && programs.length > 0) {
        programRoutes = programs.map((program) => ({
          url: `${baseUrl}/list/${program.slug || program.id}`,
          lastModified: program.updated_at ? new Date(program.updated_at) : new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        }));
      }
    } catch (err) {
      console.error("Error generating programs sitemap:", err);
    }
  }

  // Dynamic Stories Pages
  let storyRoutes: MetadataRoute.Sitemap = [];
  if (supabase) {
    try {
      const { data: stories } = await supabase
        .from("applicant_stories")
        .select("slug, id, updated_at")
        .eq("is_published", true);

      if (stories && stories.length > 0) {
        storyRoutes = stories.map((story) => ({
          url: `${baseUrl}/cerita-aplikan/${story.slug || story.id}`,
          lastModified: story.updated_at ? new Date(story.updated_at) : new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        }));
      }
    } catch (err) {
      console.error("Error generating stories sitemap:", err);
    }
  }

  return [...staticRoutes, ...programRoutes, ...storyRoutes];
}
