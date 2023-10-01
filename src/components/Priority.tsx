import { useMemo } from 'react';
import actions from '@/shared/actions';
import { useAppContext } from '@/context/AppContext';
import { CaretDownIcon, DotFilledIcon } from '@radix-ui/react-icons';
import { _priorities as Container } from '@/styles/modules/_priorities';

const prioritiesDataMapping = [
  { value: 'none', data: { label: 'None', color: '#fff' } },
  { value: 'low', data: { label: 'Low', color: '#3D9A50' } },
  { value: 'medium', data: { label: 'Medium', color: '#FBE32D' } },
  { value: 'high', data: { label: 'High', color: '#C62A2F' } }
];

type TPriority = 'none' | 'low' | 'medium' | 'high';

export default function Priority() {
  const { state, dispatch } = useAppContext();

  const handleUpdatePriority = (data: TPriority): void => {
    dispatch({
      type: actions.CURRENT_NOTE,
      payload: {
        ...state,
        currentNote: {
          ...state.currentNote,
          metadata: { ...state.currentNote.metadata, priority: data }
        }
      }
    });
  };

  const [{ data }] = useMemo(() => {
    return prioritiesDataMapping.filter((item) => {
      if (item.value === state.currentNote.metadata.priority) {
        return item;
      }
    });
  }, [state.currentNote.metadata.priority]);

  return (
    <Container>
      <button>
        <DotFilledIcon color={data.color} />
        <span>{data.label}</span>
        <CaretDownIcon />
      </button>
    </Container>
  );
}
