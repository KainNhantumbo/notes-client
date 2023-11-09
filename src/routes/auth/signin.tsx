import { AxiosError } from 'axios';
import fetch from '@/config/client';
import actions from '@/shared/actions';
import { m as motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { app_metadata } from '@/shared/data';
import loginImage from '@/assets/media-login.jpg';
import loginPlaceholderImage from '@/assets/media-login-placeholder.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAppContext } from '@/context/AppContext';
import { Auth } from '@/types';
import { _signin as Container } from '@/styles/routes/_signin';
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { userLoginSchema, UserLoginType } from '@/config/schemas';

type FetchError = AxiosError<{ message: string; code: number }>;

export default function SignIn() {
  const navigate: NavigateFunction = useNavigate();
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({ status: false, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserLoginType>({
    resolver: zodResolver(userLoginSchema)
  });

  const onSubmit: SubmitHandler<UserLoginType> = async ({
    email,
    password
  }) => {
    setLoading(true);
    try {
      const { data } = await fetch<Auth>({
        method: 'post',
        url: '/api/v1/auth/default/login',
        data: { email, password },
        withCredentials: true
      });

      dispatch({
        type: actions.AUTH,
        payload: { ...state, auth: { ...data } }
      });
      navigate(`/workspace`, { replace: true });
    } catch (error) {
      console.error((error as FetchError).response?.data?.message || error);
      setError({
        status: true,
        message:
          (error as FetchError).response?.data?.message ||
          String((error as FetchError).code)
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect((): (() => void) => {
    const debounceTimer = setTimeout(() => {
      setError({ status: false, message: '' });
    }, 5000);
    return (): void => clearTimeout(debounceTimer);
  }, [error.status]);

  return (
    <Layout
      renderFooter
      renderHeader
      metadata={{
        title: `${app_metadata.appName} | Sign In`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }}>
      <Container>
        <div className='wrapper-container'>
          <LazyLoadImage
            effect='blur'
            width={'100%'}
            height={'100%'}
            placeholderSrc={loginPlaceholderImage}
            src={loginImage}
            alt='background image'
          />

          <article>
            <div className='form-container'>
              <h2>Hello, welcome back!</h2>
              <p>Please fill the form below to access your account.</p>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <section className='input-field'>
                  <label htmlFor='email'>
                    <EnvelopeClosedIcon />
                    <span>E-mail</span>
                  </label>
                  <input
                    type='email'
                    id='email'
                    autoComplete='on'
                    placeholder='Type your email'
                    {...register('email')}
                  />

                  {errors.email ? (
                    <p className='error-message'>{errors.email?.message}</p>
                  ) : null}
                </section>

                <section className='input-field'>
                  <label htmlFor='password'>
                    <LockClosedIcon />
                    <span>Password</span>
                  </label>
                  <input
                    type='password'
                    id='password'
                    placeholder='Type your password'
                    {...register('password')}
                  />
                  {errors.password ? (
                    <p className='error-message'>{errors.password?.message}</p>
                  ) : null}
                </section>
                <div className='password-reset'>
                  <Link
                    to={'/auth/password-recovery'}
                    preventScrollReset={false}>
                    <span>Forgot password? Recover account.</span>
                  </Link>
                </div>

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className='login'
                  type='submit'
                  disabled={loading || error.status ? true : false}>
                  <span>Login</span>
                </motion.button>
              </form>

              <div className='sign-in-options'>
                <div className='signup-request'>
                  Don't have a account yet?
                  <Link to={'/auth/signup'} preventScrollReset={false}>
                    <span> Sign up.</span>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </Layout>
  );
}
