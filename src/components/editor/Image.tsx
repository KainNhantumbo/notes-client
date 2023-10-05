import {
  BaseButton,
  StyledCornerButton,
  StyledInputs
} from '@/styles/defaults';
import { useState } from 'react';
import styled from 'styled-components';
import { useCurrentEditor } from '@tiptap/react';
import { RiCloseLine, RiImage2Line } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
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

    // TODO:  validate url string here
    editor.chain().focus().setImage(imageData).run();
    setImageData({ title: '', src: '', alt: '' });
  };

  return (
    <ImageContainer>
      <button
        title='Insert an image'
        aria-placeholder='Insert an image'
        type='button'
        onClick={() => setIsEditorVisible(true)}
        className={editor.isActive('image') ? 'is-active' : ''}>
        <RiImage2Line />
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
                <span>Image panel</span>
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
                    placeholder={'Image title...'}
                    maxLength={32}
                    onChange={(e) =>
                      setImageData((data) => ({
                        ...data,
                        title: String(e.target.value)
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
                    placeholder={'Type the alternative text to show...'}
                    maxLength={32}
                    onChange={(e) =>
                      setImageData((data) => ({
                        ...data,
                        alt: String(e.target.value)
                      }))
                    }
                  />
                  <span className='counter'>{`${imageData.alt.length} / 32`}</span>
                </section>
                <section className='input-field'>
                  <label htmlFor='image-src'>
                    <DotsHorizontalIcon />
                    <span>Image url</span>
                  </label>
                  <input
                    type='text'
                    id={'image-src'}
                    name={'image-src'}
                    value={imageData.src}
                    placeholder={'Type the alternative text to show...'}
                    onChange={(e) =>
                      setImageData((data) => ({
                        ...data,
                        alt: String(e.target.value)
                      }))
                    }
                  />
                </section>
              </form>

              <p className='error-messages'>{errorMessages}</p>

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
    </ImageContainer>
  );
}

const ImageContainer = styled.section`
  position: relative;
`;

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

  .data-container {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 12px;
    background: rgb(${({ theme }) => theme.foreground});
    width: 100%;
    max-width: 500px;
    margin: 25px;
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
      ${StyledInputs}
      input {
        width: 100%;
      }

      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      font-size: 0.9rem;

      .counter {
        align-self: end;
        font-size: 0.9rem;
      }
    }

    .close-button {
      ${StyledCornerButton}
      position: absolute;
      top: 16px;
      right: 12px;

      :hover {
        color: rgb(${({ theme }) => theme.error});
      }
    }

    .save-button {
      ${BaseButton}
      justify-self: center;
      align-self: center;
      text-align: center;
    }
  }
`;
