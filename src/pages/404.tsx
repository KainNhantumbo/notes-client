import { NextPage } from 'next';
import { app_metadata } from '../data/app-data';
import { NextRouter, useRouter } from 'next/router';
import { _error as Container } from '../styles/routes/_error';

const NotFoundError: NextPage = (): JSX.Element => {
  const router: NextRouter = useRouter();

  return (
    <Container>
      <section className='logo-container'>
        <div className='logo'>
          <span>{app_metadata.appName}</span>
        </div>
      </section>
      <section className='content-container'>
        <h1>404</h1>
        <h2>Oops! Lost in {app_metadata.appName}?</h2>
        <p>The page you were looking for does not exist</p>
        <button onClick={() => router.back()}>
          Get back!
        </button>
      </section>
    </Container>
  );
};

export default NotFoundError;
