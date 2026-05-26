"use client";

export default function Error({
  error,
}: {
  error: Error;
}) {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">
        Something Went Wrong
      </h1>

      <p className="mt-4 text-gray-400">
        {error.message}
      </p>
    </div>
  );
}