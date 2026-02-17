export default function SkeletonLoader({ type = 'card' }: { type?: 'card' | 'text' | 'button' }) {
  if (type === 'text') {
    return <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>;
  }

  if (type === 'button') {
    return <div className="h-12 bg-gray-200 rounded-full animate-pulse w-32"></div>;
  }

  return (
    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 animate-pulse">
      <div className="h-10 w-10 bg-gray-200 rounded-full mb-6"></div>
      <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
}
