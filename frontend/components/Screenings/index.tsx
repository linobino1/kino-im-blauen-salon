import React from 'react';
import classes from '@/css/screenings.module.css';
import { Screening as ScreeningType } from '@/payload-types';
import { Screening } from './Screening';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  screenings?: ScreeningType[]
};

export const Screenings: React.FC<Props> = ({ screenings }) => {
  const { t } = useTranslation();
  const { asPath } = useRouter();

  return (screenings?.length ? (
    <div className={classes.list}>
      {screenings.map((screening) => (
        <Link href={`${asPath}/${screening.slug as string}`} key={screening.id}>
          <Screening screening={screening} />
        </Link>
      ))}
    </div>
  ) : (
    <div className={classes.emptyList}>
      {t('No upcoming screenings.')}
    </div>
  ));
};

export default Screenings;
