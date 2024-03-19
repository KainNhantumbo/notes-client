import { nanoid } from 'nanoid';
import { useState } from 'react';
import TagEditor from './TagEditor';
import actions from '@/shared/actions';
import { SubmitEvent, Tag } from '@/types';
import { Tooltip } from 'react-tooltip';
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
    const isTagAdded = state.currentNote.tags.some(
      (item) => item.value.toLowerCase() === tag.value.toLowerCase()
    );

    if (isTagAdded) return undefined;
    const data = { id: nanoid(8), color: '#E47131', value: tag.value };

    if (state.currentNote.tags.length <= 7) {
      dispatch({
        type: actions.CURRENT_NOTE,
        payload: {
          ...state,
          currentNote: {
            ...state.currentNote,
            tags: [...state.currentNote.tags, data]
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
          tags: [...state.currentNote.tags.filter((tag) => tag.id !== id)]
        }
      }
    });
  };

  return (
    <Container>
      <section className='tags-list-container'>
        {state.currentNote.tags.map((tag) => (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key={tag.id}
            className='tag'
            style={{ background: tag.color }}>
            <p
              data-tooltip-id='edit-tag'
              data-tooltip-content='Edit and update tag'
              onClick={() => {
                setTag(tag);
                setIsTagEditorVisible(true);
              }}>
              {tag.value}
            </p>
            <Tooltip className='tooltip-class' id='edit-tag' />
            <button
              data-tooltip-id='remove-tag'
              data-tooltip-content='Remove tag'
              className='remove-tag_button'
              onClick={() => removeTag(tag.id)}>
              <Cross2Icon />
              <Tooltip className='tooltip-class' id='remove-tag' />
            </button>
          </motion.div>
        ))}
      </section>
      <form onSubmit={(e) => createTag(e)}>
        <input
          style={{
            display: state.currentNote.tags.length <= 7 ? 'block' : 'none'
          }}
          id='tags'
          type='text'
          name='tags'
          maxLength={12}
          value={tag.value}
          className='tag-input'
          autoComplete='false'
          spellCheck={false}
          autoCorrect='false'
          placeholder='Add tags...'
          data-tooltip-id='tag-input'
          data-tooltip-content='Type here to add new tags...'
          onChange={(e) => setTag((data) => ({ ...data, value: e.target.value }))}
        />
        <Tooltip className='tooltip-class' id='tag-input' />
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
