import { Tag } from '@/types';
import actions from '@/shared/actions';
import { RiCloseLine, RiHashtag } from 'react-icons/ri';
import { useAppContext } from '@/context/AppContext';
import { Dispatch, SetStateAction } from 'react';
import { AnimatePresence, m as motion } from 'framer-motion';
import { SelectContainer } from '../Select';
import { colorOptions } from '@/shared/data';
import { _tagEditor as Container } from '@/styles/modules/_tag-editor';

type Props = {
  data: Tag;
  setData: Dispatch<SetStateAction<Tag>>;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
};

export default function TagEditor({
  isVisible,
  setIsVisible,
  data: tag,
  setData: setTag
}: Props) {
  const { state, dispatch } = useAppContext();

  const updateTag = () => {
    const isValidObj = Object.values(tag).every((value) => value !== '');
    if (!isValidObj) return undefined;
    dispatch({
      type: actions.CURRENT_NOTE,
      payload: {
        ...state,
        currentNote: {
          ...state.currentNote,
          tags: [
            ...state.currentNote.tags.map((currentTag) =>
              currentTag.id === tag.id ? { ...currentTag, ...tag } : currentTag
            )
          ]
        }
      }
    });
    setTag({ id: '', color: '', value: '' });
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <Container
          className='main'
          onClick={(e): void => {
            const isTarget = (e as any).target.classList.contains('main');
            if (isTarget) {
              setTag({ id: '', color: '', value: '' });
              setIsVisible(false);
            }
          }}>
          <motion.section
            className='data-container'
            exit={{ opacity: 0, scale: 0 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.3 }
            }}>
            <h2>
              <RiHashtag />
              <span>Tag editor</span>
            </h2>

            <motion.button
              className='close-button'
              onClick={() => {
                setTag({ id: '', color: '', value: '' });
                setIsVisible(false);
              }}>
              <RiCloseLine />
            </motion.button>

            <form
              className='tag-form-container'
              onSubmit={(e) => e.preventDefault()}>
              <input
                type='text'
                id={'tags'}
                name={'tags'}
                value={tag.value}
                placeholder={'Modify your created tag...'}
                maxLength={12}
                onChange={(e) =>
                  setTag((data) => ({ ...data, value: String(e.target.value) }))
                }
              />
              <span className='counter'>{`${tag.value.length} / 12`}</span>
            </form>

            <SelectContainer
              placeholder={'Select a color...'}
              options={colorOptions}
              onChange={(option: any) => {
                setTag((data) => ({ ...data, color: option?.value }));
              }}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.8 }}
              className='save-button'
              onClick={updateTag}>
              <span>Save changes</span>
            </motion.button>
          </motion.section>
        </Container>
      ) : null}
    </AnimatePresence>
  );
}
