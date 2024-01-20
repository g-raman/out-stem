/* eslint-disable react/prop-types */
'use client';

import * as React from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function ComboBox({
  value,
  onSetValue,
  options,
  placeholder,
  errorMsg,
  searchPlaceholder,
  classNames,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`justify-between text-sm ${classNames}`}
        >
          {value
            ? options.find(
                (option) => option.value.toUpperCase() === value.toUpperCase(),
              )?.label
            : placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandEmpty>{errorMsg}</CommandEmpty>
          <CommandGroup>
            {options.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  onSetValue(
                    currentValue.toUpperCase() === value.toUpperCase()
                      ? ''
                      : capitalizeFirstLetter(currentValue),
                  );
                  setOpen(false);
                }}
              >
                {framework.label}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === framework.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
