import Link from 'next/link';
import { IoCheckmark } from 'react-icons/io5';
import { app_metadata } from '../../data/app-data';
import { useState, useEffect, FC } from 'react';
import { AnimatePresence, m as motion } from 'framer-motion';
import { _cookies as Container } from '../../styles/modules/_cookies';

const Cookies: FC = (): JSX.Element => {
  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);

  // controls the life cicle of the component
  const advisorController = () => {
    setIsPopupActive(() => false);
    localStorage.setItem('cookies_warning', JSON.stringify('false'));
  };

  useEffect((): void => {
    const advisorState = JSON.parse(
      localStorage.getItem('cookies_warning') || 'false'
    );
    if (!advisorState) {
      localStorage.setItem('cookies_warning', JSON.stringify('true'));
      setIsPopupActive(() => true);
    }
    if (advisorState === 'true') {
      setIsPopupActive(() => true);
    } else {
      setIsPopupActive(() => false);
    }
  }, []);

  return (
    <AnimatePresence>
      {isPopupActive && (
        <Container>
          <motion.section
            initial={{ opacity: 0, y: 500 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 1.2 },
            }}
            exit={{
              opacity: 0,
              y: 500,
              transition: { duration: 1.2 },
            }}
            className='advisor'>
            <div>
              <p>
                We use cookies to grant you a better experience in our site. By
                using {app_metadata.appName}, you accept our {'  '}
                <Link href='/legal/privacy-policy'>
                  <strong>privacy policy</strong>
                </Link>
                .
              </p>
              <button onClick={advisorController}>
                <IoCheckmark />
                <span>Accept and close.</span>
              </button>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default Cookies;
