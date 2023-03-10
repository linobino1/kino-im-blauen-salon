import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import classes from '../../css/screenings.module.css';
import {
  Media,
  FilmPrint,
  Movie,
  Screening as ScreeningType,
} from '../../payload-types';
import { mediaLoader } from '../../utilities/mediaLoader';
import { _t } from '../../i18n';
import { Date } from '../Date';

type Props = {
  screening: ScreeningType
};

export const Screening: React.FC<Props> = ({ screening }) => {
  const url = `/${screening.slug}`;

  return (
    <Link
      href={url}
    >
      <div
        className={classes.item}
      >
        <div className={classes.date}>
          <Date
            iso={screening.date}
            className={classes.dayName}
            format="EEEEEE"
          />
          <Date
            iso={screening.date}
            className={classes.dayNumber}
            format="ii"
          />
          <Date
            iso={screening.date}
            className={classes.month}
            format="MMM"
          />
        </div>
        <div className={classes.imgWrapper}>
          <Image
            loader={mediaLoader}
            src={(((screening.filmprint as FilmPrint)?.movie as Movie)?.header as Media)?.filename}
            alt={(((screening.filmprint as FilmPrint)?.movie as Movie)?.header as Media)?.alt}
            fill
          />
        </div>
        <div className={classes.info}>
          <Date
            iso={screening.time}
            className={classes.time}
            format="p"
          />
          <div className={classes.title}>
            { screening.title }
          </div>
          <div className={classes.footer}>
            {_t('More Info')}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Screening;
