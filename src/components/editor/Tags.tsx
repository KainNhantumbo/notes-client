import { nanoid } from 'nanoid';
import { useState } from 'react';
import TagEditor from './TagEditor';
import actions from '@/shared/actions';
import { SubmitEvent, Tag } from '@/types';
import { m as motion } from 'framer-motion';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useAppContext } from '@/context/AppContext';
import { _tags as Container } from '@/styles/modules/_tags';

export default function Tags() {
  const { state, dispatch } = useAppContext();
  const [isTagEditorVisible, setIsTagEditorVisible] = useState<boolean>(false);
  const [tag, setTag] = useState<Tag>({ id: '', color: '', value: '' });

  const createTag = (e: SubmitEvent) => {
    e.preventDefault();
    if (tag.value.length < 1) return undefined;
    const isTagAdded = state.currentNote.metadata.tags.some(
      (item) => item.value.toLowerCase() === tag.value.toLowerCase()
    );

    if (isTagAdded) return undefined;
    const data = { id: nanoid(8), color: '#E47131', value: tag.value };

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
            <p
              title='Edit and update tag'
              aria-placeholder='Edit and update tag'
              onClick={() => {
                setTag(tag);
                setIsTagEditorVisible(true);
              }}>
              {tag.value}
            </p>
            <button
              title='Remove tag'
              aria-placeholder='Remove tag'
              className='remove-tag_button'
              onClick={() => removeTag(tag.id)}>
              <Cross2Icon />
            </button>
          </motion.div>
        ))}
      </section>
      <form onSubmit={(e) => createTag(e)}>
        <input
          type='text'
          id={'tags'}
          name={'tags'}
          className='tag-input'
          value={tag.value}
          style={{
            display:
              state.currentNote.metadata.tags.length <= 10 ? 'block' : 'none'
          }}
          placeholder={'Add tags...'}
          title='Type here to add new tags...'
          maxLength={12}
          onChange={(e) =>
            setTag((data) => ({ ...data, value: String(e.target.value) }))
          }
        />
      </form>

      <TagEditor
        data={tag}
        setData={setTag}
        isVisible={isTagEditorVisible}
        setIsVisible={setIsTagEditorVisible}
      />
    </Container>
  );
}
