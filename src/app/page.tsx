import Hero from "@/container/Hero";
import NearestDeadlines from "@/container/NearestDeadlines";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 w-full">
      <Hero />
      <NearestDeadlines />
    </main>
  );
}
