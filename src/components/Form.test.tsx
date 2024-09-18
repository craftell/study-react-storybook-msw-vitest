import { test, expect, describe, vi, beforeAll, afterAll } from 'vitest';
import { composeStory } from '@storybook/react';
import { render, screen, waitFor } from '@testing-library/react';
import Meta, * as Stories from './Form.stories';
import { userEvent } from '@storybook/test';
import { setupServer } from 'msw/node';

const server = setupServer();

beforeAll(() => server.listen());

afterAll(() => server.close());

describe('Form', () => {
  test.concurrent(
    'should submit correct data',
    server.boundary(async () => {
      server.use(...Stories.mockHandler);
      // Arrange
      const expectedSelectedValue = 'option-c';
      const submitHandler = vi.fn();

      const Form = composeStory(Stories.Default, Meta);
      render(<Form onSubmit={submitHandler} />);

      await waitFor(() => {
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(3);
      });

      const combobox = screen.getByRole('combobox');
      await userEvent.selectOptions(combobox, expectedSelectedValue);

      const submitButton = screen.getByRole('button', { name: 'Submit' });

      // Act
      await userEvent.click(submitButton);

      // Assert
      await expect(submitHandler).toHaveBeenCalledWith({
        option: expectedSelectedValue,
      });
    })
  );
});
