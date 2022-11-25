import {ADD_AGENDA,DELETE_AGENDA,UPDATE_AGENDA, TOGGLE_MODAL} from "./constants";


export const addAGenda = (agenda) => dispatch => {
  dispatch({type: ADD_AGENDA, payload: agenda,
  });
 //localStorage.setItem('agendas', JSON.stringify([agenda]))
 
};
export const deleteAGenda = (index) => dispatch => {
  dispatch({
    type: DELETE_AGENDA,
    payload: index,
  });
};
export const editAGenda = (agenda, index) => dispatch => {
  dispatch({
    type:UPDATE_AGENDA,
    payload: agenda,index
  });
};

export const toggleModal = (showModal) => dispatch => {
dispatch({type:TOGGLE_MODAL, payload:showModal })
}
