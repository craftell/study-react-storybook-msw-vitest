import { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';
import { http, HttpResponse } from 'msw';
import { action } from '@storybook/addon-actions';

export const mockHandler = [
  http.get('/api/options', () => {
    return HttpResponse.json({
      options: [
        { label: 'Option A', value: 'option-a' },
        { label: 'Option B', value: 'option-b' },
        { label: 'Option C', value: 'option-c' },
      ],
    });
  }),
];

const meta: Meta<typeof Form> = {
  component: Form,
  args: {
    onSubmit: action('submit'),
  },
  parameters: {
    msw: {
      handlers: mockHandler,
    },
  },
  excludeStories: ['mockHandler'],
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {};
