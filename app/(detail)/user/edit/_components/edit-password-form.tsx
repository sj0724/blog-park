'use client';

import { editPassword } from '@/app/action/user';
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
import { editPasswordFields } from '@/constants/form-filed';
import { cn } from '@/lib/utils';
import { EditPasswordSchema, PASSWORD_REGEX } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export type EditPasswordSchemaType = z.infer<typeof EditPasswordSchema>;

export default function EditPasswordForm() {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  const form = useForm<EditPasswordSchemaType>({
    resolver: zodResolver(EditPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
  });

  const onSubmit = async (values: EditPasswordSchemaType) => {
    const result = await editPassword(values.password);
    if (result.success) {
      toast.message(result.message);
      router.refresh();
    }
  };

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <>
      {isEdit ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full flex gap-3 items-end'
          >
            <div className='flex flex-col w-full'>
              {editPasswordFields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name as keyof EditPasswordSchemaType}
                  render={({ field: controllerField }) => (
                    <FormItem className='relative w-full'>
                      <FormLabel className='text-base'>{field.label}</FormLabel>
                      <FormControl>
                        <Input
                          type={field.label}
                          placeholder={field.placeholder}
                          className={cn(
                            form.getFieldState(
                              field.name as keyof EditPasswordSchemaType
                            ).error && 'bg-red bg-opacity-10 border-red',
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
            </div>
            <Button
              type='submit'
              className='mb-7'
              disabled={!form.formState.isValid}
            >
              수정
            </Button>
          </form>
        </Form>
      ) : (
        <div className='flex flex-col gap-2 w-full'>
          <p>비밀번호</p>
          <div className='flex gap-3'>
            <Input disabled value='********' className='w-full' />
            <Button type='button' onClick={toggleIsEdit}>
              수정
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
