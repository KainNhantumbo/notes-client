import { Layout } from '@/components/Layout';
import { app_metadata } from '@/shared/data';
import { _docs as Container } from '@/styles/routes/_docs';

export default function PrivacyPolicy() {
  return (
    <Layout
      renderFooter
      renderHeader
      metadata={{ title: `${app_metadata.appName} | Privacy Policy` }}>
      <Container></Container>
    </Layout>
  );
}
