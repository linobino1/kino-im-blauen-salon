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

  return (
    <Suspense>
      <time
        suppressHydrationWarning
        className={className}
        dateTime={iso}
      >
        {formatInTimeZone(date, tz, format ?? 'LLLL d, yyyy')}
      </time>
    </Suspense>
  );
};
