import * as actions from "./constants";

export const addAGenda = (agenda) => (dispatch) => {
  dispatch({
    actionType: actions.ADD_AGENDA,
    payload: agenda,
  });
};
export const deleteAGenda = (id) => (dispatch) => {
  dispatch({
    actionType: actions.DELETE_AGENDA,
    payload: id,
  });
};
export const editAGenda = (agenda, id) => (dispatch) => {
  dispatch({
    actionType: actions.UPDATE_AGENDA,
    payload: agenda,id
  });
};
