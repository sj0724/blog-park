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
import { EditPasswordSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export type EditPasswordSchemaType = z.infer<typeof EditPasswordSchema>;

export default function EditPasswordForm({ Oauth }: { Oauth: boolean }) {
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
            className='w-full flex gap-3 h-full'
          >
            <div className='flex flex-col w-full'>
              {editPasswordFields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name as keyof EditPasswordSchemaType}
                  render={({ field: controllerField }) => (
                    <FormItem className='relative w-full'>
                      <FormLabel className='text-base font-bold h-5'>
                        {field.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={field.label}
                          placeholder={field.placeholder}
                          className={cn(
                            form.getFieldState(
                              field.name as keyof EditPasswordSchemaType
                            ).error && 'bg-red bg-opacity-10 border-red',
                            'shadow-md h-12 text-base'
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
            <div className='min-h-full flex flex-col'>
              <div className='h-1/2 flex justify-center items-center'>
                <Button
                  className='bg-white text-black hover:bg-gray-200'
                  type='button'
                  onClick={toggleIsEdit}
                >
                  취소
                </Button>
              </div>
              <div className='h-1/2 flex justify-center items-center'>
                <Button
                  type='submit'
                  className=''
                  disabled={!form.formState.isValid}
                >
                  수정
                </Button>
              </div>
            </div>
          </form>
        </Form>
      ) : (
        <div className='flex flex-col gap-2 w-full'>
          <p className='font-bold'>비밀번호</p>
          <div className='flex gap-3 items-center'>
            <Input
              disabled
              value='********'
              className='w-full h-12 shadow-md'
            />
            <Button type='button' onClick={toggleIsEdit} disabled={Oauth}>
              수정
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
