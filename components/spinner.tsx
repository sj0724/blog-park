import { Loader } from 'lucide-react';

export default function Spinner() {
  return (
    <div className='absolute inset-0 z-10 flex items-center justify-center rounded-md cursor-not-allowed bg-gray-400/50'>
      <Loader className='w-8 h-8 animate-spin' />
    </div>
  );
}
