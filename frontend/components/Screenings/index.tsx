import React from 'react';
import classes from '@/css/screenings.module.css';
import { Screening as ScreeningType } from '@/payload-types';
import { Screening } from './Screening';
import { useTranslation } from 'next-i18next';

type Props = {
  screenings?: ScreeningType[]
};

export const Screenings: React.FC<Props> = ({ screenings }) => {
  const { t } = useTranslation();
  return (screenings?.length ? (
    <div className={classes.list}>
      {screenings.map((screening) => (
        <Screening screening={screening} key={screening.id} />
      ))}
    </div>
  ) : (
    <div className={classes.emptyList}>
      {t('No upcoming screenings.')}
    </div>
  ));
};

export default Screenings;
