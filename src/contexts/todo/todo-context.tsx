import { createContext } from "react";
import todoItem from "../../interfaces/todoItem.type";

export const TodoContext = createContext({
    todoItems: [],
    addTodo : (item: todoItem) => {}
});