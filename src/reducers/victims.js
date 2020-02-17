import { GET_VICTIMS_REQUEST } from '../constants/actionTypes';

const initialState = {
  loading: false,
  items: [],
  error: '',
}

const victims = (state = initialState, action) => {
  switch (action.type) {
    case GET_VICTIMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default victims;
