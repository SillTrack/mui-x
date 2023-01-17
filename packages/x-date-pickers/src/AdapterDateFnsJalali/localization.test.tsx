import * as React from 'react';
import { Unstable_NextDateTimePicker as NextDateTimePicker } from '@mui/x-date-pickers/NextDateTimePicker';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { screen } from '@mui/monorepo/test/utils/createRenderer';
import { expect } from 'chai';
import { createPickerRenderer, expectInputValue } from 'test/utils/pickers-utils';
import enUS from 'date-fns/locale/en-US';
import faIR from 'date-fns-jalali/locale/fa-IR';
import faJalaliIR from 'date-fns-jalali/locale/fa-jalali-IR';

const testDate = new Date(2018, 4, 15, 9, 35);
const localizedTexts = {
  enUS: {
    placeholder: 'MM/DD/YYYY hh:mm aa',
    value: '02/25/1397 09:35 AM',
  },
  faIR: {
    placeholder: 'YYYY/MM/DD hh:mm aa',
    value: '1397/02/25 09:35 ق.ظ.',
  },
  faJalaliIR: {
    // Not sure about what's the difference between this and fa-IR
    placeholder: 'YYYY/MM/DD hh:mm aa',
    value: '1397/02/25 09:35 ق.ظ.',
  },
};

describe('<AdapterDateFnsJalali />', () => {
  Object.keys(localizedTexts).forEach((localeKey) => {
    const localeName = localeKey === 'undefined' ? 'default' : `"${localeKey}"`;
    const localeObject =
      localeKey === 'undefined'
        ? undefined
        : {
            faIR,
            faJalaliIR,
            enUS,
          }[localeKey];

    describe(`test with the ${localeName} locale`, () => {
      const { render, adapter } = createPickerRenderer({
        clock: 'fake',
        adapterName: 'date-fns-jalali',
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
    const adapter = new AdapterDateFnsJalali({ locale: faIR });

    const dateToTest = adapter.date(new Date(2022, 10, 10));

    expect(adapter.getWeekNumber!(dateToTest)).to.equal(34);
  });
});