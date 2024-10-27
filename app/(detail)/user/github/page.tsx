import { getAllRepo } from '@/app/data/log';

export default async function Page() {
  const test = await getAllRepo();
  console.log(test);
  return <div>깃허브 레포 연동</div>;
}
