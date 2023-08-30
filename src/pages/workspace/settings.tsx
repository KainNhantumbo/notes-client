import { NextPage } from 'next';
import actions from '../../data/actions';
import Layout from '@/src/components/Layout';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '../../context/AppContext';
import { _settings as Container } from '@/src/styles/routes/_settings';
import { app_metadata } from '@/src/data/app-data';

const Settings: NextPage = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const { state, dispatch, fetchAPI } = useAppContext();

  return (
    <Layout metadata={{ title: `${app_metadata.appName} | Settings` }}>
      <Container>
        <div className='wrapper-container'>
          <article className='main-container'>
            <section className='group-container'>
              <h1>
                <span></span>
              </h1>
              <div className='header-container'>
                <h3>
                  <span></span>
                </h3>
                <div className='data-container'></div>
              </div>
            </section>
          </article>
        </div>
      </Container>
    </Layout>
  );
};

export default Settings;
