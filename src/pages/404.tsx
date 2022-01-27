/* eslint-disable import/extensions */
import { Box } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

const Page404 = () => (
  <Box
    styleSheet={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: appConfig.theme.colors.primary[500],
      // @ts-ignore
      backgroundImage: 'url(/images/404.jpeg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundBlendMode: 'multiply',
    }}
  />
);

export default Page404;
