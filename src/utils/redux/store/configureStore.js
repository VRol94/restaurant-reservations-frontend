import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import api from './middleware/api';

export default () => {
  return configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }).concat(api)
  });
};
