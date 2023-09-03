import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from 'common/ui';
import { signIn, signUp } from 'config/reducers/user';
import { useAppDispatch } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { loginShema, registrationSchema } from './validation';

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registrationSchema) });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { call, error, isLoading } = useAuth('sign-up');

  const onSubmit = async (values: { username: string; email: string; password: string; confirmPassword: string }) => {
    const body = {
      email: values.email,
      username: values.username,
      password: values.password,
    };
    const user = await call(body);
    if (user) {
      dispatch(signUp(user));
      navigate('/user');
    }
  };
  return (
    <div className='mx-auto w-2/3 max-w-[400px] xs1:w-[50vw]'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-center gap-y-8'>
        <TextField
          {...register('username')}
          error={errors.username?.message}
          type='text'
        />
        <TextField
          {...register('email')}
          error={errors.email?.message}
          type='text'
        />
        <TextField
          {...register('password')}
          error={errors.password?.message}
          type='password'
        />
        <TextField
          {...register('confirmPassword')}
          error={errors['confirmPassword']?.message}
          type='password'
        />
        {error ? <span className='text-center font-bold text-red-400'>{error}</span> : null}
        <button
          className={twMerge(
            'font-bol mx-auto w-32 rounded-xl border-0 px-1 py-2 font-bold text-slate-800',
            // hover effect
            'hover:-translate-y-1 hover:scale-110 hover:border-[3px] hover:border-blue-700',
            // transition
            'transition-all delay-100 ease-linear',
          )}
          type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginShema) });
  const { call, error, isLoading } = useAuth('sign-in');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = async (values: { emailOrUsername: string; password: string }) => {
    const user = await call(values);
    if (user) {
      dispatch(signIn(user));
      navigate('/user');
    }
  };
  return (
    <div className='mx-auto w-2/3 max-w-[400px] xs1:w-[50vw]'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-center gap-y-8'>
        <TextField
          {...register('emailOrUsername')}
          error={errors['emailOrUsername']?.message}
          type='text'
        />
        <TextField
          {...register('password')}
          error={errors.password?.message}
          type='password'
        />
        {error ? <span className='text-center font-bold text-red-400'>{error}</span> : null}
        <button
          className={twMerge(
            'font-bol mx-auto w-32 rounded-xl border-0 px-1 py-2 font-bold text-slate-800',
            // hover effect
            'hover:-translate-y-1 hover:scale-110 hover:border-[3px] hover:border-blue-700',
            // transition
            'transition-all delay-100 ease-linear',
          )}
          type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

const Authorization = () => {
  const [visibleForm, setVisibleForm] = useState<'register' | 'login'>('register');

  const toggleForm = () => {
    setVisibleForm((current) => (current === 'register' ? 'login' : 'register'));
  };
  return (
    <main
      className={twMerge(
        'mx-auto mt-32 rounded-3xl bg-slate-900 px-0 py-10 xs1:px-2',
        'flex flex-col justify-center',
        'w-full xs2:w-10/12 xs1:w-9/12  sm:w-8/12 lg:w-2/3',
        'max-w-[720px]',
      )}>
      <h1 className='mx-auto mb-10 text-center text-4xl capitalize text-zinc-300'>
        {visibleForm === 'register' ? 'sign up' : 'sign in'}
      </h1>
      {visibleForm === 'register' ? <RegistrationForm /> : <LoginForm />}
      <p className='reset-text-margin mt-3 text-center text-zinc-300'>
        {visibleForm === 'register' ? 'Already have an account? ' : 'Return to registration form. '}
        <a
          onClick={toggleForm}
          className='cursor-pointer underline'>
          {visibleForm === 'register' ? 'Log in' : 'Registration'}
        </a>
      </p>
    </main>
  );
};

export default Authorization;
