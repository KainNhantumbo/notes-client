import { useState } from 'react';
import Dropdown from 'rc-dropdown';
import actions from '@/shared/actions';
import styled from 'styled-components';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { useAppContext } from '@/context/AppContext';
import { statusDataMapping } from '@/shared/data';

type TStatus = 'none' | 'active' | 'pending' | 'reviewing' | 'completed';

export default function Status() {
  const { state, dispatch } = useAppContext();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [{ data }] = statusDataMapping.filter((item) => {
    if (item.value === state.currentNote.metadata.status) {
      return item;
    }
  });

  const handleUpdateStatus = (data: TStatus): void => {
    dispatch({
      type: actions.CURRENT_NOTE,
      payload: {
        ...state,
        currentNote: {
          ...state.currentNote,
          metadata: { ...state.currentNote.metadata, status: data }
        }
      }
    });
    setIsDropdownVisible(false);
  };

  const renderDropdownItems = (): JSX.Element => {
    return (
      <DropdownContainer>
        {statusDataMapping.map(({ value, data }, index) => (
          <div
            key={index.toString()}
            onClick={() => handleUpdateStatus(value as TStatus)}>
            <data.icon color={data.color} />
            <span>Status: {data.label}</span>
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
        title={`Set note status`}
        aria-placeholder={`Set note status`}>
        <data.icon color={data.color} />
        {state.currentNote.metadata.status === 'none' ? (
          <span>Set status</span>
        ) : (
          <span>Currently {data.label}</span>
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
  font-family: 'Inter';
  font-size: 0.85rem;
  background: rgba(${({ theme }) => theme.foreground}, 0.85);
  border: 1px solid rgba(${({ theme }) => theme.font}, 0.1);
  user-select: none;
  cursor: pointer;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3px;
    padding: 5px 8px;
    border-radius: 5px;
    position: relative;

    svg {
      width: 18px;
      height: 18px;
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
