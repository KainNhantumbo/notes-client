import Image from 'next/image';
import { NextPage } from 'next';
import fetch from '@/src/config/client';
import actions from '@/src/data/actions';
import { useEffect, useState } from 'react';
import Layout from '@/src/components/Layout';
import { app_metadata } from '@/src/data/app-data';
import { NextRouter, useRouter } from 'next/router';
import media_login from '@/public/assets/media-login.jpg';
import { useAppContext } from '@/src/context/AppContext';
import { InputEvents, SubmitEvent, TAuth } from '@/src/@types';
import { _signin as Container } from '@/src/styles/routes/_signin';

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
      });

      dispatch({
        type: actions.AUTH,
        payload: { ...state, auth: { ...data } },
      });

      router.push(`/workspace/notes`);
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
      metadata={{ title: `${app_metadata.appName} | Sign In` }}>
      <Container>
        <Image
          src={media_login}
          width={undefined}
          height={undefined}
          alt='background image'
          priority={false}
        />

        <article>
          
        </article>
      </Container>
    </Layout>
  );
};

export default SignIn;
