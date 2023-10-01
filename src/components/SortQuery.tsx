import {
  CaretSortIcon,
  CircleIcon,
  RadiobuttonIcon
} from '@radix-ui/react-icons';
import { useState } from 'react';
import Dropdown from 'rc-dropdown';
import styled, { useTheme } from 'styled-components';
import actions from '@/shared/actions';
import { m as motion } from 'framer-motion';
import { sortOptions } from '@/shared/data';
import { useAppContext } from '@/context/AppContext';

export default function SortQuery() {
  const { state, dispatch } = useAppContext();
  const { primary_shade: primaryShadeColor } = useTheme();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const renderDropdownItems = (): JSX.Element => {
    return (
      <DropdownContainer>
        {sortOptions.map(({ value, label }, index) => (
          <div
            key={index.toString()}
            onClick={() => {
              dispatch({
                type: actions.QUERY_NOTES,
                payload: { ...state, query: { ...state.query, sort: value } }
              });
            }}>
            {state.query.sort === value ? <RadiobuttonIcon /> : <CircleIcon />}
            <span>Sort by: {label}</span>
          </div>
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
        title='Sort notes'
        placeholder='Sort notes'
        aria-placeholder='Sort notes'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.8 }}
        style={{ color: `rgb(${primaryShadeColor})` }}>
        <CaretSortIcon />
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
