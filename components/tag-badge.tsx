export default function TagBadge({ tag }: { tag: string }) {
  return (
    <div className='px-3 py-1 text-blue-500 bg-gray-100 rounded-full'>
      {tag}
    </div>
  );
}
