'use client';

import { LoginSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Button } from '@/components/ui/button';
import { loginFields } from '@/constants/form-filed';
import { z } from 'zod';
import { login } from '@/app/action/user';

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (values: LoginSchemaType) => {
    const result = await login(values);
    console.log(result);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <h1 className='mb-2 text-xl font-semibold'>로그인</h1>
        {loginFields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as keyof LoginSchemaType}
            render={({ field: controllerField }) => (
              <FormItem className='relative'>
                <FormLabel className='text-base'>{field.label}</FormLabel>
                <FormControl>
                  {field.type === 'password' ? (
                    <Input
                      placeholder={field.placeholder}
                      className={cn(
                        form.getFieldState(field.name as keyof LoginSchemaType)
                          .error && 'bg-red bg-opacity-10 border-red',
                        'border border-gray-300'
                      )}
                      {...controllerField}
                    />
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      className={cn(
                        form.getFieldState(field.name as keyof LoginSchemaType)
                          .error && 'bg-red bg-opacity-10 border-red',
                        'border border-gray-300'
                      )}
                      {...controllerField}
                    />
                  )}
                </FormControl>
                <div className='h-5'>
                  <FormMessage className='text-xs' />
                </div>
              </FormItem>
            )}
          />
        ))}
        <Button type='submit'>로그인</Button>
      </form>
    </Form>
  );
}
