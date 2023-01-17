import * as React from 'react';
import { Unstable_NextDateTimePicker as NextDateTimePicker } from '@mui/x-date-pickers/NextDateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { screen } from '@mui/monorepo/test/utils/createRenderer';
import { expect } from 'chai';
import { createPickerRenderer, expectInputValue } from 'test/utils/pickers-utils';
import 'moment/locale/de';
import 'moment/locale/fr';

const testDate = new Date(2018, 4, 15, 9, 35);
const localizedTexts = {
  en: {
    placeholder: 'MM/DD/YYYY hh:mm aa',
    value: '05/15/2018 09:35 AM',
  },
  fr: {
    placeholder: 'DD/MM/YYYY hh:mm',
    value: '15/05/2018 09:35',
  },
  de: {
    placeholder: 'DD.MM.YYYY hh:mm',
    value: '15.05.2018 09:35',
  },
};
describe('<AdapterMoment />', () => {
  Object.keys(localizedTexts).forEach((localeKey) => {
    const localeObject = { code: localeKey };

    describe(`test with the locale "${localeKey}"`, () => {
      const { render, adapter } = createPickerRenderer({
        clock: 'fake',
        adapterName: 'moment',
        locale: localeObject,
      });

      it('should have correct placeholder', () => {
        render(<NextDateTimePicker />);

        expectInputValue(screen.getByRole('textbox'), localizedTexts[localeKey].placeholder, true);
      });

      it('should have well formatted value', () => {
        render(<NextDateTimePicker value={adapter.date(testDate)} />);

        expectInputValue(screen.getByRole('textbox'), localizedTexts[localeKey].value, true);
      });
    });
  });

  it('should return the correct week number', () => {
    const adapter = new AdapterMoment({ locale: 'fr' });

    const dateToTest = adapter.date(new Date(2022, 10, 10));

    expect(adapter.getWeekNumber!(dateToTest)).to.equal(45);
  });
});