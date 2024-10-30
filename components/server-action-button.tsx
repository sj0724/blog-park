import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button } from './ui/button';
import Spinner from './spinner';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isPending?: boolean;
}

export default function ServerActionButton({
  children,
  disabled,
  type,
  isPending,
  className,
  onClick,
}: Props) {
  return (
    <div className='relative'>
      {isPending && <Spinner />}
      <Button
        disabled={disabled}
        type={type}
        className={className}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
}
