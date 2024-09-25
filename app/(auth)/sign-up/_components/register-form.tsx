'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { RegisterSchema } from '@/schema';
import { cn } from '@/lib/utils';
import { register } from '@/app/action/user';
import { registerFields } from '@/constants/form-filed';

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
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
    const result = await register(values);
    console.log(result.message);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name={registerFields[0].name as keyof RegisterSchemaType}
          render={({ field: controllerField }) => (
            <FormItem className='relative'>
              <FormLabel>{registerFields[0].label}</FormLabel>
              <FormControl className='text-base'>
                <div className='relative'>
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
                </div>
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
              <FormLabel>{registerFields[1].label}</FormLabel>
              <FormControl className='text-base'>
                <div className='relative'>
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
                </div>
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
              <FormLabel>{registerFields[2].label}</FormLabel>
              <FormControl className='text-base'>
                <div className='relative'>
                  <Input
                    type={registerFields[2].type}
                    placeholder={registerFields[2].placeholder}
                    className={cn(
                      form.getFieldState(
                        registerFields[2].name as keyof RegisterSchemaType
                      ).error && 'bg-red bg-opacity-10 border-red',
                      'border border-gray-300'
                    )}
                    {...controllerField}
                  />
                </div>
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
              <FormLabel>{registerFields[3].label}</FormLabel>
              <FormControl className='text-base'>
                <Input
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
        <Button type='submit' disabled={!form.formState.isValid}>
          가입
        </Button>
      </form>
    </Form>
  );
}
