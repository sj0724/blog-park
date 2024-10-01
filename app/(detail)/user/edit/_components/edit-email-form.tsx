'use client';

import { editEmail } from '@/app/action/user';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EditEmailSchema = z.object({
  email: z.string().email({ message: '올바른 이메일 형식을 입력해 주세요.' }),
});

export type EditEmailSchemaType = z.infer<typeof EditEmailSchema>;

export default function EditEmailorm({ email }: { email: string }) {
  const router = useRouter();
  const form = useForm<EditEmailSchemaType>({
    resolver: zodResolver(EditEmailSchema),
    defaultValues: {
      email: email,
    },
    mode: 'all',
  });

  const onSubmit = async (values: EditEmailSchemaType) => {
    const result = await editEmail(values.email);
    if (result.success) {
      toast.message(result.message);
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full flex items-center gap-3'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-base'>이메일</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='이메일을 입력해 주세요.'
                  className={cn(
                    form.getFieldState('email').error &&
                      'bg-red bg-opacity-10 border-red',
                    'border border-gray-300'
                  )}
                  {...field}
                />
              </FormControl>
              <div className='h-5'>
                <FormMessage className='text-xs' />
              </div>
            </FormItem>
          )}
        />
        <Button type='submit'>수정</Button>
      </form>
    </Form>
  );
}
