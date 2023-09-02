import { FC } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { app_metadata } from '@/data/app-data';
import { _signinSuccess as Container } from '@/styles/routes/_signup-sucess';
import { LockClosedIcon, PersonIcon } from '@radix-ui/react-icons';

const SignupSuccess: FC = (): JSX.Element => (
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
              <PersonIcon />
            </div>
            <h2>Joined successfully!</h2>
            <p>
              You have created your account successfuly, now can click the login
              button below to continue.
            </p>

            <Link to={`/auth/signin`} className='a-open-mail'>
              <LockClosedIcon />
              <span>Login now</span>
            </Link>
            <Link to={`/`} className='a-back'>
              <span>Skip, I will check it later.</span>
            </Link>
          </section>
        </article>
      </div>
    </Container>
  </Layout>
);

export default SignupSuccess;
