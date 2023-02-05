import React, { Suspense } from 'react';
import { parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

type Props = {
  iso: string
  format?: string
  className?: string
};

const tz = process.env.TIMEZONE || 'UTC';

export const Date: React.FC<Props> = ({
  iso, className, format,
}) => {
  const date = parseISO(iso);
  if (!date || isNaN(date.getMilliseconds())) {
    return (<></>);
  }
  const str = formatInTimeZone(date, tz, format ?? 'LLLL d, yyyy')

  return (
    <Suspense>
      <time
        suppressHydrationWarning
        className={className}
        dateTime={iso}
      >
        {str}
      </time>
    </Suspense>
  );
};
