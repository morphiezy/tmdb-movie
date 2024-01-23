import { Skeleton } from "@/components/ui/skeleton";

export function MovieContentSkeleton() {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <Skeleton className="w-40 h-6 md:w-52 md:h-8 lg:w-64 lg:h-10 rounded-md" />
      <Skeleton className="w-full h-48 md:h-64 lg:h-80 rounded-md" />
    </div>
  );
}
