import Layout from '@/components/Layout';
import fetch from '@/config/client';
import { app_metadata } from '@/shared/data';
import { _recoveryPassword as Container } from '@/styles/routes/_recovery-pasword';
import { FetchError, SubmitEvent } from '@/types';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { m as motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

export default function PasswordRecovery() {
  const theme = useTheme();
  const navigate: NavigateFunction = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({ status: false, message: '' });

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await fetch({
        method: 'post',
        url: '/api/v1/auth/request-new-password',
        data: email,
        withCredentials: true
      });
      navigate('/auth/_password-recovery-success', { replace: true });
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
        title: `${app_metadata.appName} | Password Recovery`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }}>
      <Container>
        <div className='wrapper-container'>
          <article>
            <div className='form-container'>
              <h2>Password Recovery</h2>
              <p>
                Please type the e-mail associated with your account and we will send an
                e-mail with instructions to recover your account.
              </p>
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
                    autoComplete='off'
                    placeholder='Type your email account'
                    aria-label='Type your email account'
                    required={true}
                    onChange={(e): void => setEmail(e.target.value)}
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
                  <span>Confirm and send request</span>
                </motion.button>
              </form>
            </div>
          </article>
        </div>
      </Container>
    </Layout>
  );
}
