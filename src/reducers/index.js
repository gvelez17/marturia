import { combineReducers } from 'redux';
import victims from './victims';
import modal from './modalPopup';

export default combineReducers({
  victims,
  modal
});
