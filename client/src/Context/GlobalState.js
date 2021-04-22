import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial State
const initialState = {
  todos: [],
  notes: [],
  unissuedTicket: [],
  openTicket: [],
  newsletters: [],
  clients: [],
  user: [],
  users: [],
};

// Create context
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

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
        payload: res.data.todos,
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
          ContentType: "application/json",
          Accept: "application/json",
        },
      }).then((res) => res.json());
      await dispatch({ type: "ALLDONE_TODO", payload: res.todos });
    } catch (error) {
      console.log(error);
    }
  }

  async function markDone(id) {
    try {
      const res = await fetch(`/api/v1/todo/markOneAsDone/${id}`, {
        method: "PUT",
        headers: {
          ContentType: "application/json",
          Accept: "application/json",
        },
      }).then((response) => response.json());
      await dispatch({ type: "MARK_TODO", payload: res.todos });
    } catch (error) {
      console.log(error);
    }
  }

  async function markUndone(id) {
    try {
      const res = await fetch(`/api/v1/todo/markUndone/${id}`, {
        method: "PUT",
        headers: {
          ContentType: "application/json",
          Accept: "application/json",
        },
      }).then((response) => response.json());
      await dispatch({ type: "UNMARK_TODO", payload: res.todos });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
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
      await dispatch({ type: "GET_NOTES", payload: res.notes });
    } catch (error) {}
  }

  async function saveNote(text, title) {
    try {
      const res = await await fetch(`/api/v1/note/saveNote`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          title,
        }),
      }).then((res) => res.json());
      await dispatch({ type: "ADD_NOTE", payload: res.note });
    } catch (error) {}
  }

  async function deleteNote(id) {
    try {
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
            dispatch({ type: "USER_LOGGED", payload: data.user });
          } else {
            console.log(data.error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function createTicket(name, email, company, issue, priority) {
    try {
      const res = await fetch(`/api/v1/tickets/createTicket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          issue,
          priority,
        }),
      }).then((res) => res.json());
      if (res.failed === true) {
        console.log(res.error);
      } else {
        dispatch({ type: "ADD_TICKET", payload: res.ticket });
      }
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
        },
        body: JSON.stringify({
          data,
        }),
      }).then((res) => res.json());
      dispatch({ type: "CONVERT_TICKET", payload: res.ticket });
    } catch (error) {
      console.log(error);
    }
  }

  async function getOpenTicket() {
    try {
      const res = await fetch(`/api/v1/tickets/openedTickets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      dispatch({ type: "GET_OPENTICKET", payload: res.tickets });
    } catch (error) {}
  }

  async function completeTicket(id) {
    const res = await fetch(`/api/v1/tickets/complete/${id}`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    dispatch({ type: "COMPLETE_TICKET", payload: res.tickets });
  }

  async function unCompleteTicket(id) {
    const res = await fetch(`/api/v1/tickets/uncomplete/${id}`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    dispatch({ type: "COMPLETE_TICKET", payload: res.tickets });
    console.log(res);
  }

  async function transferTicket(id, ticket) {
    try {
      const res = await fetch(`/api/v1/tickets/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          find: ticket,
        }),
      }).then((res) => res.json());
      dispatch({ type: "TRANSFER_TICKET", payload: res.tickets });
    } catch (error) {}
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
      dispatch({ type: "CREATE_NEWSLETTER", payload: res.newsletter });
    } catch (error) {
      console.log(error);
    }
  }

  async function getNewsletter() {
    try {
      const res = await fetch(`/api/v1/newsletter/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      dispatch({ type: "GET_NEWSLETTER", payload: res.newsletters });
    } catch (error) {}
  }

  async function deleteNewsletter(id) {
    try {
      const res = await fetch(`/api/v1/newsletter/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      dispatch({ type: "DELETE_NEWSLETTER", payload: res.newsletters });
    } catch (error) {}
  }

  async function getClients() {
    try {
      const res = await fetch(`/api/v1/client/allclients`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      await dispatch({ type: "GET_CLIENTS", payload: res.clients });
    } catch (error) {
      console.log(error);
    }
  }

  async function createClient(name, contactName, number, email) {
    try {
      const res = await fetch(`/api/v1/client/create`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          contactName,
          number,
          email,
        }),
      }).then((res) => res.json());
      dispatch({ type: "CREATE_CLIENT", payload: res.client });
    } catch (error) {
      console.log(error);
    }
  }

  async function createUser(firstName, lastName, email, password) {
    try {
      await fetch(`/api/v1/auth/Signup`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      }).then((res) => res.json());
    } catch (error) {
      console.log(error);
    }
  }

  async function getUsers() {
    try {
      const res = await fetch(`/api/v1/auth/getAllUsers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      console.log(res)
      dispatch({ type: "GET_USERS", payload: res.users });
    } catch (error) {
      console.log(error);
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
        users: state.users,
        unissuedTicket: state.unissuedTicket,
        openTicket: state.openTicket,
        newsletters: state.newsletters,
        clients: state.clients,
        getTodos,
        addTodo,
        deleteTodo,
        allDone,
        markDone,
        getNotes,
        saveNote,
        deleteNote,
        signin,
        getUnissuedTicket,
        convertTicket,
        getOpenTicket,
        completeTicket,
        transferTicket,
        markUndone,
        createNewsletter,
        getNewsletter,
        deleteNewsletter,
        createTicket,
        getClients,
        createClient,
        createUser,
        getUsers,
        unCompleteTicket,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
