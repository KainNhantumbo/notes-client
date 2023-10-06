import Dropdown from 'rc-dropdown';
import actions from '@/shared/actions';
import styled from 'styled-components';
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { CaretDownIcon, DotFilledIcon } from '@radix-ui/react-icons';

type TPriority = 'none' | 'low' | 'medium' | 'high';

const prioritiesDataMapping = [
  { value: 'none', data: { label: 'None', color: '#ccc' } },
  { value: 'low', data: { label: 'Low', color: '#3D9A50' } },
  { value: 'medium', data: { label: 'Medium', color: '#FBE32D' } },
  { value: 'high', data: { label: 'High', color: '#C62A2F' } }
];

export default function Priority() {
  const { state, dispatch } = useAppContext();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [{ data }] = prioritiesDataMapping.filter((item) => {
    if (item.value === state.currentNote.metadata.priority) {
      return item;
    }
  });

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
    setIsDropdownVisible(false);
  };

  const renderDropdownItems = (): JSX.Element => {
    return (
      <DropdownContainer>
        {prioritiesDataMapping.map(({ value, data }, index) => (
          <div
            key={index.toString()}
            onClick={() => handleUpdatePriority(value as TPriority)}>
            <DotFilledIcon color={data.color} />
            <span>Priority: {data.label}</span>
          </div>
        ))}
      </DropdownContainer>
    );
  };

  return (
    <Dropdown
      trigger={['click']}
      animation='slide-up'
      align={{ autoArrow: true }}
      arrow={true}
      visible={isDropdownVisible}
      onVisibleChange={(state) => setIsDropdownVisible(state)}
      overlay={renderDropdownItems}>
      <DropdownTriggerButton
        title={`Set note priority`}
        aria-placeholder={`Set note priority`}>
        <DotFilledIcon color={data.color} className='dot-icon' />
        {state.currentNote.metadata.priority === 'none' ? (
          <span>Set priority</span>
        ) : (
          <span>{data.label} Priority</span>
        )}
        <CaretDownIcon />
      </DropdownTriggerButton>
    </Dropdown>
  );
}

const DropdownContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  background: rgba(${({ theme }) => theme.foreground}, 0.85);
  border: 1px solid rgba(${({ theme }) => theme.font}, 0.1);
  user-select: none;
  cursor: pointer;
  font-family: 'Inter';
  font-size: 0.85rem;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3px;
    padding: 5px 8px;
    border-radius: 5px;
    position: relative;

    svg {
      width: 22px;
      height: 22px;
    }

    :hover {
      background: rgba(${({ theme }) => theme.primary}, 0.25);

      ::after {
        position: absolute;
        content: '';
        width: 3.5px;
        height: 24px;
        border-radius: 5px;
        background: rgba(${({ theme }) => theme.primary_shade}, 0.8);
        top: calc(50% - 12px);
        left: -7px;
      }
    }
  }
`;

const DropdownTriggerButton = styled.button`
  all: unset;
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
  border-radius: 8px;
  padding: 6px 8px;

  :hover {
    transition: all 200ms ease-in-out;
    color: rgb(${({ theme }) => theme.primary_shade});
    background: rgb(${({ theme }) => theme.primary}, 0.2);
  }

  span {
    font-weight: 500;
    font-size: 0.9rem;
  }

  .dot-icon {
    width: 18px;
    height: 18px;
    transform: scale(50px);
  }
`;
