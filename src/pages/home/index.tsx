import { NowPlayingMovie } from "@/components/now-playing-movie";

export default function Home() {
  return (
    <div className="container">
      <div className="py-6 lg:py-10">
        <NowPlayingMovie />
      </div>
    </div>
  );
}
