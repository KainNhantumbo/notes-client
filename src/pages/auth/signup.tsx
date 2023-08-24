import Image from 'next/image';
import { NextPage } from 'next';
import fetch from '../../config/client';
import actions from '@/src/data/actions';
import Layout from '@/src/components/Layout';
import { app_metadata } from '@/src/data/app-data';
import { NextRouter, useRouter } from 'next/router';
import { _signup as Container } from '@/src/styles/routes/_signup';
import { useAppContext } from '@/src/context/AppContext';
import { useEffect, useState } from 'react';
import { InputEvents, SubmitEvent, TAuth } from '@/src/@types';
import media_login from '@/public/assets/media-login.jpg';
import { DefaultTheme, useTheme } from 'styled-components';
import { PulseLoader } from 'react-spinners';
import Link from 'next/link';
import { BsEnvelopeAt, BsLock, BsPass, BsThreeDots } from 'react-icons/bs';

const SignUp: NextPage = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const theme: DefaultTheme = useTheme();
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({ status: false, message: '' });

  const handleChange = (e: InputEvents): void => {
    dispatch({
      type: actions.SIGN_UP,
      payload: {
        ...state,
        signUp: {
          ...state.signUp,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  const handleSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch({
        method: 'post',
        url: '/api/v1/auth/login',
        data: state.signUp,
      });

      // router.push(`/workspace/notes`);
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
      metadata={{ title: `${app_metadata.appName} | Sign Up` }}>
      <Container>
        <Image
          src={media_login}
          width={undefined}
          height={undefined}
          alt='background image'
          priority={false}
        />

        <article>
          <div className='form-container'>
            <h2>Hi, welcome to {app_metadata.appName}</h2>
            <p>Please fill the form below to create a new user account.</p>
            <form onSubmit={handleSubmit}>
              <section className='form-section'>
                <div className='form-element'>
                  <label htmlFor='first_name'>
                    <BsThreeDots />
                    <span>First name</span>
                  </label>
                  <input
                    type='text'
                    id='first_name'
                    name='first_name'
                    placeholder='Your last name'
                    aria-label='Your last name'
                    required={true}
                    onChange={(e): void => handleChange(e)}
                  />
                </div>
                <div className='form-element'>
                  <label htmlFor='last_name'>
                    <BsThreeDots />
                    <span>Last name</span>
                  </label>
                  <input
                    type='text'
                    id='last_name'
                    name='last_name'
                    placeholder='Your last name'
                    aria-label='Your last name'
                    required={true}
                    onChange={(e): void => handleChange(e)}
                  />
                </div>
              </section>

              <section className='form-section'>
                <div className='form-element'>
                  <label htmlFor='email'>
                    <BsEnvelopeAt />
                    <span>E-mail</span>
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Your email'
                    aria-label='Your email'
                    required
                    onChange={(e): void => handleChange(e)}
                  />
                </div>
                <div className='form-element'>
                  <label htmlFor='password'>
                    <BsPass />
                    <span>Password</span>
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    minLength={8}
                    aria-hidden='true'
                    placeholder='Password'
                    aria-label='Password'
                    onChange={(e): void => handleChange(e)}
                  />
                </div>
              </section>

              <section className='form-section'>
                <div className='form-element'>
                  <label htmlFor='confirm_password'>
                    <BsLock />
                    <span>Confirm password</span>
                  </label>
                  <input
                    type='password'
                    id='confirm_password'
                    name='confirm_password'
                    aria-hidden='true'
                    minLength={8}
                    placeholder='Confirm your password'
                    aria-label='Confirm your password'
                    onChange={(e): void => handleChange(e)}
                  />
                </div>
              </section>

              <span className='error-message'>
                {error.status && !loading ? error.message : `  `}
              </span>

              {
                <PulseLoader
                  color={`rgb(${theme.primary})`}
                  loading={loading && !error.status && true}
                  aria-placeholder='Processando...'
                  cssOverride={{
                    display: 'block',
                    margin: '0 auto',
                  }}
                />
              }

              <button
                className='next'
                type='submit'
                disabled={loading || error.status ? true : false}>
                <span>Signup</span>
              </button>
            </form>
            <div className='sign-in-options'>
              <div className='signup-request'>
                Already have an account?
                <Link href={'/auth/sign-in'}>
                  <span> Sign in.</span>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </Container>
    </Layout>
  );
};

export default SignUp;
