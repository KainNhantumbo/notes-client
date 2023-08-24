import Link from 'next/link';
import { NextPage } from 'next';
import Layout from '@/src/components/Layout';
import { app_metadata } from '@/src/data/app-data';
import { BsEnvelopeOpen, BsMailbox } from 'react-icons/bs';
import { _signinSuccess as Container } from '@/src/styles/routes/_signup-sucess';

const ResetPasswordSuccess: NextPage = (): JSX.Element => (
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
              <BsMailbox />
            </div>
            <h2>Please check your mail box!</h2>
            <p>
              We already sent an e-mail with instructions to reset your
              password.
            </p>

            <Link href={`mailto:`} className='a-open-mail'>
              <BsEnvelopeOpen />
              <span>Go to your mail box</span>
            </Link>
            <Link href={`/`} className='a-back'>
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
