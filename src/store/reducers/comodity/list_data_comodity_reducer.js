const initalState = {
    data: null,
    isError: false,
    messages: '',
  };
  
  const list_data_comodity_reducer = (state = initalState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case 'LOADING_GET_LIST_COMODITY_DATA':
        return {
          ...state,
          isError: false,
          messages: '',
        };
      case 'ERROR_GET_LIST_COMODITY_DATA':
        return {
          ...state,
          isError: true,
          messages: 'Oops Something Went Wrong ......',
        };
      case 'SUCCESSFULLY_GET_LIST_COMODITY_DATA':
        return {
          ...state,
          data: payload,
          isError: false,
          messages: 'successfully get list',
        };
      default:
        return state;
    }
  };
  
  export default list_data_comodity_reducer;