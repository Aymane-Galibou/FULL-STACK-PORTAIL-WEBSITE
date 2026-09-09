export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-white" />
    </div>
  );
}
