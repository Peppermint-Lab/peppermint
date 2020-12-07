/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
    switch (action.type) {
        case 'GET_TODOS':
            return {
                ...state,
                todos: action.payload
            }
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== action.payload)
            }
        case 'ALLDONE_TODO' :
            return {
                ...state,
                todos: action.payload
            }
        case 'MARK_TODO' :
            return {
                ...state,
                todos: action.payload
            }
        case 'GET_NOTES' :
            return {
                ...state,
                notes: action.payload
            }
        case 'ADD_NOTE' : 
            return {
                ...state,
                notes: [...state.notes, action.payload]
            }
        case 'DELETE_NOTE' :
            return {
                ...state,
                notes: state.notes.filter(note => note._id !== action.payload)
            }
        default:
            return state;
    }
}