import fetch from '@/config/client';
import actions from '@/shared/actions';
import { m as motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { app_metadata } from '@/shared/data';
import media_login from '@/assets/media-login.jpg';
import { useAppContext } from '@/context/AppContext';
import { InputEvents, SubmitEvent, TAuth } from '@/types';
import { _signin as Container } from '@/styles/routes/_signin';
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

export function SignIn() {
  const navigate: NavigateFunction = useNavigate();
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

      navigate(`/workspace`, { replace: true });
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
          <img
            loading='lazy'
            decoding='async'
            src={media_login}
            alt='background image'
          />

          <article>
            <div className='form-container'>
              <h2>Hello, welcome back!</h2>
              <p>Please fill the form below to access your account.</p>
              <form onSubmit={handleSubmit}>
                <section className='input-field'>
                  <label htmlFor='email'>
                    <EnvelopeClosedIcon />
                    <span>E-mail</span>
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    autoComplete='on'
                    placeholder='Type your email'
                    aria-label='Type your email'
                    required
                    onChange={(e): void => handleChange(e)}
                  />
                </section>

                <section className='input-field'>
                  <label htmlFor='password'>
                    <LockClosedIcon />
                    <span>Password</span>
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    aria-hidden='true'
                    placeholder='Type your password'
                    aria-label='Type your password'
                    autoComplete='on'
                    onChange={(e): void => handleChange(e)}
                  />
                </section>
                <div className='password-reset'>
                  <Link
                    to={'/auth/password-recovery'}
                    preventScrollReset={false}>
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
