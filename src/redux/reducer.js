import * as actions from  './constants'

const initialState = {
agendas:[]
}
export const reducer = (state = initialState,   action) => {
    switch (action.type) {
        case actions.ADD_AGENDA:
            return [...state, { agendas: action.payload} ]
        case actions.DELETE_AGENDA:
            return { ...state, agendas:state.agendas.filter((agenda) => agenda.id !== action.payload)};
        case actions.UPDATE_AGENDA:
        
            return { ...state, agendas:state.agendas.map((agenda) => agenda.id === action.payload.id ? action.payload:agenda)}
          
        default:
            break;
    }
}
