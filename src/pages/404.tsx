/* eslint-disable import/extensions */
import { Box, Image } from '@skynexui/components';
import React from 'react';

const Page404 = () => (
  <Box
    styleSheet={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#000',
    }}
  >
    <Image
      src="/images/404.jpeg"
    />
  </Box>
);

export default Page404;
