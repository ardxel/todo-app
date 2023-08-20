import { FC, InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const organizeName = (name: string): string => {
    return name
      .split('')
      .map((l) => (l === l.toUpperCase() ? ' ' + l.toLowerCase() : l))
      .join('');
  };
  const name = props.name ? organizeName(props.name) : undefined;
  return (
    <div className='flex flex-col'>
      {name && (
        <p className={twMerge('reset-text-margin first-letter:capitalize', 'ml-2 py-2 text-zinc-300 lg:text-xl')}>
          {name}
        </p>
      )}
      <input
        {...props}
        ref={ref}
        className={twMerge(
          'rounded-xl bg-slate-200 pb-2 pl-2 pr-3 pt-2 sm:text-lg xl:text-xl',
          // focus effect
          'focus:border-blue-700 focus:outline-none focus:ring',
        )}
      />
      {props.error && <span className='ml-2 text-sm text-gray-200'>*{props.error}</span>}
    </div>
  );
});

TextField.displayName = 'TextField';
