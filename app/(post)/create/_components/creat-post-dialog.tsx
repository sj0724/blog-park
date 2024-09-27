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
import { postFields } from '@/constants/form-filed';
import { cn } from '@/lib/utils';
import { PostSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export type PostSchemaType = z.infer<typeof PostSchema>;

export function CreatPostDialog({ postContent }: { postContent: string }) {
  const form = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: '',
      summation: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (values: PostSchemaType) => {
    const result = await creatPost({
      title: values.title,
      content: postContent,
      summation: values.summation,
      isPublished: true,
    });
    toast.message(result.message);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='button'>다음</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className='pb-5'>
              <DialogTitle>포스팅하기</DialogTitle>
              <DialogDescription aria-hidden />
            </DialogHeader>
            {postFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as keyof PostSchemaType}
                render={({ field: controllerField }) => (
                  <FormItem className='relative'>
                    <FormLabel className='text-base font-bold'>
                      {field.label}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        className={cn(
                          form.getFieldState(field.name as keyof PostSchemaType)
                            .error && 'bg-red bg-opacity-10 border-red',
                          'border border-gray-300'
                        )}
                        {...controllerField}
                      />
                    </FormControl>
                    <div className='h-5'>
                      <FormMessage className='text-xs' />
                    </div>
                  </FormItem>
                )}
              />
            ))}
            <Button type='submit' disabled={!form.formState.isValid}>
              제출
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
