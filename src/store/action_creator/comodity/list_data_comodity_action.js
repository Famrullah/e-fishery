import SteinStore from 'stein-js-client'

const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list/"
);
export const list_comodity = (limit_page) => async (dispatch) => {
  try {
    await dispatch({
      type: 'LOADING_GET_LIST_COMODITY_DATA',
    });
    const response = await store.read("", { limit: limit_page})
    await dispatch({
      type: 'SUCCESSFULLY_GET_LIST_COMODITY_DATA',
      payload: response,
    });
    return response
  } catch (e) {
    return dispatch({
      type: 'ERROR_GET_LIST_COMODITY_DATA',
    });
  }
};