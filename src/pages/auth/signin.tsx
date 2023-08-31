import Image from 'next/image';
import { NextPage } from 'next';
import fetch from '@/src/config/client';
import actions from '@/src/data/actions';
import { m as motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Layout from '@/src/components/Layout';
import { app_metadata } from '@/src/data/app-data';
import { NextRouter, useRouter } from 'next/router';
import media_login from '@/public/assets/media-login.jpg';
import { useAppContext } from '@/src/context/AppContext';
import { InputEvents, SubmitEvent, TAuth } from '@/src/@types';
import { _signin as Container } from '@/src/styles/routes/_signin';
import Link from 'next/link';
import { BsEnvelopeAt, BsLock } from 'react-icons/bs';

const SignIn: NextPage = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({ status: false, message: '' });

  const handleChange = (e: InputEvents): void => {
    dispatch({
      type: actions.SIGN_IN,
      payload: {
        ...state,
        signIn: {
          ...state.signIn,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  const handleSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await fetch<TAuth>({
        method: 'post',
        url: '/api/v1/auth/default/login',
        data: state.signIn,
        withCredentials: true,
      });

      dispatch({
        type: actions.AUTH,
        payload: { ...state, auth: { ...data } },
      });

      router.push(`/workspace`);
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
      setError({
        status: true,
        message: error?.response?.data?.message ?? error?.code,
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
        updatedAt: new Date().toISOString(),
      }}>
      <Container>
        <div className='wrapper-container'>
          <Image
            src={media_login}
            width={undefined}
            height={undefined}
            alt='background image'
            priority={false}
          />

          <article>
            <div className='form-container'>
              <h2>Hello, welcome back!</h2>
              <p>Please fill the form below to access your account.</p>
              <form onSubmit={handleSubmit}>
                <section className='input-field'>
                  <label htmlFor='email'>
                    <BsEnvelopeAt />
                    <span>E-mail</span>
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Type your email'
                    aria-label='Type your email'
                    required
                    onChange={(e): void => handleChange(e)}
                  />
                </section>

                <section className='input-field'>
                  <label htmlFor='password'>
                    <BsLock />
                    <span>Password</span>
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    aria-hidden='true'
                    placeholder='Type your password'
                    aria-label='Type your password'
                    onChange={(e): void => handleChange(e)}
                  />
                </section>
                <div className='password-reset'>
                  <Link href={'/auth/reset-password'}>
                    <span>Forgot password? Recover account.</span>
                  </Link>
                </div>
                {error.status && (
                  <span className='error-message'>{error.message}</span>
                )}

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
                  <Link href={'/auth/signup'}>
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
};

export default SignIn;
