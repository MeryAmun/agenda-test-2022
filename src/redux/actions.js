import { ADD_AGENDA, DELETE_AGENDA, UPDATE_AGENDA } from "./constants";

export const addAGenda = (agenda) => (dispatch) => {
  dispatch({ type: ADD_AGENDA, payload: agenda });
};
export const deleteAGenda = (id) => (dispatch) => {
  dispatch({
    type: DELETE_AGENDA,
    payload: id,
  });
};
export const editAGenda = (id) => (dispatch) => {
  dispatch({
    type: UPDATE_AGENDA,
    payload: id,
  });
};
