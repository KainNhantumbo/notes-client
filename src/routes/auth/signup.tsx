import {
  DotsHorizontalIcon,
  EnvelopeClosedIcon,
  LockClosedIcon
} from '@radix-ui/react-icons';
import fetch from '@/config/client';
import { AxiosError } from 'axios';
import { m as motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { PulseLoader } from 'react-spinners';
import { app_metadata } from '@/shared/data';
import { NavigateFunction, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import loginImage from '@/assets/media-login.jpg';
import { useTheme } from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { _signup as Container } from '@/styles/routes/_signup';
import { UserSignupType, userSignupSchema } from '@/config/schemas';
import loginPlaceholderImage from '@/assets/media-login-placeholder.jpg';

type FetchError = AxiosError<{ message: string; code: number }>;

export default function SignUp() {
  const theme = useTheme();
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({ status: false, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserSignupType>({
    resolver: zodResolver(userSignupSchema)
  });

  const onSubmit: SubmitHandler<UserSignupType> = async (data) => {
    setLoading(true);
    try {
      await fetch({
        method: 'post',
        url: '/api/v1/users',
        data: { ...data },
        withCredentials: true
      });
      navigate(`/auth/signup-success`, { replace: true });
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

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <Layout
      renderFooter
      renderHeader
      metadata={{
        title: `${app_metadata.appName} | Sign Up`,
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
              <h2>Hi, welcome to {app_metadata.appName}</h2>
              <p>Please fill the form below to create a new user account.</p>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='first_name'>
                      <DotsHorizontalIcon />
                      <span>First name</span>
                    </label>
                    <input
                      type='text'
                      id='first_name'
                      autoComplete='on'
                      placeholder='Your last name'
                      {...register('first_name')}
                    />
                    {errors.first_name ? (
                      <p className='error-message'>
                        {errors.first_name?.message}
                      </p>
                    ) : null}
                  </div>
                  <div className='form-element'>
                    <label htmlFor='last_name'>
                      <DotsHorizontalIcon />
                      <span>Last name</span>
                    </label>
                    <input
                      type='text'
                      id='last_name'
                      placeholder='Your last name'
                      {...register('last_name')}
                    />
                    {errors.last_name ? (
                      <p className='error-message'>
                        {errors.last_name?.message}
                      </p>
                    ) : null}
                  </div>
                </section>

                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='email'>
                      <EnvelopeClosedIcon />
                      <span>E-mail</span>
                    </label>
                    <input
                      type='email'
                      id='email'
                      placeholder='Your email'
                      {...register('email')}
                    />
                    {errors.email ? (
                      <p className='error-message'>{errors.email?.message}</p>
                    ) : null}
                  </div>
                  <div className='form-element'>
                    <label htmlFor='password'>
                      <LockClosedIcon />
                      <span>Password</span>
                    </label>
                    <input
                      type='password'
                      id='password'
                      placeholder='Password'
                      {...register('password')}
                    />
                    {errors.password ? (
                      <p className='error-message'>
                        {errors.password?.message}
                      </p>
                    ) : null}
                  </div>
                </section>

                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='confirm_password'>
                      <LockClosedIcon />
                      <span>Confirm password</span>
                    </label>
                    <input
                      type='password'
                      id='confirm_password'
                      placeholder='Confirm your password'
                      {...register('confirm_password')}
                    />
                    {errors.confirm_password ? (
                      <p className='error-message'>
                        {errors.confirm_password?.message}
                      </p>
                    ) : null}
                  </div>
                </section>

                {loading && !error.status ? (
                  <PulseLoader
                    color={`rgb(${theme.primary})`}
                    loading={loading}
                    aria-placeholder='Loading...'
                    cssOverride={{
                      display: 'block',
                      margin: '0 auto'
                    }}
                  />
                ) : null}

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className='next'
                  type='submit'
                  disabled={loading || error.status ? true : false}>
                  <span>Signup</span>
                </motion.button>
              </form>
              <div className='sign-in-options'>
                <div className='signup-request'>
                  Already have an account?
                  <Link to={'/auth/signin'} preventScrollReset={false}>
                    <span> Sign in.</span>
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
