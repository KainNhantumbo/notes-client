import {
  CaretDownIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  FrameIcon,
  ReloadIcon,
  UpdateIcon
} from '@radix-ui/react-icons';
import Dropdown from 'rc-dropdown';
import actions from '@/shared/actions';
import styled from 'styled-components';
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';

type TStatus = 'none' | 'active' | 'pending' | 'reviewing' | 'completed';

export const statusDataMapping = [
  { value: 'none', data: { label: 'None', color: '#ccc', icon: FrameIcon } },
  {
    value: 'active',
    data: { label: 'Active', color: '#0091FF', icon: UpdateIcon }
  },
  {
    value: 'pending',
    data: { label: 'Pending', color: '#F76808', icon: CrossCircledIcon }
  },
  {
    value: 'reviewing',
    data: { label: 'Reviewing', color: '#7E808A', icon: ReloadIcon }
  },
  {
    value: 'completed',
    data: { label: 'Completed', color: '#3D9A50', icon: CheckCircledIcon }
  }
];

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
  background: rgba(${({ theme }) => theme.foreground}, 0.85);
  border: 1px solid rgba(${({ theme }) => theme.font}, 0.1);
  user-select: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3px;
    padding: 5px 8px;
    border-radius: 5px;

    svg {
      width: 18px;
      height: 18px;
    }

    :hover {
      background: rgba(${({ theme }) => theme.primary}, 0.25);
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
  padding: 5px 8px;

  :hover {
    transition: all 200ms ease-in-out;
    background: rgba(${({ theme }) => theme.primary}, 0.25);
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
