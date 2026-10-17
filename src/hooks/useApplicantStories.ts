"use client";

import { useEffect, useState, useRef } from "react";
import { ApplicantStory } from "@/types/story";
import { useDebounce } from "@/lib/useDebounce";

export type StoryCategoryFilter = "all" | "beasiswa" | "sertifikasi";

interface CachedStoriesData {
  stories: ApplicantStory[];
  timestamp: number;
}

const memoryStoryCache = new Map<string, CachedStoriesData>();
const CACHE_STORAGE_PREFIX = "openpath_stories_cache_";
const CACHE_TTL_MS = 1000 * 60 * 15; // 15 menit cache

function getDeviceCachedStories(key: string): CachedStoriesData | null {
  const inMemory = memoryStoryCache.get(key);
  if (inMemory && Date.now() - inMemory.timestamp < CACHE_TTL_MS) {
    return inMemory;
  }

  if (typeof window !== "undefined") {
    try {
      const raw = sessionStorage.getItem(CACHE_STORAGE_PREFIX + key);
      if (raw) {
        const parsed = JSON.parse(raw) as CachedStoriesData;
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          memoryStoryCache.set(key, parsed);
          return parsed;
        }
      }
    } catch {}
  }

  return null;
}

function saveDeviceCachedStories(key: string, stories: ApplicantStory[]) {
  const payload: CachedStoriesData = { stories, timestamp: Date.now() };
  memoryStoryCache.set(key, payload);
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(CACHE_STORAGE_PREFIX + key, JSON.stringify(payload));
    } catch {}
  }
}

export function useApplicantStories(initialStories: ApplicantStory[] = []) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<StoryCategoryFilter>("all");

  const debouncedSearch = useDebounce(search, 350);
  const cacheKey = `cat=${category}&q=${debouncedSearch}`;

  // Initial state strictly uses initialStories so SSR and client initial render are identical
  const [stories, setStories] = useState<ApplicantStory[]>(initialStories);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isFirstRender = useRef(true);
  const initialStoriesRef = useRef(initialStories);

  useEffect(() => {
    let ignore = false;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      const initial = initialStoriesRef.current;
      if (initial.length > 0) {
        saveDeviceCachedStories("cat=all&q=", initial);
        if (category === "all" && debouncedSearch === "") {
          return;
        }
      }
    }

    async function load() {
      await Promise.resolve();
      if (ignore) return;

      // Check device cache inside async boundary
      const cached = getDeviceCachedStories(cacheKey);
      if (cached) {
        setStories(cached.stories);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          category,
          search: debouncedSearch,
          limit: "6", // Maksimal 6 card
        });

        const res = await fetch(`/api/stories?${params.toString()}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Gagal mengambil cerita aplikan dari database");
        }

        const data = await res.json();
        if (!ignore) {
          const loaded = (data.stories as ApplicantStory[]) || [];
          setStories(loaded);
          saveDeviceCachedStories(cacheKey, loaded);
        }
      } catch (err: unknown) {
        if (!ignore) {
          console.error("Error loading stories from Supabase:", err);
          setError(err instanceof Error ? err.message : "Gagal memuat cerita aplikan");
          setStories([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [debouncedSearch, category, cacheKey]);

  return {
    stories,
    loading,
    error,
    search,
    setSearch,
    category,
    setCategory,
  };
}
