import { CSSProperties } from 'react';
import { BarLoader } from 'react-spinners';

const styles: CSSProperties = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  fontWeight: '500',
  fontSize: '1.2rem',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
  padding: 'calc(25% - 1px) 12px',
};

export default function Loader() {
  return (
    <section style={{ ...styles }}>
      <h3>Loading... Please wait.</h3>
      <BarLoader />
    </section>
  );
}
