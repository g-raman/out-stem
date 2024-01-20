'use client';

/* eslint-disable react/prop-types */
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DatePicker({ defaultMonth, date, onSetDate }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start bg-card px-4 py-6 text-left text-base font-normal sm:text-xl',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-5 w-5 sm:h-6 sm:w-7" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          defaultMonth={defaultMonth}
          selected={date}
          onSelect={onSetDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
