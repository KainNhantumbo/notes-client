import {
  ClockIcon,
  DotsHorizontalIcon,
  DownloadIcon,
  FontBoldIcon,
  FontFamilyIcon,
  FontSizeIcon,
  FontStyleIcon,
  GearIcon,
  LockClosedIcon,
  LockOpen2Icon,
  RulerSquareIcon
} from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { m as motion } from 'framer-motion';
import actions from '@/shared/actions';
import { Layout } from '@/components/Layout';
import { useAppContext } from '@/context/AppContext';
import { _settings as Container } from '@/styles/routes/_settings';
import {
  app_metadata,
  colorSchemeOptions,
  editorThemeOptions
} from '@/shared/data';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { InputEvents, TColorScheme, TSettings, TUser } from '@/types';
import { SelectContainer } from '@/components/Select';
import { useThemeContext } from '@/context/ThemeContext';

export default function Settings() {
  const { state, dispatch, useFetchAPI } = useAppContext();
  const { changeColorScheme } = useThemeContext();
  const navigate: NavigateFunction = useNavigate();

  const [passwords, setPasswords] = useState({
    password: '',
    confirm_password: ''
  });

  const handlePasswordsChange = (e: InputEvents): void => {
    setPasswords((state) => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const syncSettings = async (data: TSettings): Promise<void> => {
    try {
      await useFetchAPI({
        method: 'patch',
        url: '/api/v1/settings',
        data: { ...data }
      });
      dispatch({
        type: actions.SETTINGS,
        payload: { ...state, settings: data }
      });
    } catch (error: any) {
      console.error(error?.response?.data?.message || error);
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Settings Sync Error',
            message:
              error?.response?.data?.message || 'Failed to sync your settings.',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: syncSettings
          }
        }
      });
    }
  };

  const getInitialData = async (): Promise<void> => {
    try {
      const [settings, user] = await Promise.all([
        useFetchAPI<TSettings>({ method: 'get', url: '/api/v1/settings' }),
        useFetchAPI<TUser>({ method: 'get', url: '/api/v1/users' })
      ]);

      dispatch({
        type: actions.USER,
        payload: { ...state, user: { ...state.user, ...user.data } }
      });

      dispatch({
        type: actions.SETTINGS,
        payload: {
          ...state,
          settings: { ...state.settings, ...settings.data }
        }
      });
    } catch (error: any) {
      console.error(error?.response?.data?.message || error);
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Initial Data Sync Error',
            message:
              error?.response?.data?.message ||
              'Failed to fetch your settings and user account data.',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: getInitialData
          }
        }
      });
    }
  };

  const syncUserData = async (): Promise<void> => {
    try {
      const response = await useFetchAPI<TUser>({
        method: 'patch',
        url: '/api/v1/users',
        data: { ...state.user }
      });
      dispatch({
        type: actions.USER,
        payload: { ...state, user: { ...state.user, ...response.data } }
      });
      dispatch({
        type: actions.PROMPT,
        payload: {
          ...state,
          prompt: { ...state.prompt, status: false }
        }
      });
    } catch (error: any) {
      console.error(error?.response?.data?.message || error);
      dispatch({
        type: actions.PROMPT,
        payload: {
          ...state,
          prompt: { ...state.prompt, status: false }
        }
      });
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Account Data Sync Error',
            message:
              error?.response?.data?.message ||
              'Failed to sync your account data.',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: syncUserData
          }
        }
      });
    }
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
              status: true
            }
          }
        });
      }
    }

    try {
      await useFetchAPI({
        method: 'patch',
        url: `/api/v1/users`,
        data: { password: passwords.password }
      });

      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Password Updated',
            message: 'Your password was updated successfully.',
            status: true
          }
        }
      });
    } catch (error: any) {
      console.error(error?.response?.data?.message || error);
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Update Password Error',
            message:
              error?.response?.data?.message ||
              'Failed to update your password. Please, try again.',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: handleUpdatePassword
          }
        }
      });
    }
  };

  const handleDeleteAccount = async (): Promise<void> => {
    try {
      await useFetchAPI({ method: 'delete', url: '/api/v1/users' });
      dispatch({
        type: actions.PROMPT,
        payload: {
          ...state,
          prompt: { ...state.prompt, status: false }
        }
      });

      dispatch({
        type: actions.AUTH,
        payload: {
          ...state,
          auth: { id: '', name: '', token: '', email: '' }
        }
      });

      navigate('/', { replace: true });
    } catch (error: any) {
      console.error(error?.response?.data?.message || error);
      dispatch({
        type: actions.PROMPT,
        payload: {
          ...state,
          prompt: { ...state.prompt, status: false }
        }
      });

      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Delete Account Error',
            message:
              error?.response?.data?.message ||
              'Failed to update your password. Please, try again.',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: handleUpdatePassword
          }
        }
      });
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

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
              <h2>Themes</h2>
              <div className='content-container'>
                <h3>
                  <span>
                    Choose the global UI theme and the editor color schemes
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
                      syncSettings({
                        ...state.settings,
                        theme: {
                          ...state.settings.theme,
                          ui_theme: parsedValue.scheme,
                          automatic_ui_theme:
                            parsedValue.mode === 'auto' ? true : false
                        }
                      });
                    }}
                  />
                </div>
              </div>
              <div className='content-container'>
                <h3>
                  <span>Editor color schemes</span>
                </h3>
                <div className='data-container'>
                  <SelectContainer
                    options={editorThemeOptions.map((item) => ({
                      label: item,
                      value: item
                    }))}
                    placeholder={'Select the global color scheme...'}
                    onChange={(option) => {
                      syncSettings({
                        ...state.settings,
                        theme: {
                          ...state.settings.theme,
                          editor_theme: (option as any)?.value
                        }
                      });
                    }}
                  />
                </div>
              </div>
            </section>

            <section className='group-container'>
              <h2>Editor</h2>
              <div className='content-container'>
                <h3>
                  <span>Customise your note editor settings</span>
                </h3>
                <div className='data-container'>
                  <section className='form-section'>
                    <hr />
                    <h3 className='sub-title'>
                      <DotsHorizontalIcon />
                      <span>Editor Data Auto Save</span>
                    </h3>

                    <div className='form-element '>
                      <label htmlFor='auto-save-state'>
                        <DownloadIcon />
                        <span>Auto Save Changes</span>
                      </label>
                      <p>
                        This controls if your changes made at the editor will be
                        automatically saved.
                      </p>

                      <SelectContainer
                        id='auto-save-state'
                        placeholder={
                          state.settings.editor.auto_save.enabled
                            ? 'Enabled'
                            : 'Disabled'
                        }
                        options={[
                          { label: 'Enabled', value: `{"enabled": true}` },
                          { label: 'Disabled', value: `{"enabled": false}` }
                        ]}
                        onChange={(option) => {
                          const parsedValue: { enabled: boolean } = JSON.parse(
                            (option as any)?.value
                          );

                          syncSettings({
                            ...state.settings,
                            editor: {
                              ...state.settings.editor,
                              auto_save: {
                                ...state.settings.editor.auto_save,
                                enabled: parsedValue.enabled
                              }
                            }
                          });
                        }}
                      />
                    </div>
                    <div className='form-element'>
                      <label htmlFor='auto-save-delay'>
                        <ClockIcon />
                        <span>Delay Time</span>
                      </label>
                      <p>
                        This controls the time before automatic save in
                        milliseconds.
                      </p>

                      <input
                        type='number'
                        id='auto-save-delay'
                        min={300}
                        max={20000}
                        step={100}
                        value={state.settings.editor.auto_save.delay}
                        onChange={(e) => {
                          syncSettings({
                            ...state.settings,
                            editor: {
                              ...state.settings.editor,
                              auto_save: {
                                ...state.settings.editor.auto_save,
                                delay: Number(e.target.value)
                              }
                            }
                          });
                        }}
                      />
                    </div>

                    <hr />

                    <h3 className='sub-title'>
                      <DotsHorizontalIcon />
                      <span>Editor Fonts Customization</span>
                    </h3>

                    <div className='form-element'>
                      <label htmlFor='font-family'>
                        <FontFamilyIcon />
                        <span>Modify editor font family</span>
                      </label>
                      <input
                        type='text'
                        id='font-family'
                        minLength={3}
                        maxLength={128}
                        value={state.settings.editor.font.font_family}
                        onChange={(e) => {
                          syncSettings({
                            ...state.settings,
                            editor: {
                              ...state.settings.editor,
                              font: {
                                ...state.settings.editor.font,
                                font_family: e.target.value
                              }
                            }
                          });
                        }}
                      />
                    </div>
                    <div className='form-element'>
                      <label htmlFor='font-size'>
                        <FontSizeIcon />
                        <span>Modify editor font size</span>
                      </label>
                      <input
                        type='number'
                        id='font-size'
                        min={10}
                        max={50}
                        value={state.settings.editor.font.font_size}
                        onChange={(e) => {
                          syncSettings({
                            ...state.settings,
                            editor: {
                              ...state.settings.editor,
                              font: {
                                ...state.settings.editor.font,
                                font_size: Number(e.target.value) || 16
                              }
                            }
                          });
                        }}
                      />
                    </div>
                    <div className='form-element'>
                      <label htmlFor='font-weight'>
                        <FontBoldIcon />
                        <span>Modify editor font weight</span>
                      </label>
                      <input
                        type='number'
                        id='font-weight'
                        min={400}
                        max={800}
                        step={100}
                        value={state.settings.editor.font.font_weight}
                        onChange={(e) => {
                          syncSettings({
                            ...state.settings,
                            editor: {
                              ...state.settings.editor,
                              font: {
                                ...state.settings.editor.font,
                                font_weight: e.target.value as any
                              }
                            }
                          });
                        }}
                      />
                    </div>
                    <div className='form-element'>
                      <label htmlFor='line-height'>
                        <FontStyleIcon />
                        <span>Modify editor line height</span>
                      </label>
                      <input
                        type='number'
                        id='line-height'
                        min={1}
                        max={5}
                        step={0.1}
                        value={state.settings.editor.font.line_height}
                        onChange={(e) => {
                          syncSettings({
                            ...state.settings,
                            editor: {
                              ...state.settings.editor,
                              font: {
                                ...state.settings.editor.font,
                                line_height: parseFloat(
                                  Number(e.target.value).toFixed(1)
                                )
                              }
                            }
                          });
                        }}
                      />
                    </div>

                    <hr />

                    <h3 className='sub-title'>
                      <DotsHorizontalIcon />
                      <span>Editor Experience Customization</span>
                    </h3>

                    <div className='form-element'>
                      <label htmlFor='line-numbers'>
                        <RulerSquareIcon />
                        <span>Line Numbers</span>
                      </label>
                      <p>This controls the display of line numbers.</p>

                      <SelectContainer
                        id='line-numbers'
                        placeholder={
                          state.settings.editor.editing.line_numbers
                            ? 'Enabled'
                            : 'Disabled'
                        }
                        options={[
                          { label: 'Enabled', value: `{"enabled": true}` },
                          { label: 'Disabled', value: `{"enabled": false}` }
                        ]}
                        onChange={(option) => {
                          const parsedValue: { enabled: boolean } = JSON.parse(
                            (option as any)?.value
                          );

                          syncSettings({
                            ...state.settings,
                            editor: {
                              ...state.settings.editor,
                              editing: {
                                ...state.settings.editor.editing,
                                line_numbers: parsedValue.enabled
                              }
                            }
                          });
                        }}
                      />
                    </div>
                    <div className='form-element'>
                      <label htmlFor='relative-line-numbers'>
                        <RulerSquareIcon />
                        <span>Relative Line Numbers</span>
                      </label>
                      <p>This controls the display of relative line numbers.</p>

                      <SelectContainer
                        id='relative-line-numbers'
                        isDisabled={
                          state.settings.editor.editing.line_numbers
                            ? false
                            : true
                        }
                        placeholder={
                          state.settings.editor.editing
                            .enable_relative_line_numbers
                            ? 'Enabled'
                            : 'Disabled'
                        }
                        options={[
                          { label: 'Enabled', value: `{"enabled": true}` },
                          { label: 'Disabled', value: `{"enabled": false}` }
                        ]}
                        onChange={(option) => {
                          const parsedValue: { enabled: boolean } = JSON.parse(
                            (option as any)?.value
                          );

                          syncSettings({
                            ...state.settings,
                            editor: {
                              ...state.settings.editor,
                              editing: {
                                ...state.settings.editor.editing,
                                enable_relative_line_numbers:
                                  parsedValue.enabled
                              }
                            }
                          });
                        }}
                      />
                    </div>
                    <div className='form-element'>
                      <label htmlFor='editor-toolbar'>
                        <RulerSquareIcon />
                        <span>Editor Toolbar</span>
                      </label>
                      <p>This controls the display of markup editor tools.</p>

                      <SelectContainer
                        id='editor-toolbar'
                        placeholder={
                          state.settings.editor.editing.enable_toolbar
                            ? 'Enabled'
                            : 'Disabled'
                        }
                        options={[
                          { label: 'Enabled', value: `{"enabled": true}` },
                          { label: 'Disabled', value: `{"enabled": false}` }
                        ]}
                        onChange={(option) => {
                          const parsedValue: { enabled: boolean } = JSON.parse(
                            (option as any)?.value
                          );

                          syncSettings({
                            ...state.settings,
                            editor: {
                              ...state.settings.editor,
                              editing: {
                                ...state.settings.editor.editing,
                                enable_toolbar: parsedValue.enabled
                              }
                            }
                          });
                        }}
                      />
                    </div>
                    <div className='form-element'>
                      <label htmlFor='highlight-active-line'>
                        <RulerSquareIcon />
                        <span>Highlight Active Line</span>
                      </label>
                      <p>This controls the highlight of active line.</p>

                      <SelectContainer
                        id='highlight-active-line'
                        placeholder={
                          state.settings.editor.editing.highlight_active_line
                            ? 'Enabled'
                            : 'Disabled'
                        }
                        options={[
                          { label: 'Enabled', value: `{"enabled": true}` },
                          { label: 'Disabled', value: `{"enabled": false}` }
                        ]}
                        onChange={(option) => {
                          const parsedValue: { enabled: boolean } = JSON.parse(
                            (option as any)?.value
                          );

                          syncSettings({
                            ...state.settings,
                            editor: {
                              ...state.settings.editor,
                              editing: {
                                ...state.settings.editor.editing,
                                highlight_active_line: parsedValue.enabled
                              }
                            }
                          });
                        }}
                      />
                    </div>
                    <div className='form-element'>
                      <label htmlFor='font-size'>
                        <FontSizeIcon />
                        <span>Editor Tab Size</span>
                      </label>
                      <input
                        type='number'
                        id='font-size'
                        min={1}
                        max={12}
                        step={1}
                        value={state.settings.editor.editing.tab_size}
                        onChange={(e) => {
                          syncSettings({
                            ...state.settings,
                            editor: {
                              ...state.settings.editor,
                              editing: {
                                ...state.settings.editor.editing,
                                tab_size: Number(e.target.value) || 2
                              }
                            }
                          });
                        }}
                      />
                    </div>
                  </section>
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
                                first_name: e.target.value
                              }
                            }
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
                                last_name: e.target.value
                              }
                            }
                          })
                        }
                      />
                      <span className='counter'>{`${
                        state.user.last_name?.length || 0
                      } / 32`}</span>
                    </div>
                  </section>
                  <motion.button
                    title='Update account data'
                    aria-label='Update account data'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      dispatch({
                        type: actions.PROMPT,
                        payload: {
                          ...state,
                          prompt: {
                            ...state.prompt,
                            title: 'Updatde Account',
                            message: 'Do you wish to update your account data?',
                            actionButtonMessage: 'Confirm',
                            status: true,
                            handleFunction: syncUserData
                          }
                        }
                      });
                    }}>
                    <span>Update account data</span>
                  </motion.button>
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
                            handleFunction: handleDeleteAccount
                          }
                        }
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
