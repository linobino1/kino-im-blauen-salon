import React from 'react';
import { Navigation as NavigationType } from '../../payload-types';
import classes from '../../css/nav.module.css';
// eslint-disable-next-line import/no-cycle
import NavigationItem from './item';

type Props = {
  navigation: NavigationType
  className?: string
};

const Navigation: React.FC<Props> = ({ navigation, className }) => (
  <nav className={`${classes.nav} ${classes[navigation?.type]} ${className}`}>
    {navigation?.items.map((item) => (
      <NavigationItem item={item} key={item.id} />
    ))}
  </nav>
);

export default Navigation;
