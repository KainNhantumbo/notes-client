import { FC } from 'react';
import actions from '../../data/actions';
import Layout from '@/components/Layout';
import { useAppContext } from '../../context/AppContext';
import { _settings as Container } from '@/styles/routes/_settings';
import { app_metadata } from '@/data/app-data';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const Settings: FC = (): JSX.Element => {
  const { state, dispatch, fetchAPI } = useAppContext();
  const navigate: NavigateFunction = useNavigate();

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
