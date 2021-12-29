import axios from 'axios';
import * as actions from '../api';

const api = store => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);
  const { url, method, data, onStart, onSuccess, onError } = action.payload;
  if (onStart) store.dispatch({ type: onStart });
  next(action);
  try {
    const response = await axios({
      url,
      method,
      data
    });
    store.dispatch(actions.apiCallSuccess(response.data));
    if (onSuccess) store.dispatch({ type: onSuccess, payload: response.data });
  } catch (e) {
    store.dispatch(actions.apiCallFailed(e.message));
    if (onError) store.dispatch({ type: onError, payload: e.message });
  }
};

export default api;
