import Link from 'next/link';
import { NextPage } from 'next';
import Layout from '@/src/components/Layout';
import { app_metadata } from '@/src/data/app-data';
import { BsLock, BsPersonPlus } from 'react-icons/bs';
import { _signinSuccess as Container } from '@/src/styles/routes/_signup-sucess';

const SignupSuccess: NextPage = (): JSX.Element => (
  <Layout
    renderFooter
    renderHeader
    metadata={{
      title: `${app_metadata.appName} | Account created successful`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }}>
    <Container>
      <main>
        <article>
          <section>
            <div>
              <BsPersonPlus />
            </div>
            <h2>Joined successfully!</h2>
            <p>
              You have created your account successfuly, now can click the login
              button below to continue.
            </p>

            <Link href={`/auth/signin`} className='a-open-mail'>
              <BsLock />
              <span>Login now</span>
            </Link>
            <Link href={`/`} className='a-back'>
              <span>Skip, I will check it later.</span>
            </Link>
          </section>
        </article>
      </main>
    </Container>
  </Layout>
);

export default SignupSuccess;
