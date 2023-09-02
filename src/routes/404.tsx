import { FC } from 'react';
import { app_metadata } from '../data/app-data';
import { _error as Container } from '../styles/routes/_error';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const NotFoundError: FC = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

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
        <button onClick={() => navigate('back', { relative: 'path' })}>
          Get back!
        </button>
      </section>
    </Container>
  );
};

export default NotFoundError;
