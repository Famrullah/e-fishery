import { combineReducers } from 'redux';
import list_data_comodity_state from './comodity/list_data_comodity_reducer';
import option_area_state from './comodity/option_city_comodity_reducer';

export default combineReducers({
    list_data_comodity_state,
    option_area_state
});