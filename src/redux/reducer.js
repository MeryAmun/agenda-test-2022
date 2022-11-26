import * as actions from "./constants";

export const reducer = (state = { agendas: [] }, action) => {
  switch (action.type) {
    case actions.ADD_AGENDA:
      return { ...state.agendas, agendas: [...state.agendas, action.payload] };
    case actions.DELETE_AGENDA:
      return {
        ...state,
        agendas: state.agendas.filter((agenda) => agenda.id !== action.payload),
      };
    case actions.UPDATE_AGENDA:
      return {
        ...state.agendas,
        agendas: state.agendas.map((agenda) =>
          agenda.id === action.payload ? action.payload : agenda
        ),
      };
    default:
      return state;
  }
};
