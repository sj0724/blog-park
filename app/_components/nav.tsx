import Link from 'next/link';
import { getSessionUserData } from '../data/user';
import NavMenu from './nav-menu';
import AlarmButton from './alarm-button';

export default async function Nav() {
  const session = await getSessionUserData();

  return (
    <section className='fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-2 h-20 bg-white/50 backdrop-blur-xl shadow-md z-40'>
      <div className='flex items-center gap-4'>
        <Link href='/'>
          <h1 className='lg:text-5xl text-3xl font-[900] text-blue-500'>
            Blog Park
          </h1>
        </Link>
      </div>
      <div className='flex items-center text-xl font-bold lg:gap-6 gap-2 justify-between'>
        <AlarmButton userId={session?.id} />
        <NavMenu userId={session?.id} />
      </div>
    </section>
  );
}
