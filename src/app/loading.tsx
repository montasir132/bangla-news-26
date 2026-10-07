const Loading = () => {
    return (
        <main className="min-h-[70vh] bg-white px-4 py-8 sm:py-12">

            <div className="container mx-auto">

                {/* Loading Header */}
                <div className="mb-8 flex items-center justify-between">
                <div>
                    <div className="h-7 w-40 animate-pulse rounded-md bg-gray-200" />
                    <div className="mt-2 h-4 w-56 animate-pulse rounded bg-gray-100" />
                </div>

                {/* Loading Spinner */}
                <div className="flex items-center gap-2">
                    <div
                    className="h-5 w-5 animate-spin rounded-full border-2
                    border-gray-200 border-t-[#C40004]"
                    />

                    <span className="hidden text-sm text-gray-500 sm:block">
                    খবর লোড হচ্ছে...
                    </span>
                </div>
                </div>

                {/* Featured Skeleton */}
                <section className="mb-8 grid gap-6 lg:grid-cols-2">

                {/* Image */}
                <div className="h-56 animate-pulse rounded-xl bg-gray-200 sm:h-72 lg:h-80" />

                {/* Content */}
                <div className="flex flex-col justify-center">
                    <div className="h-5 w-24 animate-pulse rounded bg-red-100" />

                    <div className="mt-4 h-8 w-full animate-pulse rounded bg-gray-200" />

                    <div className="mt-3 h-8 w-4/5 animate-pulse rounded bg-gray-200" />

                    <div className="mt-5 h-4 w-full animate-pulse rounded bg-gray-100" />

                    <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-gray-100" />

                    <div className="mt-6 h-4 w-32 animate-pulse rounded bg-gray-200" />
                </div>
                </section>

                {/* Section Title */}
                <div className="mb-6 flex items-center gap-3">
                <div className="h-6 w-1 rounded-full bg-[#C40004]" />
                <div className="h-7 w-36 animate-pulse rounded bg-gray-200" />
                </div>

                {/* News Cards */}
                <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <article
                    key={item}
                    className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
                    >
                    {/* Image */}
                    <div className="h-44 animate-pulse bg-gray-200" />

                    <div className="p-4">

                        {/* Category */}
                        <div className="h-4 w-20 animate-pulse rounded bg-red-100" />

                        {/* Title */}
                        <div className="mt-3 h-5 w-full animate-pulse rounded bg-gray-200" />

                        <div className="mt-2 h-5 w-4/5 animate-pulse rounded bg-gray-200" />

                        {/* Description */}
                        <div className="mt-4 h-3 w-full animate-pulse rounded bg-gray-100" />

                        <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-gray-100" />

                        {/* Bottom */}
                        <div className="mt-5 flex items-center justify-between">
                        <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
                        <div className="h-3 w-16 animate-pulse rounded bg-gray-100" />
                        </div>

                    </div>
                    </article>
                ))}

                </section>

            </div>
        </main>
    );
};

export default Loading;