import { useMemo, useState } from 'react';
import actions from '@/shared/actions';
import { useAppContext } from '@/context/AppContext';
import Dropdown from 'rc-dropdown';
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
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
    setIsVisible(false)
  };

  const [{ data }] = useMemo(() => {
    return prioritiesDataMapping.filter((item) => {
      if (item.value === state.currentNote.metadata.priority) {
        return item;
      }
    });
  }, [state.currentNote.metadata.priority]);

  const renderDropdownItems = (): JSX.Element => {
    return (
      <section className='dropdown-container'>
        {prioritiesDataMapping.map(({ value, data }, index) => (
          <div
            key={index.toString()}
            onClick={() => handleUpdatePriority(value as TPriority)}>
            <DotFilledIcon color={data.color} />
            <span>{data.label}</span>
          </div>
        ))}
      </section>
    );
  };

  return (
    <Container>
      <Dropdown
        trigger={['click']}
        animation='slide-up'
        visible={isVisible}
        arrow={true}
        onVisibleChange={(state) => setIsVisible(state)}
        overlay={renderDropdownItems}>
        <button className='dropdown-trigger-button'>
          <DotFilledIcon color={data.color} />
          <span>{data.label}</span>
          <CaretDownIcon />
        </button>
      </Dropdown>
    </Container>
  );
}
