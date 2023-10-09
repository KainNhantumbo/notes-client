import {
  BaseButton,
  StyledCornerButton,
  StyledInputs,
  StyledLabels
} from '@/styles/defaults';
import { isWebUri } from 'valid-url';
import { Tooltip } from 'react-tooltip';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import { RiCloseLine, RiImage2Line } from 'react-icons/ri';
import { AnimatePresence, m as motion } from 'framer-motion';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

type ImageAttributes = { src: string; alt: string; title: string };

export default function Image() {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const [errorMessages, setErrorMessages] = useState<string>('');
  const [isEditorVisible, setIsEditorVisible] = useState<boolean>(false);
  const [imageData, setImageData] = useState<ImageAttributes>({
    src: '',
    alt: '',
    title: ''
  });

  const handleImageData = () => {
    if (!imageData.src) return setErrorMessages('Please insert image url');

    if (!isWebUri(imageData.src))
      return setErrorMessages('Please provide a valid image source url');

    editor.chain().focus().setImage(imageData).run();
    setImageData({ title: '', src: '', alt: '' });
    setIsEditorVisible(false);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setErrorMessages('');
    }, 3000);
    return () => clearTimeout(debounceTimer);
  }, [errorMessages]);

  return (
    <>
      <button
        data-tooltip-id='image'
        data-tooltip-content='Insert Image'
        type='button'
        onClick={() => setIsEditorVisible(true)}
        className={editor.isActive('image') ? 'is-active' : ''}>
        <RiImage2Line />
        <Tooltip
          classNameArrow='tooltip-border-class'
          className='tooltip-class'
          id='image'
        />
      </button>

      <AnimatePresence>
        {isEditorVisible ? (
          <Container
            className='main'
            onClick={(e: any): void => {
              const isTarget = e.target.classList.contains('main');
              if (isTarget) {
                setImageData({ title: '', src: '', alt: '' });
                setIsEditorVisible(false);
              }
            }}>
            <motion.section
              className='image-panel-container'
              exit={{ opacity: 0, scale: 0 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.3 }
              }}>
              <h2>
                <RiImage2Line />
                <span>Image</span>
              </h2>

              <motion.button
                className='close-button'
                onClick={() => {
                  setImageData({ title: '', src: '', alt: '' });
                  setIsEditorVisible(false);
                }}>
                <RiCloseLine />
              </motion.button>

              <form
                className='image-form-container'
                onSubmit={(e) => e.preventDefault()}>
                <section className='input-field'>
                  <label htmlFor='image-title'>
                    <DotsHorizontalIcon />
                    <span>Title</span>
                  </label>
                  <input
                    type='text'
                    id={'image-title'}
                    name={'image-title'}
                    value={imageData.title}
                    placeholder={'Type an image title'}
                    maxLength={32}
                    onChange={(e) =>
                      setImageData((data) => ({
                        ...data,
                        title: e.target.value
                      }))
                    }
                  />
                  <span className='counter'>{`${imageData.title.length} / 32`}</span>
                </section>
                <section className='input-field'>
                  <label htmlFor='image-alt'>
                    <DotsHorizontalIcon />
                    <span>Alt</span>
                  </label>
                  <input
                    type='text'
                    id={'image-alt'}
                    name={'image-alt'}
                    value={imageData.alt}
                    placeholder={'Type the alternative text to show'}
                    maxLength={32}
                    onChange={(e) =>
                      setImageData((data) => ({ ...data, alt: e.target.value }))
                    }
                  />
                  <span className='counter'>{`${imageData.alt.length} / 32`}</span>
                </section>
                <section className='input-field'>
                  <label htmlFor='image-src'>
                    <DotsHorizontalIcon />
                    <span>Image url *</span>
                  </label>
                  <input
                    type='text'
                    id={'image-src'}
                    name={'image-src'}
                    value={imageData.src}
                    placeholder={'Type the image source url'}
                    onChange={(e) =>
                      setImageData((data) => ({ ...data, src: e.target.value }))
                    }
                  />
                </section>
              </form>

              <p className='error-message'>{errorMessages}</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.8 }}
                className='save-button'
                onClick={handleImageData}>
                <span>Save and insert image</span>
              </motion.button>
            </motion.section>
          </Container>
        ) : null}
      </AnimatePresence>
    </>
  );
}

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(${({ theme }) => theme.background}, 0.2);
  backdrop-filter: blur(2px);
  z-index: 11000;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
  user-select: none;
  line-height: 1.4rem;

  .image-panel-container {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 12px;
    background: rgb(${({ theme }) => theme.foreground});
    width: 100%;
    max-width: 500px;
    border: 1px solid rgba(${({ theme }) => theme.font}, 0.15);
    box-shadow: 0 0 25px rgba(${({ theme }) => theme.black}, 0.1);
    position: relative;

    h2 {
      font-weight: 500;
      line-height: 1.6rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;
      color: rgb(${({ theme }) => theme.primary_shade});
    }

    .image-form-container {
      display: flex;
      flex-direction: column;

      width: 100%;
      font-size: 0.9rem;

      .input-field {
        display: flex;
        flex-direction: column;
        gap: 10px;
        label {
          ${StyledLabels};
        }
        ${StyledInputs}
      }

      .counter {
        align-self: end;
        font-size: 0.8rem;
      }
    }

    .close-button {
      ${StyledCornerButton}
      position: absolute;
      top: 16px;
      right: 12px;
      border: none;
      :hover {
        color: rgb(${({ theme }) => theme.error});
        background: rgb(${({ theme }) => theme.primary}, 0.2);
      }
    }

    .error-message {
      color: rgb(${({ theme }) => theme.error});
      font-weight: 500;
      font-size: 0.8rem;
      line-height: 1.4rem;
      text-align: center;
    }

    .save-button {
      ${BaseButton}
      justify-self: center;
      align-self: center;
      text-align: center;
    }
  }
`;
