import { NextPage } from 'next';
import fetch from '@/src/config/client';
import Layout from '@/src/components/Layout';
import { useState, useEffect } from 'react';
import { SubmitEvent } from '@/src/@types';
import { IoMailOutline } from 'react-icons/io5';
import { app_metadata } from '@/src/data/app-data';
import { PulseLoader } from 'react-spinners';
import { DefaultTheme, useTheme } from 'styled-components';
import { NextRouter, useRouter } from 'next/router';
import { _recoveryPassword as Container } from '@/src/styles/routes/_recovery-pasword';

const PasswordRecovery: NextPage = (): JSX.Element => {
  const theme: DefaultTheme = useTheme();
  const router: NextRouter = useRouter();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({ status: false, message: '' });

  const handleSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      await fetch({
        method: 'post',
        url: '/api/v1/auth/request-new-password',
        data: email,
        withCredentials: true,
      });
      router.push('/auth/_password-recovery-success');
    } catch (error: any) {
      console.error(error);
      setError({ status: true, message: error?.response?.data?.message });
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
      metadata={{
        title: `${app_metadata.appName} | Password Recovery`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }}>
      <Container>
        <main>
          <article>
            <div className='form-container'>
              <h2>Password Recovery</h2>
              <p>
                Please type the e-mail associated with your account and we will
                send an e-mail with instructions to recover your account.
              </p>
              <form onSubmit={handleSubmit}>
                <section className='input-field'>
                  <label htmlFor='email'>
                    <IoMailOutline />
                    <span>E-mail</span>
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Type your email account'
                    aria-label='Type your email account'
                    required={true}
                    onChange={(e): void => setEmail(e.target.value)}
                  />
                </section>

                {error.status && !loading && (
                  <span className='error-message'>{error.message}</span>
                )}
                {loading && !error.status && (
                  <>
                    <PulseLoader
                      color={`rgb(${theme.primary})`}
                      loading={loading}
                      aria-placeholder='Processando...'
                      cssOverride={{
                        display: 'block',
                        margin: '0 auto',
                      }}
                    />
                  </>
                )}
                <button
                  className='login'
                  type='submit'
                  disabled={loading || error.status ? true : false}>
                  <span>Confirm and send request</span>
                </button>
              </form>
            </div>
          </article>
        </main>
      </Container>
    </Layout>
  );
};

export default PasswordRecovery;
