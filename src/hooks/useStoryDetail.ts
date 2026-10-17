"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { ApplicantStory, JourneyStep } from "@/types/story";

const storyDetailMemoryCache = new Map<string, ApplicantStory>();
const STORY_CACHE_PREFIX = "openpath_story_detail_";

export interface ParsedStoryDetail {
  story: ApplicantStory | null;
  loading: boolean;
  error: string | null;
  journeySteps: JourneyStep[];
  takeawayPoints: string[];
  refetch: () => Promise<void>;
}

export function useStoryDetail(
  id: string,
  initialStory?: ApplicantStory | null,
): ParsedStoryDetail {
  const [story, setStory] = useState<ApplicantStory | null>(initialStory ?? null);
  const [loading, setLoading] = useState<boolean>(!initialStory);
  const [error, setError] = useState<string | null>(null);

  const fetchStory = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/stories/${id}`);
      if (!res.ok) {
        throw new Error("Cerita aplikan tidak ditemukan");
      }
      const data: ApplicantStory = await res.json();
      setStory(data);
      storyDetailMemoryCache.set(id, data);
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(STORY_CACHE_PREFIX + id, JSON.stringify(data));
        } catch {}
      }
    } catch (err: unknown) {
      console.error("Error in useStoryDetail:", err);
      setError(err instanceof Error ? err.message : "Terjadi kesalahan memuat cerita");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let ignore = false;

    // Cache initialStory if provided
    if (initialStory && (initialStory.id === id || initialStory.slug === id)) {
      storyDetailMemoryCache.set(id, initialStory);
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(STORY_CACHE_PREFIX + id, JSON.stringify(initialStory));
        } catch {}
      }
      return;
    }

    async function load() {
      await Promise.resolve();
      if (ignore) return;

      // Check in-memory cache
      const mem = storyDetailMemoryCache.get(id);
      if (mem) {
        setStory(mem);
        setLoading(false);
        return;
      }

      // Check sessionStorage
      if (typeof window !== "undefined") {
        try {
          const raw = sessionStorage.getItem(STORY_CACHE_PREFIX + id);
          if (raw) {
            const parsed = JSON.parse(raw) as ApplicantStory;
            storyDetailMemoryCache.set(id, parsed);
            setStory(parsed);
            setLoading(false);
            return;
          }
        } catch {}
      }

      try {
        const res = await fetch(`/api/stories/${id}`);
        if (!res.ok) {
          throw new Error("Cerita aplikan tidak ditemukan");
        }
        const data: ApplicantStory = await res.json();
        if (!ignore) {
          setStory(data);
          storyDetailMemoryCache.set(id, data);
          if (typeof window !== "undefined") {
            try {
              sessionStorage.setItem(STORY_CACHE_PREFIX + id, JSON.stringify(data));
            } catch {}
          }
          setLoading(false);
        }
      } catch (err: unknown) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Terjadi kesalahan memuat cerita");
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [id, initialStory]);

  // Parse journey steps safely
  const journeySteps = useMemo<JourneyStep[]>(() => {
    if (!story?.journey_steps) return [];
    if (Array.isArray(story.journey_steps)) {
      return story.journey_steps;
    }
    try {
      return JSON.parse(story.journey_steps as unknown as string);
    } catch {
      return [];
    }
  }, [story]);

  // Parse takeaway points safely
  const takeawayPoints = useMemo<string[]>(() => {
    if (!story?.takeaway_points) return [];
    if (Array.isArray(story.takeaway_points)) {
      return story.takeaway_points;
    }
    try {
      return JSON.parse(story.takeaway_points as unknown as string);
    } catch {
      return [];
    }
  }, [story]);

  return {
    story,
    loading,
    error,
    journeySteps,
    takeawayPoints,
    refetch: fetchStory,
  };
}
