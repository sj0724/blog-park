'use client';

import { editIntroduce } from '@/app/action/user';
import ServerActionButton from '@/components/server-action-button';
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
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EditIntroductionSchema = z.object({
  introduction: z
    .string()
    .min(1, { message: '자기 소개를 입력해주세요' })
    .max(30, { message: '자기 소개는 30글자까지 가능합니다.' }),
});

export type EditIntroductionSchemaType = z.infer<typeof EditIntroductionSchema>;

export default function EditIntroductionForm({
  introduction,
}: {
  introduction: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<EditIntroductionSchemaType>({
    resolver: zodResolver(EditIntroductionSchema),
    defaultValues: {
      introduction: introduction,
    },
    mode: 'all',
  });

  const onSubmit = async (values: EditIntroductionSchemaType) => {
    startTransition(async () => {
      const result = await editIntroduce(values.introduction);
      if (result.success) {
        toast.message(result.message);
        router.refresh();
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full flex items-center gap-3'
      >
        <FormField
          control={form.control}
          name='introduction'
          render={({ field }) => (
            <FormItem className='relative w-full'>
              <FormLabel className='text-base font-bold'>자기 소개</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='자기 소개를 입력해 주세요.'
                  className={cn(
                    form.getFieldState('introduction').error &&
                      'bg-red bg-opacity-10 border-red',
                    'shadow-md h-12 text-base'
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
        <ServerActionButton
          type='submit'
          disabled={
            introduction === form.getValues('introduction') ||
            !form.formState.isValid
          }
          isPending={isPending}
        >
          수정
        </ServerActionButton>
      </form>
    </Form>
  );
}
