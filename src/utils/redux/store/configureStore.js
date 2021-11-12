import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

export default () => {
  return configureStore({
    reducer
  });
};
