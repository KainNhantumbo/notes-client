import { NextPage } from 'next';
import { app_metadata } from '../data/app-data';
import { NextRouter, useRouter } from 'next/router';
import { _error as Container } from '../styles/routes/_error';

const InternalServerError: NextPage = (): JSX.Element => {
  const router: NextRouter = useRouter();

  return (
    <Container>
      <section className='logo-container'>
        <div className='logo'>
          <span>{app_metadata.appName}</span>
        </div>
      </section>
      <section className='content-container'>
        <h1>500</h1>
        <h2>Oops! Something went wrong on the server.</h2>
        <p>Try refreshing the page and if the error persists</p>
        <button onClick={() => router.reload()}>
          Get back!
        </button>
      </section>
    </Container>
  );
};

export default InternalServerError;