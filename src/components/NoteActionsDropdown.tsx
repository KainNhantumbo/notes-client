import { useState } from 'react';
import { IconType } from '@/types';
import Dropdown from 'rc-dropdown';
import styled from 'styled-components';
import { m as motion } from 'framer-motion';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

type Props = {
  items: {
    handler: () => void | ((params: any) => void);
    label: string;
    icon: IconType;
  }[];
};

export default function NoteActionsDropdown(props: Props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const renderDropdownItems = (): JSX.Element => {
    return (
      <DropdownContainer>
        {props.items.map(({ handler, label, icon: Icon }, index) => (
          <motion.button key={index.toString()} onClick={handler}>
            <Icon />
            <span> {label}</span>
          </motion.button>
        ))}
      </DropdownContainer>
    );
  };

  return (
    <Dropdown
      trigger={['click']}
      animation='slide-up'
      visible={isDropdownVisible}
      onVisibleChange={(state) => setIsDropdownVisible(state)}
      overlay={renderDropdownItems}>
      <motion.button
        title='Toggle note actions'
        placeholder='Toggle note actions'
        aria-placeholder='Toggle note actions'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.8 }}>
        <DotsHorizontalIcon />
      </motion.button>
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
