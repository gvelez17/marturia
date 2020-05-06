import { OPEN_MODAL, CLOSE_MODAL } from '../constants/actionTypes';

export const openModal = (message) => {
  return {
    type: OPEN_MODAL,
    isOpen: true,
    message: message
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
    isOpen: false,
    message: ''
  };
};