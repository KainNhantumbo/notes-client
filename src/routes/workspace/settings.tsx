import {
  DotsHorizontalIcon,
  GearIcon,
  LockClosedIcon,
  LockOpen2Icon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { m as motion } from 'framer-motion';
import actions from '@/data/actions';
import { Layout } from '@/components/Layout';
import { useAppContext } from '@/context/AppContext';
import { _settings as Container } from '@/styles/routes/_settings';
import { app_metadata, colorSchemeOptions } from '@/data/app-data';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Compressor from 'compressorjs';
import { InputEvents, TColorScheme } from '@/types';
import { SelectContainer } from '@/components/Select';
import { useThemeContext } from '@/context/ThemeContext';

export function Settings() {
  const { state, dispatch, fetchAPI } = useAppContext();
  const { changeColorScheme } = useThemeContext();
  const navigate: NavigateFunction = useNavigate();
  const [profileImageFile, setProfileImageFile] = useState<FileList | null>(
    null
  );
  const [profileImageData, setProfileImageData] = useState({
    id: '',
    data: '',
  });
  const [passwords, setPasswords] = useState({
    password: '',
    confirm_password: '',
  });

  const handlePasswordsChange = (e: InputEvents): void => {
    setPasswords((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdatePassword = async (): Promise<void> => {
    if (passwords.confirm_password) {
      if (passwords.password !== passwords.confirm_password) {
        dispatch({
          type: actions.TOAST,
          payload: {
            ...state,
            toast: {
              ...state.toast,
              title: 'Update Password Error',
              message: 'Passwords must match. Please, try again.',
              status: true,
            },
          },
        });
      }
    }

    try {
      await fetchAPI({
        method: 'patch',
        url: `/api/v1/users`,
        data: { assetId: state.user?.profile_image?.id || '' },
      });

      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Password Updated',
            message: 'Your password was updated successfully.',
            status: true,
          },
        },
      });
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Update Password Error',
            message:
              error?.response?.data?.message ??
              'Failed to update your password. Please, try again.',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: handleUpdatePassword,
          },
        },
      });
    }
  };

  const handleDeleteAccount = async (): Promise<void> => {
    try {
      await fetchAPI({ method: 'delete', url: '/api/v1/users' });
      dispatch({
        type: actions.PROMPT,
        payload: {
          ...state,
          prompt: { ...state.prompt, status: false },
        },
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

      navigate('/', { replace: true });
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
      dispatch({
        type: actions.PROMPT,
        payload: {
          ...state,
          prompt: { ...state.prompt, status: false },
        },
      });

      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Delete Account Error',
            message:
              error?.response?.data?.message ??
              'Failed to update your password. Please, try again.',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: handleUpdatePassword,
          },
        },
      });
    }
  };

  const deleteAsset = async (): Promise<void> => {
    if (!state.user?.profile_image?.id) return undefined;
    try {
      await fetchAPI({
        method: 'delete',
        url: `/api/v1/users/assets`,
        data: { assetId: state.user.profile_image.id },
      });
      setProfileImageData({ id: '', data: '' });
      dispatch({
        type: actions.USER,
        payload: {
          ...state,
          user: {
            ...state.user,
            profile_image: { id: '', url: '' },
          },
        },
      });
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Delete Profile Picture Error',
            message:
              error?.response?.data?.message ??
              'Failed to remove your profile pitcure. Please, try again.',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: deleteAsset,
          },
        },
      });
    }
  };

  const handleProfileImageFile = (): void => {
    const imageData: File | null | undefined = profileImageFile?.item(0);
    if (imageData) {
      new Compressor(imageData, {
        quality: 0.8,
        width: 150,
        height: 150,
        resize: 'cover',
        success: (compressedImge: File | Blob): void => {
          const reader = new FileReader();
          reader.readAsDataURL(compressedImge);
          reader.onloadend = function (e: ProgressEvent<FileReader>): void {
            const encodedImage: string = e.target?.result as string;
            setProfileImageData({
              id: state.user.profile_image?.id || '',
              data: encodedImage,
            });
          };
        },
      });
    }
  };

  useEffect((): (() => void) => {
    handleProfileImageFile();
    return () => {
      setProfileImageData({ id: '', data: '' });
      setProfileImageFile(null);
    };
  }, [profileImageFile]);

  return (
    <Layout
      renderHeader
      renderFooter
      metadata={{ title: `${app_metadata.appName} | Settings` }}>
      <Container>
        <div className='wrapper-container'>
          <article>
            <div className='title-bar-container'>
              <h1>
                <GearIcon />
                <span>Settings</span>
              </h1>
            </div>

            <section className='group-container'>
              <h2>UI Themes</h2>
              <div className='content-container'>
                <h3>
                  <span>
                    Choose the global UI Theme and the editor color schemes
                  </span>
                </h3>
                <div className='data-container'>
                  <SelectContainer
                    options={colorSchemeOptions}
                    placeholder={'Select the global color scheme...'}
                    onChange={(option) => {
                      const parsedValue: TColorScheme = JSON.parse(
                        (option as any)?.value
                      );
                      changeColorScheme({ ...parsedValue });
                      console.log(parsedValue);
                    }}
                  />
                </div>
              </div>
            </section>

            {/* <section className='group-container'>
              <h2></h2>
              <div className='content-container'>
                <h3>
                  <span></span>
                </h3>
                <div className='data-container'></div>
              </div>
            </section> */}

            <section className='group-container'>
              <h2>Profile Settings</h2>
              <div className='content-container'>
                <h3>
                  <span>Adjust your account settings</span>
                </h3>
                <div className='data-container account-settings'>
                  <div className='image-container'>
                    {profileImageData?.data ? (
                      <img
                        decoding='async'
                        loading='lazy'
                        src={profileImageData.data}
                        alt='profile image'
                      />
                    ) : state.user.profile_image?.url ? (
                      <img
                        decoding='async'
                        loading='lazy'
                        src={state.user.profile_image?.url}
                        alt='profile image'
                      />
                    ) : (
                      <PersonIcon className='camera-icon' />
                    )}
                    <input
                      type='file'
                      id='avatar'
                      name='avatar'
                      accept='.jpg, .jpeg, .png'
                      multiple={false}
                      onChange={(e) => setProfileImageFile(e.target.files)}
                    />

                    <div className='actions-container'>
                      <motion.label
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        htmlFor='avatar'
                        title='Change profile picture'>
                        <span>Upload</span>
                      </motion.label>
                      <motion.button
                        title='Clear profile picture'
                        className='clear-image'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={deleteAsset}>
                        <span>Clear</span>
                      </motion.button>
                    </div>
                  </div>

                  <section className='form-section'>
                    <div className='form-element'>
                      <label htmlFor='first_name'>
                        <DotsHorizontalIcon />
                        <span>First name</span>
                      </label>
                      <input
                        type='text'
                        id='first_name'
                        name='first_name'
                        autoComplete='off'
                        placeholder='Your first name'
                        aria-label='Your first name'
                        required={true}
                        maxLength={32}
                        onChange={(e): void =>
                          dispatch({
                            type: actions.USER,
                            payload: {
                              ...state,
                              user: {
                                ...state.user,
                                first_name: e.target.value,
                              },
                            },
                          })
                        }
                        value={state.user.first_name}
                      />
                      <span className='counter'>{`${
                        state.user.first_name?.length || 0
                      } / 32`}</span>
                    </div>
                    <div className='form-element'>
                      <label htmlFor='last_name'>
                        <DotsHorizontalIcon />
                        <span>Last name</span>
                      </label>
                      <input
                        type='text'
                        id='last_name'
                        name='last_name'
                        autoComplete='off'
                        placeholder='Your last name'
                        aria-label='Your last name'
                        value={state.user.last_name}
                        required={true}
                        maxLength={32}
                        onChange={(e): void =>
                          dispatch({
                            type: actions.USER,
                            payload: {
                              ...state,
                              user: {
                                ...state.user,
                                first_name: e.target.value,
                              },
                            },
                          })
                        }
                      />
                      <span className='counter'>{`${
                        state.user.last_name?.length || 0
                      } / 32`}</span>
                    </div>
                  </section>
                </div>
              </div>
            </section>

            <section className='group-container'>
              <h2>Your Passwords</h2>
              <div className='content-container'>
                <h3>
                  <span>
                    We encorage to use strong passwords that you can easily
                    remember
                  </span>
                </h3>
                <div className='data-container password-settings'>
                  <section className='form-section'>
                    <div className='form-element'>
                      <label htmlFor='password'>
                        <LockOpen2Icon />
                        <span>New Password</span>
                      </label>
                      <input
                        type='password'
                        id='password'
                        name='password'
                        minLength={8}
                        aria-hidden='true'
                        autoComplete='off'
                        placeholder='Your new password'
                        aria-label='Your new password'
                        onChange={(e): void => handlePasswordsChange(e)}
                      />
                    </div>
                    <div className='form-element'>
                      <label htmlFor='confirm_password'>
                        <LockClosedIcon />
                        <span>Confirm Password</span>
                      </label>
                      <input
                        type='password'
                        id='confirm_password'
                        name='confirm_password'
                        aria-hidden='true'
                        autoComplete='off'
                        minLength={8}
                        placeholder='Confirm your new password'
                        aria-label='Confirm your new password'
                        onChange={(e): void => handlePasswordsChange(e)}
                      />
                    </div>
                  </section>
                  <div className='save-container'>
                    <p>
                      Tip: just leave this section blanc if you don't want to
                      update your password.
                    </p>

                    <motion.button
                      className='save'
                      title='Save updated password'
                      aria-label='Save updated password'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(): Promise<void> => handleUpdatePassword()}>
                      <span>Update password and save</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </section>

            <section className='group-container'>
              <h2>Delete Account</h2>
              <div className='content-container'>
                <h3>
                  <span>
                    This will erase all your data from the server and delete
                    your account, be careful, it can't be undone.
                  </span>
                </h3>
                <div className='data-container delete-account-settings'>
                  <motion.button
                    className='save'
                    title='Delete account'
                    aria-label='Delete account'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      dispatch({
                        type: actions.PROMPT,
                        payload: {
                          ...state,
                          prompt: {
                            ...state.prompt,
                            title: 'Delete Account',
                            message:
                              'Erase all data and delete your account. This cannot be undone.',
                            actionButtonMessage: 'Confirm',
                            status: true,
                            handleFunction: handleDeleteAccount,
                          },
                        },
                      });
                    }}>
                    <span>Delete account</span>
                  </motion.button>
                </div>
              </div>
            </section>
          </article>
        </div>
      </Container>
    </Layout>
  );
}
