import { FC } from 'react';
import actions from '@/src/data/actions';
import { BsArrowLeft, BsX } from 'react-icons/bs';
import { NextRouter, useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { _logout as Container } from '../../styles/modules/_logout';

const Logout: FC = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const { state, dispatch, fetchAPI } = useAppContext();

  const handleLogout = async (): Promise<void> => {
    try {
      await fetchAPI({
        method: 'post',
        url: '/api/v1/auth/logout',
        withCredentials: true,
      });
      dispatch({
        type: actions.AUTH,
        payload: {
          ...state,
          auth: {
            id: '',
            name: '',
            token: '',
            email: '',
            profile_image: '',
          },
        },
      });
      router.push('/auth/sign-in');
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
    }
  };

  return (
    <AnimatePresence>
      {state.isLogoutModal && (
        <Container
          className='main'
          onClick={(e: any): void => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              dispatch({
                type: actions.LOGOUT_MODAL,
                payload: { ...state, isLogoutModal: false },
              });
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.3 },
            }}
            exit={{ opacity: 0, scale: 0 }}>
            <div className='dialog-prompt'>
              <div className='prompt-info'>
                <span className='prompt-title'>Logout</span>
                <p className='prompt-message'>
                  Do you really want to exit this session and logout?
                </p>
              </div>
              <div className='prompt-actions'>
                <button
                  className='prompt-cancel'
                  onClick={() =>
                    dispatch({
                      type: actions.LOGOUT_MODAL,
                      payload: { ...state, isLogoutModal: false },
                    })
                  }>
                  <BsArrowLeft />
                  <span>Cancel</span>
                </button>
                <button className='prompt-accept' onClick={handleLogout}>
                  <BsX />
                  <span>Confirm</span>
                </button>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default Logout;
