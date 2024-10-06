import { UserAvatar } from '@/components/user-avatar';
import { SupabaseUser } from '@/type';

interface Props {
  content: string;
  isRead: boolean;
  createdAt: string | null;
  user: SupabaseUser;
}

export default function AlarmCard({ content, isRead, createdAt, user }: Props) {
  return (
    <div
      className={`border rounded-lg flex items-center gap-2 py-3 px-5 hover:shadow-lg hover:-translate-y-1 transition-transform ${
        isRead && 'bg-gray-200'
      }`}
    >
      <div className='flex items-center gap-2'>
        <UserAvatar image={user.image} size='sm' />
        <p>{`${user.name} 님이`}</p>
      </div>
      <div>
        <p>{content}</p>
      </div>
      <p>{createdAt}</p>
    </div>
  );
}
