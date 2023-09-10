import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import { _select as Container } from '@/styles/modules/select';

type TSelect = {
  label: string;
  placeholder: string;
  data: Array<{
    label: string;
    value: string;
    onchange?: (() => void) | undefined;
  }>;
  onchange?: (() => void) | undefined;
};

export function SelectContainer({ label, placeholder, data }: TSelect) {
  return (
    <Container>
      <Select.Root>
        <Select.Trigger className='SelectTrigger' aria-label={label}>
          <Select.Value placeholder={placeholder} />
          <Select.Icon className='SelectIcon'>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className='SelectContent'>
            <Select.ScrollUpButton className='SelectScrollButton'>
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className='SelectViewport'>
              <Select.Group>
                <Select.Label className='SelectLabel'>{label}</Select.Label>
                {data.map((option, index) => (
                  <Select.Item
                    key={index.toString()}
                    className='SelectItem'
                    value={option.value}
                    onChange={option.onchange}>
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator className='SelectItemIndicator'>
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton className='SelectScrollButton'>
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </Container>
  );
}
