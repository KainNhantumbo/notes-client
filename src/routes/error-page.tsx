import { app_metadata } from '@/data/app-data';
import { _error as Container } from '@/styles/routes/_error';

interface IProps {
  title?: string | undefined;
  message?: string | undefined;
  button_message?: string | undefined;
  retryFn: () => void;
}

export function ErrorPage(props: IProps) {
  return (
    <Container>
      <section className='logo-container'>
        <div className='logo'>
          <span>{app_metadata.appName}</span>
        </div>
      </section>
      <section className='content-container'>
        <h1>{props.title ?? 'Oops! This is an error.'}</h1>
        <p>
          {props.message ??
            'Oops! Looks like something bad happened, for now, thats all we know.'}
        </p>
        <button onClick={props.retryFn}>
          {props.button_message ?? 'Try again'}
        </button>
      </section>
    </Container>
  );
}
