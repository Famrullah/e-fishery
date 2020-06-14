import SteinStore from 'stein-js-client'

const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_size"
);
export const option_size = (limit_page) => async (dispatch) => {
  try {
    await dispatch({
      type: 'LOADING_GET_LIST_OPTION_SIZE',
    });
    const response = await store.read("")
    await dispatch({
      type: 'SUCCESSFULLY_GET_LIST_OPTION_SIZE',
      payload: response,
    });
    return response
  } catch (e) {
    return dispatch({
      type: 'ERROR_GET_LIST_OPTION_SIZE',
    });
  }
};
