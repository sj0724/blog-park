'use client';

import { editName } from '@/app/action/user';
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
const EditNameSchema = z.object({
  name: z
    .string()
    .min(1, { message: '닉네임을 입력해 주세요.' })
    .max(10, { message: '닉네임은 최대 10글자까지 가능합니다.' }),
});

export type EditNameSchemaType = z.infer<typeof EditNameSchema>;

export default function EditNameForm({ name }: { name: string }) {
  const router = useRouter();
  const form = useForm<EditNameSchemaType>({
    resolver: zodResolver(EditNameSchema),
    defaultValues: {
      name: name,
    },
    mode: 'onBlur',
  });

  const onSubmit = async (values: EditNameSchemaType) => {
    const result = await editName(values.name);
    if (result.success) {
      toast.message(result.message);
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full flex justify-between items-center gap-3'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='relative w-full'>
              <FormLabel className='text-base'>닉네임</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='닉네임을 입력해 주세요.'
                  className={cn(
                    form.getFieldState('name').error &&
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
        <Button
          type='submit'
          disabled={name === form.getValues('name') || !form.formState.isValid}
        >
          수정
        </Button>
      </form>
    </Form>
  );
}
