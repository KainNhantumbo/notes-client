import { FC, useEffect, useState } from 'react';
import actions from '../../data/actions';
import Layout from '@/components/Layout';
import { useAppContext } from '../../context/AppContext';
import { _settings as Container } from '@/styles/routes/_settings';
import { app_metadata } from '@/data/app-data';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Compressor from 'compressorjs'
import { InputEvents } from '@/@types';
import { PersonIcon, PlusIcon, TrashIcon } from '@radix-ui/react-icons';

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

  const deleteAsset = (id: string): void => {};

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
                <div className='data-container'>
                  <div className='image-container profile-image'>
                    {profileImageData?.data ? (
                      <img
                        width={150}
                        height={150}
                        src={profileImageData.data}
                        alt='profile image'
                      />
                    ) : state.user.profile_image?.url ? (
                      <img
                        width={150}
                        height={150}
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
                      onClick={() => deleteAsset(state.user.profile_image?.id)}>
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
