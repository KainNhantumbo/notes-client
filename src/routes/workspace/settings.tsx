import { FC, useEffect, useState } from 'react';
import actions from '../../data/actions';
import Layout from '@/components/Layout';
import { useAppContext } from '../../context/AppContext';
import { _settings as Container } from '@/styles/routes/_settings';
import { app_metadata } from '@/data/app-data';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Compressor from 'compressorjs';
import { InputEvents } from '@/@types';
import {
  DotsHorizontalIcon,
  PersonIcon,
  PlusIcon,
  TrashIcon,
} from '@radix-ui/react-icons';

const Settings: FC = (): JSX.Element => {
  const { state, dispatch, fetchAPI } = useAppContext();
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

  const deleteAsset = async (): Promise<void> => {
    dispatch({
      type: actions.TOAST,
      payload: {
        ...state,
        toast: { ...state.toast, status: false },
      },
    });

    try {
      await fetchAPI({
        method: 'delete',
        url: `/api/v1/users/assets`,
        data: { assetId: state.user?.profile_image?.id || '' },
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
              'Failed to remove your profile pitcure. Please try again.',
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

  const handleUpdatePassword = async (): Promise<void> => {
    if (passwords.confirm_password !== '') {
      if (passwords.password !== passwords.confirm_password) {
      }
    }

    try {
      const { profile_image } = state.user;
    } catch (error: any) {
      console.error(error);
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
      metadata={{ title: `${app_metadata.appName} | Settings` }}>
      <Container>
        <div className='wrapper-container'>
          <article>
            <section className='group-container'>
              <h1>
                <span>Profile Settings</span>
              </h1>
              <div className='header-container'>
                <h3>
                  <span>Adjust your account settings</span>
                </h3>
                <div className='data-container account-settings'>
                  <div className='image-container profile-image'>
                    {profileImageData?.data ? (
                      <img
                        width={150}
                        height={150}
                        decoding='async'
                        loading='lazy'
                        src={profileImageData.data}
                        alt='profile image'
                      />
                    ) : state.user.profile_image?.url ? (
                      <img
                        width={150}
                        height={150}
                        decoding='async'
                        loading='lazy'
                        src={state.user.profile_image?.url}
                        alt='profile image'
                      />
                    ) : (
                      <PersonIcon className='camera-icon' />
                    )}
                    <label htmlFor='avatar' title='Change profile picture'>
                      <span>Profile picture</span>
                      <PlusIcon />
                    </label>
                    <button
                      title='Clear profile picture'
                      className='clear-image'
                      onClick={deleteAsset}>
                      <TrashIcon />
                    </button>
                    <input
                      type='file'
                      id='avatar'
                      name='avatar'
                      accept='.jpg, .jpeg, .png'
                      multiple={false}
                      onChange={(e) => setProfileImageFile(e.target.files)}
                    />
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
                        onChange={(e): void =>
                          e.target.value.length > 32
                            ? undefined
                            : dispatch({
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
                        onChange={(e): void =>
                          e.target.value.length > 32
                            ? undefined
                            : dispatch({
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
