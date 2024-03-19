import Layout from '@/components/Layout';
import fetch from '@/config/client';
import { app_metadata } from '@/shared/data';
import { _recoveryPassword as Container } from '@/styles/routes/_recovery-pasword';
import { FetchError, InputEvents, SubmitEvent } from '@/types';
import { LockClosedIcon } from '@radix-ui/react-icons';
import { m as motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

export default function UpdatePassword() {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({ status: false, message: '' });
  const [passwords, setPasswords] = useState({
    password: '',
    confirm_password: ''
  });

  const handleChange = (e: InputEvents): void => {
    setPasswords((state) => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirm_password)
      return setError({
        status: true,
        message: 'Your password must match each other.'
      });

    try {
      setLoading(true);
      await fetch({
        method: 'post',
        url: '/api/v1/auth/update-password',
        data: passwords.password
      });
    } catch (error) {
      console.error((error as FetchError).response?.data?.message || error);
      setError({
        status: true,
        message:
          (error as FetchError).response?.data?.message || (error as FetchError).message
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect((): (() => void) => {
    const debounceTimer = setTimeout(() => {
      setError({ status: false, message: '' });
    }, 5000);
    return () => clearTimeout(debounceTimer);
  }, [error.status]);

  return (
    <Layout
      renderFooter
      renderHeader
      metadata={{
        title: `${app_metadata.appName} | Update Password`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }}>
      <Container>
        <div className='wrapper-container'>
          <article>
            <div className='form-container'>
              <h2>Update Password</h2>
              <p>
                Note: your password should be strong and must differ from past used
                passwords.
              </p>
              <form onSubmit={handleSubmit}>
                <section className='input-field'>
                  <label htmlFor='password'>
                    <LockClosedIcon />
                    <span>Password</span>
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    autoComplete='off'
                    minLength={8}
                    aria-hidden='true'
                    placeholder='Type your new password'
                    aria-label='Type your new password'
                    onChange={(e): void => handleChange(e)}
                  />
                </section>
                <section className='input-field'>
                  <label htmlFor='confirm_password'>
                    <LockClosedIcon />
                    <span>Confirm password</span>
                  </label>
                  <input
                    type='password'
                    id='confirm_password'
                    name='confirm_password'
                    autoComplete='off'
                    aria-hidden='true'
                    minLength={8}
                    placeholder='Confirm your password'
                    aria-label='Confirm your password'
                    onChange={(e): void => handleChange(e)}
                  />
                </section>

                {error.status && !loading && (
                  <span className='error-message'>{error.message}</span>
                )}
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
                  className='login'
                  type='submit'
                  disabled={loading || error.status ? true : false}>
                  <span>Submit and update</span>
                </motion.button>
              </form>
            </div>
          </article>
        </div>
      </Container>
    </Layout>
  );
}
