"use client";

const LoadingPlaceholder = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
    </div>
  );
};

export default LoadingPlaceholder;
