/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload,
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
      };
    case "ALLDONE_TODO":
      return {
        ...state,
        todos: action.payload,
      };
    case "MARK_TODO":
      return {
        ...state,
        todos: action.payload,
      };
    case "UNMARK_TODO":
      return {
        ...state,
        todos: action.payload,
      };
    case "GET_NOTES":
      return {
        ...state,
        notes: action.payload,
      };
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
      };
    case "ADD_TICKET":
      return {
        ...state,
        unissuedTicket: [...state.unissuedTicket, action.payload],
      };
    case "GET_UNISSUEDTICKETS":
      return {
        ...state,
        unissuedTicket: action.payload,
      };
    case "CONVERT_TICKET":
      return {
        ...state,
        unissuedTicket: action.payload,
      };
    case "GET_OPENTICKET":
      return {
        ...state,
        openTicket: action.payload,
      };
    case "COMPLETE_TICKET":
      return {
        ...state,
        openTicket: action.payload,
      };
    case "TRANSFER_TICKET":
      return {
        ...state,
        openTicket: action.payload,
      };
    case "CREATE_NEWSLETTER":
      return {
        ...state,
        newsletters: [...state.newsletters, action.payload],
      };
    case "GET_NEWSLETTER":
      return {
        ...state,
        newsletters: action.payload,
      };
    case "DELETE_NEWSLETTER":
      return {
        ...state,
        newsletters: action.payload,
      };
    case "GET_CLIENTS":
      return {
        ...state,
        clients: action.payload,
      };
    case "CREATE_CLIENT":
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };
    case "CREATE_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.payload
      };
    case "CLEAR":
      return null;
    default:
      return state;
  }
};
