import { Meta, StoryFn } from '@storybook/react';
import { Form, Formik } from 'formik';
import DatePicker from '@/components/DatePicker/DatePicker';
import RangeDatePicker from '@/components/DatePicker/RangeDatePicker';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    className: { control: false },
    name: { control: false },
    defaultDate: { control: 'text', defaultValue: '2024-01-01' },
    dateFormat: { control: 'text', defaultValue: 'MM-dd-yyyy' },
    disabledLogo: { control: 'boolean', defaultValue: false },
  },
} as Meta;

export const SingleDatePicker: StoryFn = () => (
  <Formik
    initialValues={{ date: '' }}
    onSubmit={(values) => console.log(values)}
  >
    <Form>
      <DatePicker
        name="date"
        onChange={(date: Date) => console.log('Selected date:', date)}
      />
    </Form>
  </Formik>
);

export const DateRange: StoryFn = () => (
  <Formik
    initialValues={{ dateRange: [] }}
    onSubmit={(values) => console.log(values)}
  >
    <Form>
      <RangeDatePicker
        name="dateRange"
        onChange={(dates: [Date, Date]) =>
          console.log('Selected dates:', dates)
        }
      />
    </Form>
  </Formik>
);

export const PreselectedDateRange: StoryFn = () => (
  <Formik
    initialValues={{ dateRange: [] }}
    onSubmit={(values) => console.log(values)}
  >
    <Form>
      <RangeDatePicker
        name="dateRange"
        defaultStartDate={new Date('2024-01-01')}
        defaultEndDate={new Date('2024-01-31')}
        onChange={(dates: [Date, Date]) =>
          console.log('Selected dates:', dates)
        }
      />
    </Form>
  </Formik>
);
