'use client';

import { editPost } from '@/app/action/post';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { PostSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export type PostSchemaType = z.infer<typeof PostSchema>;

interface Props {
  postContent: string;
  title: string;
  postId: string;
  summation: string;
}

export function EditPostDialog({
  postContent,
  title,
  postId,
  summation,
}: Props) {
  const [isPublic, setIsPublic] = useState(true);
  const router = useRouter();
  const form = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      summation,
    },
    mode: 'all',
  });

  const toggleSwitch = () => {
    setIsPublic(!isPublic);
  };

  const onSubmit = async (values: PostSchemaType) => {
    const formatSummation = values.summation.replace(/\n/g, '<br>');
    const result = await editPost({
      postId,
      title: title,
      content: postContent,
      summation: formatSummation,
      isPublished: true,
    });
    toast.message(result.message);
    if (result.success) router.replace(`/post/${postId}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='button' className='w-20 h-12 font-semibold text-lg'>
          다음
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-3'
          >
            <DialogHeader className='pb-5'>
              <DialogTitle>수정하기</DialogTitle>
              <DialogDescription aria-hidden />
            </DialogHeader>
            <FormField
              control={form.control}
              name={'summation' as keyof PostSchemaType}
              render={({ field: controllerField }) => (
                <div className='flex flex-col gap-3'>
                  <FormItem>
                    <FormLabel className='text-base font-bold'>
                      포스팅 제목
                    </FormLabel>
                    <Input value={title} disabled />
                  </FormItem>
                  <FormItem className='relative'>
                    <FormLabel className='text-base font-bold'>
                      포스팅 요약
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='포스팅을 요약해주세요'
                        className={cn(
                          form.getFieldState(
                            'summation' as keyof PostSchemaType
                          ).error && 'bg-red bg-opacity-10 border-red',
                          'border border-gray-300 h-20'
                        )}
                        {...controllerField}
                      />
                    </FormControl>
                    <div className='h-5'>
                      <FormMessage className='text-xs' />
                    </div>
                  </FormItem>
                </div>
              )}
            />
            <div className='flex gap-3'>
              <p className='text-base font-bold'>공개 여부</p>
              <Switch onClick={toggleSwitch} checked={isPublic} />
            </div>
            <Button
              type='submit'
              disabled={!form.formState.isValid || !title || !postContent}
            >
              수정
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
