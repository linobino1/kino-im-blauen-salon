import React from 'react';
import classes from '../../css/screenings.module.css';
import { Screening as ScreeningType } from '../../payload-types';
import { Screening } from './Screening';
import { _t } from '../../i18n';

type Props = {
  screenings: ScreeningType[]
};

export const Screenings: React.FC<Props> = ({ screenings }) => (screenings ? (
  <div className={classes.list}>
    {screenings.map((item) => (
      <Screening screening={item} key={item.id} />
    ))}
  </div>
) : (
  <div className={classes.emptyList}>
    {_t('No upcoming screenings.')}
  </div>
));

export default Screenings;
