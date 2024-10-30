'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterSchema } from '@/schema';
import { cn } from '@/lib/utils';
import { register } from '@/app/action/user';
import { registerFields } from '@/constants/form-filed';
import { useRouter } from 'next/navigation';
import PasswordInput from '@/components/password-input';
import { useTransition } from 'react';
import ServerActionButton from '@/components/server-action-button';

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
  });

  const onSubmit = async (values: RegisterSchemaType) => {
    startTransition(async () => {
      const result = await register(values);
      if (result.success) router.replace('/sign-in');
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <h1 className='mb-2 text-xl font-semibold'>회원가입</h1>
        <FormField
          control={form.control}
          name={registerFields[0].name as keyof RegisterSchemaType}
          render={({ field: controllerField }) => (
            <FormItem className='relative'>
              <FormLabel className='text-base'>
                {registerFields[0].label}
              </FormLabel>
              <FormControl>
                <Input
                  type={registerFields[0].type}
                  placeholder={registerFields[0].placeholder}
                  className={cn(
                    form.getFieldState(
                      registerFields[0].name as keyof RegisterSchemaType
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
        <FormField
          control={form.control}
          name={registerFields[1].name as keyof RegisterSchemaType}
          render={({ field: controllerField }) => (
            <FormItem className='relative'>
              <FormLabel className='text-base'>
                {registerFields[1].label}
              </FormLabel>
              <FormControl>
                <Input
                  type={registerFields[1].type}
                  placeholder={registerFields[1].placeholder}
                  className={cn(
                    form.getFieldState(
                      registerFields[1].name as keyof RegisterSchemaType
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
        <FormField
          control={form.control}
          name={registerFields[2].name as keyof RegisterSchemaType}
          render={({ field: controllerField }) => (
            <FormItem className='relative'>
              <FormLabel className='text-base'>
                {registerFields[2].label}
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={registerFields[2].placeholder}
                  className={cn(
                    form.getFieldState(
                      registerFields[2].name as keyof RegisterSchemaType
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
        <FormField
          control={form.control}
          name={registerFields[3].name as keyof RegisterSchemaType}
          render={({ field: controllerField }) => (
            <FormItem className='relative'>
              <FormLabel className='text-base'>
                {registerFields[3].label}
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={registerFields[3].placeholder}
                  autoComplete='off'
                  className={cn(
                    form.getFieldState(
                      registerFields[3].name as keyof RegisterSchemaType
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
        <ServerActionButton
          type='submit'
          disabled={!form.formState.isValid}
          className='w-full'
          isPending={isPending}
        >
          가입
        </ServerActionButton>
      </form>
    </Form>
  );
}
