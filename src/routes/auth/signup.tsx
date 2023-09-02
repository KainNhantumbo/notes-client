import {
  DotsHorizontalIcon,
  EnvelopeClosedIcon,
  LockClosedIcon,
} from '@radix-ui/react-icons';
import fetch from '@/config/client';
import actions from '@/data/actions';
import { m as motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { PulseLoader } from 'react-spinners';
import { app_metadata } from '@/data/app-data';
import { NavigateFunction, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { FC, useEffect, useState } from 'react';
import { InputEvents, SubmitEvent } from '@/@types';
import media_login from '@/assets/media-login.jpg';
import { DefaultTheme, useTheme } from 'styled-components';
import { _signup as Container } from '@/styles/routes/_signup';

const SignUp: FC = (): JSX.Element => {
  const theme: DefaultTheme = useTheme();
  const navigate: NavigateFunction = useNavigate();
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
        url: '/api/v1/users',
        data: state.signUp,
        withCredentials: true,
      });
      navigate(`/auth/signup-success`, { replace: true });
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
        title: `${app_metadata.appName} | Sign Up`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }}>
      <Container>
        <div className='wrapper-container'>
          <img
            loading='lazy'
            decoding='async'
            src={media_login}
            alt='background image'
            placeholder='background image'
          />

          <article>
            <div className='form-container'>
              <h2>Hi, welcome to {app_metadata.appName}</h2>
              <p>Please fill the form below to create a new user account.</p>
              <form onSubmit={handleSubmit}>
                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='first_name'>
                      <DotsHorizontalIcon />
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
                      <DotsHorizontalIcon />
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
                      <EnvelopeClosedIcon />
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
                      <LockClosedIcon />
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
                      <LockClosedIcon />
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

                {loading && !error.status ? (
                  <PulseLoader
                    color={`rgb(${theme.primary})`}
                    loading={loading}
                    aria-placeholder='Loading...'
                    cssOverride={{
                      display: 'block',
                      margin: '0 auto',
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
                  <Link to={'/auth/signin'}>
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
};

export default SignUp;
