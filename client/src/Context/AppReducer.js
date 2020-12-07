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
        default:
            return state;
    }
}