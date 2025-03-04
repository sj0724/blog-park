'use client';

import { editPost } from '@/app/action/post';
import TagInput from '@/app/editor/_components/tag-input';
import ThumbnailInput from '@/app/editor/_components/thumbnail-input';
import ServerActionButton from '@/components/server-action-button';
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
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export type PostSchemaType = z.infer<typeof PostSchema>;

interface Props {
  postContent: string;
  title: string;
  postId: string;
  summation: string;
  isPublished: boolean;
  postTagList: string[];
  thumbnail: string;
}

export function EditPostDialog({
  postContent,
  title,
  postId,
  summation,
  isPublished,
  postTagList,
  thumbnail,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [isPublish, setIsPublish] = useState(isPublished);
  const [tagList, setTagList] = useState<string[]>(postTagList);
  const [newThumbnail, setNewThumbnail] = useState(thumbnail);
  const router = useRouter();
  const form = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      summation,
    },
    mode: 'all',
  });

  const editThumbnail = (image: string) => {
    setNewThumbnail(image);
  };

  const toggleSwitch = () => {
    setIsPublish(!isPublish);
  };

  const onSubmit = async (values: PostSchemaType) => {
    startTransition(async () => {
      const result = await editPost({
        postId,
        title: title,
        content: postContent,
        summation: values.summation,
        isPublished: isPublish,
        tagList,
        thumbnail: newThumbnail,
      });
      toast.message(result.message);
      if (result.success) router.replace(`/post/${postId}`);
    });
  };

  const editTagList = (tagList: string[]) => {
    setTagList(tagList);
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
                    <FormMessage className='text-xs' />
                  </FormItem>
                </div>
              )}
            />
            <div className='flex flex-col gap-2'>
              <p className='text-base font-bold'>태그</p>
              <TagInput tags={tagList} editTagList={editTagList} />
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-base font-bold'>대표 이미지</p>
              <ThumbnailInput editThumbnail={editThumbnail} />
              <p className='text-[12px] text-gray-500'>
                ※ 정사각형 이미지를 권장합니다.
              </p>
            </div>
            <div className='flex gap-3'>
              <p className='text-base font-bold'>공개 여부</p>
              <Switch onClick={toggleSwitch} checked={isPublish} />
            </div>
            <ServerActionButton
              type='submit'
              disabled={!form.formState.isValid || !title || !postContent}
              className='w-full'
              isPending={isPending}
            >
              수정
            </ServerActionButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
