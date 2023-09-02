import {Link} from 'react-router-dom';
import Layout from '@/src/components/Layout';
import { app_metadata } from '@/src/data/app-data';
import { _signinSuccess as Container } from '@/src/styles/routes/_signup-sucess';
import { CardStackIcon, EnvelopeOpenIcon } from '@radix-ui/react-icons';
import { FC } from 'react';

const ResetPasswordSuccess: FC = (): JSX.Element => (
  <Layout
    renderFooter
    renderHeader
    metadata={{
      title: `${app_metadata.appName} | Account created successful`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }}>
    <Container>
      <div className='wrapper-container'>
        <article>
          <section>
            <div>
              <CardStackIcon />
            </div>
            <h2>Please check your mail box!</h2>
            <p>
              We already sent an e-mail with instructions to reset your
              password.
            </p>

            <Link to={`mailto:`} className='a-open-mail'>
              <EnvelopeOpenIcon/>
              <span>Go to your mail box</span>
            </Link>
            <Link to={`/`} className='a-back'>
              <span>Skip, I will check it later.</span>
            </Link>
          </section>
        </article>
        <section>
          <span>Can't find the mail? Check also your spam folder.</span>
        </section>
      </div>
    </Container>
  </Layout>
);

export default ResetPasswordSuccess;
