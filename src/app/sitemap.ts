import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";
import { supabase } from "@/lib/supabase";
import { SITE_URL } from "@/lib/site";

type SitemapRow = { slug: string | null; id: string; updated_at: string | null };

async function getSitemapRows(): Promise<{ programs: SitemapRow[]; stories: SitemapRow[] }> {
  "use cache";
  cacheLife("hours");

  if (!supabase) return { programs: [], stories: [] };

  const [programsRes, storiesRes] = await Promise.all([
    supabase.from("programs").select("slug, id, updated_at"),
    supabase.from("applicant_stories").select("slug, id, updated_at").eq("is_published", true),
  ]);

  if (programsRes.error) console.error("Error generating programs sitemap:", programsRes.error);
  if (storiesRes.error) console.error("Error generating stories sitemap:", storiesRes.error);

  return { programs: programsRes.data ?? [], stories: storiesRes.data ?? [] };
}

// Newest updated_at among rows, so list pages only report a change when their content changed
function latest(rows: SitemapRow[]): Date | undefined {
  const times = rows.flatMap((row) => (row.updated_at ? [new Date(row.updated_at).getTime()] : []));
  return times.length > 0 ? new Date(Math.max(...times)) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { programs, stories } = await getSitemapRows();
  const programsUpdated = latest(programs);
  const storiesUpdated = latest(stories);

  // Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: programsUpdated,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/list`,
      lastModified: programsUpdated,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/cerita-aplikan`,
      lastModified: storiesUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/peer-mentoring`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic Programs Pages
  const programRoutes: MetadataRoute.Sitemap = programs.map((program) => ({
    url: `${SITE_URL}/list/${program.slug || program.id}`,
    lastModified: program.updated_at ? new Date(program.updated_at) : undefined,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic Stories Pages
  const storyRoutes: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${SITE_URL}/cerita-aplikan/${story.slug || story.id}`,
    lastModified: story.updated_at ? new Date(story.updated_at) : undefined,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...programRoutes, ...storyRoutes];
}
