import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import classes from '@/css/screenings.module.css';
import {
  Media,
  FilmPrint,
  Movie,
  Screening as ScreeningType,
} from '@/payload-types';
import { Date } from '../Date';
import { useTranslation } from 'next-i18next';
import { mediaUrl } from '@/util/mediaUrl';

type Props = {
  screening: ScreeningType
};

export const Screening: React.FC<Props> = ({ screening }) => {
  const url = `/${screening.slug}`;
  const { t } = useTranslation();

  return (
    <Link
      href={url}
    >
      <div
        className={classes.item}
      >
        <div className={classes.date}>
          <Date
            iso={screening.date as string}
            className={classes.dayName}
            format="EEEEEE"
          />
          <Date
            iso={screening.date as string}
            className={classes.dayNumber}
            format="ii"
          />
          <Date
            iso={screening.date as string}
            className={classes.month}
            format="MMM"
          />
        </div>
        <div className={classes.imgWrapper}>
          <Image
            src={mediaUrl(((screening.filmprint as FilmPrint)?.movie as Movie)?.header as Media)}
            alt={(((screening.filmprint as FilmPrint)?.movie as Movie)?.header as Media)?.alt}
            fill
          />
        </div>
        <div className={classes.info}>
          <Date
            iso={screening.time as string}
            className={classes.time}
            format="p"
          />
          <div className={classes.title}>
            { screening.title }
          </div>
          <div className={classes.footer}>
            {t('More Info')}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Screening;
