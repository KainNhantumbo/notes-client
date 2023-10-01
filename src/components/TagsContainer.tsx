import actions from '@/shared/actions';
import { useAppContext } from '@/context/AppContext';
import { _tags as Container } from '@/styles/modules/_tags';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { SubmitEvent, Tag } from '@/types';
import { TwitterPicker } from 'react-color';
import { m as motion } from 'framer-motion';
import { usePopper } from 'react-popper';

export default function TagsContainer() {
  const { state, dispatch } = useAppContext();
  const [tag, setTag] = useState<Tag>({ id: '', color: '', value: '' });

  const {} = usePopper();

  const createTag = (e: SubmitEvent) => {
    e.preventDefault();
    if (tag.value.length < 1) return undefined;

    const data: Tag = { id: nanoid(8), color: '#E47131', value: tag.value };
    if (state.currentNote.metadata.tags.length <= 10) {
      dispatch({
        type: actions.CURRENT_NOTE,
        payload: {
          ...state,
          currentNote: {
            ...state.currentNote,
            metadata: {
              ...state.currentNote.metadata,
              tags: [...state.currentNote.metadata.tags, data]
            }
          }
        }
      });
      setTag({ id: '', color: '', value: '' });
    }
  };

  const removeTag = (id: string) => {
    dispatch({
      type: actions.CURRENT_NOTE,
      payload: {
        ...state,
        currentNote: {
          ...state.currentNote,
          metadata: {
            ...state.currentNote.metadata,
            tags: [
              ...state.currentNote.metadata.tags.filter((tag) => tag.id !== id)
            ]
          }
        }
      }
    });
  };

  const updateTag = () => {
    const isValidObj = Object.values(tag).every((value) => value !== '');
    if (!isValidObj) return undefined;
    dispatch({
      type: actions.CURRENT_NOTE,
      payload: {
        ...state,
        currentNote: {
          ...state.currentNote,
          metadata: {
            ...state.currentNote.metadata,
            tags: [
              ...state.currentNote.metadata.tags.map((currentTag) =>
                currentTag.id === tag.id
                  ? { ...currentTag, ...tag }
                  : currentTag
              )
            ]
          }
        }
      }
    });
  };

  return (
    <Container>
      <section className='tags-list-container'>
        {state.currentNote.metadata.tags.map((tag) => (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key={tag.id}
            className='tag'
            style={{ background: tag.color }}>
            <p>{tag.value}</p>
            <button onClick={() => removeTag(tag.id)}>
              <Cross1Icon />
            </button>
          </motion.div>
        ))}
      </section>
      <form onSubmit={(e) => createTag(e)} className='tags-input-container'>
        <input
          type='text'
          id={'tags'}
          name={'tags'}
          value={tag.value}
          style={{ display: state.currentNote.metadata.tags.length <= 10 ? 'block' : 'none'}}
          placeholder='Add tag...'
          maxLength={12}
          onChange={(e) =>
            setTag((data) => ({ ...data, value: String(e.target.value) }))
          }
        />
      </form>
    </Container>
  );
}
