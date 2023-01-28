import { Field } from 'payload/types';
import { t } from '../../translations';

function analogueDigitalTypeField(name: string): Field {
  return {
    name,
    label: t('Type'),
    type: 'radio',
    defaultValue: 'analogue',
    options: [
      {
        label: t('analogue'),
        value: 'analogue',
      },
      {
        label: t('digital'),
        value: 'digital',
      },
    ],
  };
}

export default analogueDigitalTypeField;
