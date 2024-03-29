import { useAppContext } from '@/context/AppContext';
import actions from '@/shared/actions';
import { statusMap } from '@/shared/data';
import { CaretDownIcon } from '@radix-ui/react-icons';
import Dropdown from 'rc-dropdown';
import * as React from 'react';
import { Tooltip } from 'react-tooltip';
import styled from 'styled-components';

type TStatus = 'none' | 'active' | 'pending' | 'reviewing' | 'completed';

export default function Status() {
  const { state, dispatch } = useAppContext();
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

  const [{ data }] = React.useMemo(
    () => statusMap.filter((item) => item.value === state.currentNote.status),
    [state.currentNote.status]
  );

  const handleUpdateStatus = (data: TStatus): void => {
    dispatch({
      type: actions.CURRENT_NOTE,
      payload: {
        ...state,
        currentNote: { ...state.currentNote, status: data }
      }
    });
    setIsDropdownVisible(false);
  };

  const renderDropdownItems = (): JSX.Element => {
    return (
      <DropdownContainer>
        {statusMap.map(({ value, data }, index) => (
          <div key={index.toString()} onClick={() => handleUpdateStatus(value as TStatus)}>
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
        data-tooltip-id={`set-status`}
        data-tooltip-content={`Set note status`}>
        <data.icon color={data.color} />
        {state.currentNote.status === 'none' ? (
          <span>
            <i>Set </i>status
          </span>
        ) : (
          <span>
            <i>Currently</i> {data.label}
          </span>
        )}
        <CaretDownIcon />
        <Tooltip
          classNameArrow='tooltip-border-class'
          className='tooltip-class'
          id='set-status'
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
