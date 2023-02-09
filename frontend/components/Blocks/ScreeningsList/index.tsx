import { Screening as ScreeningComponent } from '@/components/Screening';
import { Screening } from '@/payload-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import classes from './screeningsList.module.css';

export type Props = {
  blockType: 'screeningsList'
  blockName?: string
  from?: string
  screenings: Screening[]
}

export const ScreeningsList: React.FC<Props> = ({ screenings }) => {
  const { t } = useTranslation(); 
  const { asPath } = useRouter();

  return screenings?.length ? (
    <div className={classes.list}>
      {screenings.map((screening) => (
        <Link href={`${asPath}/${screening.slug as string}`} key={screening.id}>
          <ScreeningComponent screening={screening} />
        </Link>
      ))}
    </div>
  ) : (
    <div className={classes.empty}>{t('No upcoming screenings.')}</div>
  );
};

export default ScreeningsList;