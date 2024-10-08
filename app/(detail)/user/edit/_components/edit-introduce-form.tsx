'use client';

import { editIntroduce } from '@/app/action/user';
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
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
  const { data: session, update } = useSession();
  const router = useRouter();
  const form = useForm<EditIntroductionSchemaType>({
    resolver: zodResolver(EditIntroductionSchema),
    defaultValues: {
      introduction: introduction,
    },
    mode: 'all',
  });

  const onSubmit = async (values: EditIntroductionSchemaType) => {
    const result = await editIntroduce(values.introduction);
    if (result.success) {
      update({
        ...session,
        user: { ...session?.user, introduction: values.introduction },
      });
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
          name='introduction'
          render={({ field }) => (
            <FormItem className='relative w-full'>
              <FormLabel className='text-base'>자기 소개</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='자기 소개를 입력해 주세요.'
                  className={cn(
                    form.getFieldState('introduction').error &&
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
          disabled={
            introduction === form.getValues('introduction') ||
            !form.formState.isValid
          }
        >
          수정
        </Button>
      </form>
    </Form>
  );
}
