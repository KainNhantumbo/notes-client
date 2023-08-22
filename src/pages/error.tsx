'use client';
import { FC } from 'react';
import { app_metadata } from '../data/app-data';
import { _error as Container } from '../styles/routes/_error';

type TProps = { error: Error; reset: () => void };

const ErrorPage: FC<TProps> = ({ error, reset }): JSX.Element => (
  <Container>
    <section className='logo-container'>
      <div className='logo'>
        <span>{app_metadata.appName}</span>
      </div>
    </section>
    <section className='content-container'>
      <h1>{error.message ?? 'Oops! This is an error'}</h1>
      <p>{error.message ?? '.'}</p>
      <button onClick={reset}>
        <span>Try again</span>
      </button>
    </section>
  </Container>
);

export default ErrorPage;
