import { initialize, mswLoader } from 'msw-storybook-addon';
import type { Preview } from '@storybook/react';

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
