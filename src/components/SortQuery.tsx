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
import { RiSortDesc } from 'react-icons/ri';
import classnames from 'classnames';

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
            className={classnames(state.query.sort === value && 'is-active')}
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
      align={{ autoArrow: true }}
      arrow={true}
      visible={isDropdownVisible}
      onVisibleChange={(state) => setIsDropdownVisible(state)}
      overlay={renderDropdownItems}>
      <motion.button
        title='Sort notes'
        placeholder='Sort notes'
        aria-placeholder='Sort notes'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.8 }}>
        <RiSortDesc />
      </motion.button>
    </Dropdown>
  );
}

const DropdownContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 5px;
  border-radius: 8px;
  backdrop-filter: blur(5px);
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

  .is-active {
    color: rgb(${({ theme }) => theme.primary_shade});
    background: rgb(${({ theme }) => theme.primary}, 0.2);
  }
`;
