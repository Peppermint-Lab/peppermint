import React, { createContext, useReducer, } from 'react';
import AppReducer from './AppReducer';
import { baseUrl } from "../utils";
import axios from "axios";

// Initial State
const initialState = {
    todos: []
}

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
           }
        }
        try {
            const res = await axios.get(`${baseUrl}/api/v1/todo/getTodo`, config)
            console.log(res.data.todo)
            dispatch({
                type: 'GET_TODOS',
                payload: res.data.todo
            });
        } catch (error) {
            
        }
    }

    async function addTodo(todo) {
        try {
            const res = await await fetch(`${baseUrl}/api/v1/todo/createTodo`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
                body: JSON.stringify({
                  todo,
                }),
              }).then((res) => res.json());
            console.log(res)
            dispatch({
                type: 'ADD_TODO',
                payload: res.todo
              });
        } catch (error) {
            
        }
    }
    
    return(
    
    // This allows us to use in any component by use usecontext
    // Which is the react hook
    <GlobalContext.Provider value={{
        todos: state.todos,
        getTodos,
        addTodo,
        }}>
        {children} 
    </GlobalContext.Provider>
    )};