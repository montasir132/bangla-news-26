// components/NewsCardSkeleton.tsx
const NewsCardSkeleton = () => {
  return (
    <div className="flex h-full animate-pulse flex-col overflow-hidden rounded-xl border border-gray-200 bg-base-100 shadow-sm">
      <div className="aspect-video w-full bg-gray-200" />

      <div className="flex flex-1 flex-col p-4">
        <div className="h-5 w-11/12 rounded bg-gray-200" />
        <div className="mt-2 h-5 w-2/3 rounded bg-gray-200" />

        <div className="mt-4 h-3 w-full rounded bg-gray-200" />
        <div className="mt-2 h-3 w-full rounded bg-gray-200" />
        <div className="mt-2 h-3 w-4/5 rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default NewsCardSkeleton;