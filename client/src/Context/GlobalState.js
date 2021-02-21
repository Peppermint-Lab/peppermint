import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Initial State
const initialState = {
  todos: [],
  notes: [],
  user: {},
  unissuedTicket: [],
  openTicket: [],
  newsletters: [],
};

// Create context
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const history = useHistory();

  // action
  async function getTodos() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        ContentType: "application/json",
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(`/api/v1/todo/getTodo`, config);
      dispatch({
        type: "GET_TODOS",
        payload: res.data.todo,
      });
    } catch (error) {}
  }

  async function addTodo(todo) {
    try {
      const res = await fetch(`/api/v1/todo/createTodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          todo,
        }),
      }).then((res) => res.json());

      dispatch({
        type: "ADD_TODO",
        payload: res.todo,
      });
    } catch (error) {}
  }

  async function deleteTodo(id) {
    try {
      await fetch(`/api/v1/todo/deleteTodo/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((response) => response.json());
      dispatch({ type: "DELETE_TODO", payload: id });
    } catch (error) {}
  }

  async function allDone() {
    try {
      const res = await fetch(`/api/v1/todo/markAllAsDone`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          ContentType: "application/json",
          Accept: "application/json",
        },
      }).then((res) => res.json());

      dispatch({ type: "ALLDONE_TODO", payload: res.todo });
      console.log(res);
    } catch (error) {}
  }

  async function markDone(id) {
    try {
      const res = await fetch(`/api/v1/todo/markOneAsDone/${id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          ContentType: "application/json",
          Accept: "application/json",
        },
      }).then((response) => response.json());
      dispatch({ type: "MARK_TODO", payload: res.todo });
    } catch (error) {}
  }

  async function getNotes() {
    try {
      const res = await fetch(`/api/v1/note/getNotes`, {
        method: "get",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          ContentType: "application/json",
        },
      }).then((res) => res.json());
      dispatch({ type: "GET_NOTES", payload: res.note });
    } catch (error) {}
  }

  async function saveNote(text, title) {
    try {
      const res = await await fetch(`/api/v1/note/saveNote`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          text,
          title,
        }),
      }).then((res) => res.json());
      dispatch({ type: "ADD_NOTE", payload: res.note });
    } catch (error) {}
  }

  async function deleteNote(id) {
    try {
      console.log(id);
      await fetch(`/api/v1/note/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => res.json());
      dispatch({ type: "DELETE_NOTE", payload: id });
    } catch (error) {}
  }

  async function signin(email, password) {
    try {
      await fetch(`/api/v1/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch({ type: "USER", payload: data.user });
            console.log(data);
          } else {
            console.log(data.error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function isLogged() {
    try {
      await fetch(`/api/v1/auth/token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          const res = response;
          if (res.auth === false || null ) {
            history.push("/login");
          } else {
            return console.log("logged in");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function getUnissuedTicket() {
    try {
      const res = await fetch(`/api/v1/tickets/unissuedTickets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }).then((res) => res.json());
      dispatch({ type: "GET_UNISSUEDTICKETS", payload: res.tickets });
    } catch (error) {
      console.log(error);
    }
  }

  async function convertTicket(data) {
    try {
      const res = await fetch(`/api/v1/tickets/convertTicket`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          data
        }),
      }).then((res) => res.json())
      dispatch({ type: "CONVERT_TICKET", payload: res.ticket });
    } catch (error) {
      console.log(error)
    }
  }

  async function getOpenTicket() {
    try {
      const res = await fetch(`/api/v1/tickets/openedTickets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        dispatch({ type: "GET_OPENTICKET", payload: res.tickets });
    } catch (error) {
      
    }
  }

  async function completeTicket(id) {
    const res = await fetch(`/api/v1/tickets/complete/${id}`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((res) => res.json());
    dispatch({ type: "COMPLETE_TICKET", payload: res.tickets });
    console.log(res)
  }

  async function transferTicket(id, ticket) {
    try {
      const res = await fetch(`/api/v1/tickets/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          id,
          find: ticket,
        }),
      }).then((res) => res.json())
      dispatch({ type: "TRANSFER_TICKET", payload: res.tickets });
    } catch (error) {
      
    }
  }

  async function markUndone(id) {
    try {
      const res = await fetch(`/api/v1/todo/markUndone/${id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          ContentType: "application/json",
          Accept: "application/json",
        },
      }).then((response) => response.json());
      dispatch({ type: "UNMARK_TODO", payload: res.todo });
    } catch (error) {
      console.log(error)
    }
  }

  async function createNewsletter(title, text, active) {
    try {
      const res = await fetch(`/api/v1/newsletter/create`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          text,
          active,
        }),
      }).then((res) => res.json());
      console.log(res.newsletters)
      dispatch({ type: "CREATE_NEWSLETTER", payload: res.newsletters });
    } catch (error) {
      console.log(error)
    }
  }

  async function getNewsletter() {
    try {
      const res = await fetch(`/api/v1/newsletter/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        dispatch({ type: "GET_NEWSLETTER", payload: res.newsletter });
    } catch (error) {
      
    }
  }

  return (
    // This allows us to use in any component by use usecontext
    // Which is the react hook
    <GlobalContext.Provider
      value={{
        todos: state.todos,
        notes: state.notes,
        auth: state.auth,
        user: state.user,
        unissuedTicket: state.unissuedTicket,
        openTicket: state.openTicket,
        newsletters: state.newsletters,
        getTodos,
        addTodo,
        deleteTodo,
        allDone,
        markDone,
        getNotes,
        saveNote,
        deleteNote,
        signin,
        isLogged,
        getUnissuedTicket,
        convertTicket,
        getOpenTicket,
        completeTicket,
        transferTicket,
        markUndone,
        createNewsletter,
        getNewsletter
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
