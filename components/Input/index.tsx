import React from 'react';
import classes from '../../css/forms.module.css';

type Props = {
  name: string;
  label: string;
  required?: boolean;
  error?: any;
  type?: 'text' | 'number' | 'password' | 'email';
};

export const Input: React.FC<Props> = ({
  name, label, required, error, type = 'text',
}) => (
  <div className={classes.input}>
    <label htmlFor={name} className={classes.label}>
      {label}
    </label>
    <input {...{ type }} id={name} name={name} required={required} />
    {error && <div className={classes.error}>This field is required</div>}
  </div>
);
