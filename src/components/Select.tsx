import Select, { Props } from 'react-select';
import { selectStyles } from '@/styles/modules/_select';
import { useTheme } from 'styled-components';

export function SelectContainer({ ...props }: Props) {
  const theme = useTheme();
  return <Select styles={selectStyles(theme)} {...props} />;
}
