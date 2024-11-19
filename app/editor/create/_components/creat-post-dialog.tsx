'use client';

import { creatPost } from '@/app/action/post';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import TagInput from '../../_components/tag-input';
import ServerActionButton from '@/components/server-action-button';
import { deleteTemporaryPost } from '@/app/action/teporary-post';
import ThumbnailInput from '../../_components/thumbnail-input';

export type PostSchemaType = z.infer<typeof PostSchema>;

interface Props {
  postContent: string;
  title: string;
}

export function CreatPostDialog({ postContent, title }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isPublic, setIsPublic] = useState(true);
  const [tagList, setTagList] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState('');
  const router = useRouter();
  const form = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      summation: '',
    },
    mode: 'all',
  });
  const searchParams = useSearchParams();
  const temporaryId = searchParams.get('id');

  const toggleSwitch = () => {
    setIsPublic(!isPublic);
  };

  const editTagList = (tagList: string[]) => {
    setTagList(tagList);
  };

  const editThumbnail = (image: string) => {
    setThumbnail(image);
  };

  const onSubmit = async (values: PostSchemaType) => {
    startTransition(async () => {
      const result = await creatPost({
        title: title,
        content: postContent,
        summation: values.summation,
        isPublished: isPublic,
        tagList,
        thumbnail,
      });

      toast.message(result.message);
      if (result.success) {
        if (temporaryId) {
          await deleteTemporaryPost(temporaryId);
        }
        router.replace('/');
      }
    });
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
              <DialogTitle>포스팅하기</DialogTitle>
              <DialogDescription aria-hidden />
            </DialogHeader>
            <FormField
              control={form.control}
              name={'summation' as keyof PostSchemaType}
              render={({ field: controllerField }) => (
                <div className='flex flex-col gap-3'>
                  <FormItem>
                    <p className='text-base font-bold'>포스팅 제목</p>
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
              <p className='text-base font-bold'>썸네일</p>
              <ThumbnailInput editThumbnail={editThumbnail} />
            </div>
            <div className='flex gap-3'>
              <p className='text-base font-bold'>공개 여부</p>
              <Switch onClick={toggleSwitch} checked={isPublic} />
            </div>
            <ServerActionButton
              type='submit'
              disabled={!form.formState.isValid || !title || !postContent}
              className='w-full'
              isPending={isPending}
            >
              제출
            </ServerActionButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
