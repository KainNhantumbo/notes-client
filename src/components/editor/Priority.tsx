import { useAppContext } from '@/context/AppContext';
import actions from '@/shared/actions';
import { prioritiesMap } from '@/shared/data';
import { CaretDownIcon } from '@radix-ui/react-icons';
import Dropdown from 'rc-dropdown';
import * as React from 'react';
import { RiTimerFlashLine } from 'react-icons/ri';
import { Tooltip } from 'react-tooltip';
import styled from 'styled-components';

type PriorityType = 'none' | 'low' | 'medium' | 'high';

export default function Priority() {
  const { state, dispatch } = useAppContext();
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

  const [{ data }] = React.useMemo(
    () => prioritiesMap.filter((item) => item.value === state.currentNote.priority),
    [state.currentNote.priority]
  );

  const handleUpdatePriority = (data: PriorityType): void => {
    dispatch({
      type: actions.CURRENT_NOTE,
      payload: { ...state, currentNote: { ...state.currentNote, priority: data } }
    });
    setIsDropdownVisible(false);
  };

  const renderDropdownItems = (): JSX.Element => {
    return (
      <DropdownContainer>
        {prioritiesMap.map(({ value, data }, index) => (
          <div
            key={index.toString()}
            onClick={() => handleUpdatePriority(value as PriorityType)}>
            <RiTimerFlashLine color={data.color} />
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
        data-tooltip-id='set-priority'
        data-tooltip-content={`Set note priority`}>
        <RiTimerFlashLine color={data.color} className='dot-icon' />
        {state.currentNote.priority === 'none' ? (
          <span>
            <i>Set </i>priority
          </span>
        ) : (
          <span>
            {data.label} <i>Priority</i>
          </span>
        )}
        <CaretDownIcon />
        <Tooltip
          classNameArrow='tooltip-border-class'
          className='tooltip-class'
          id='set-priority'
        />
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
  white-space: nowrap;
  width: fit-content;

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
