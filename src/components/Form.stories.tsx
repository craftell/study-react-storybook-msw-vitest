import { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';
import { http, HttpResponse } from 'msw';
import { userEvent, waitFor, within, expect, fn } from '@storybook/test';

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
    onSubmit: fn(),
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

export const Default: Story = {
  play: async ({ args, canvasElement, step }) => {
    // Arrange
    const canvas = within(canvasElement);

    await step('Wait for form to be ready', async () => {
      await waitFor(() => {
        const options = canvas.getAllByRole('option');
        expect(options).toHaveLength(3);
      });
    });

    await step('Select an option', async () => {
      const combobox = canvas.getByRole('combobox');
      await userEvent.selectOptions(combobox, 'option-c');
    });

    // Act
    await step('Submit form', async () => {
      const submitButton = canvas.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);
    });

    // Assert
    // 👇 Now we can assert that the onSubmit arg was called
    await waitFor(() =>
      expect(args.onSubmit).toHaveBeenCalledWith({
        name: '',
        option: 'option-c',
      })
    );
  },
};
