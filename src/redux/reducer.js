import * as actions from  './constants'


export const reducer = (state = {showModal: false, agendas:[] },   action) => {
    switch (action.type) {
        case actions.TOGGLE_MODAL:
            return state.showModal = !action.payload
        case actions.ADD_AGENDA:
           //localStorage.setItem('agendas', JSON.stringify(state.agendas ))
            return {...state.agendas, agendas:[ ...state.agendas, action.payload]} 
        case actions.DELETE_AGENDA:
            return { ...state, agendas:state.agendas.filter((agenda) => agenda.id !== action.payload)};
        case actions.UPDATE_AGENDA:
        
            return { ...state, agendas:state.agendas.map((agenda) => 
                ( agenda.id === action.payload ? action.payload : agenda )
            //     if(index === action.payload){
            //         return { ...agenda, title: agenda.title, description:agenda.description, status:agenda.status,deadline:agenda.deadline
            //         }
            //     }
            //     return agenda
            // }
            
            )}
        default:
          return  state
    }
}
