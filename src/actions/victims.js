import { GET_VICTIMS_REQUEST } from '../constants/actionTypes';

export const fetchVictims = () => {
  return {
    type: GET_VICTIMS_REQUEST
  };
};
