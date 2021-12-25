import axios from "axios";
import {URL_TODO_GET_ALL,URL_TODO_GET_ONE,URL_TODO_ADD,URL_UPDATE,URL_DELETE_ONE,URL_DELETE_ALL} from './constants.js'


const getTodos = async (sort = "")=>{
    try {
        const {data:todos} = await axios.get(URL_TODO_GET_ALL(sort));
        return todos;
    } catch (error) {
        return "Network error";
    }    
}
const getOneTodo = async (id)=>{
    try {
        const {data:todo} = await axios.get(URL_TODO_GET_ONE(id));
        return todo;
    } catch (error) {
        return "Network error";
    }    
}

const addTodo = async (data)=>{
    try {
        const {data:todo} = await axios.post(URL_TODO_ADD,data);
        return todo;
    } catch (error) {
        return "Network error";
    }    
}
const updateTodo = async (id,body)=>{
    try {
        const {data:todo} = await axios.put(URL_UPDATE(id),body);
        return todo;
    } catch (error) {
        return "Network error";
    }    
}
const removeOneTodo = async (id)=>{
    try {
        const {data:todo} = await axios.delete(URL_DELETE_ONE(id));
        return todo;
    } catch (error) {
        return "Network error";
    }    
}

const removeAllTodo = async ()=>{
    try {
        const {data:todo} = await axios.delete(URL_DELETE_ALL);
        return todo;
    } catch (error) {
        return "Network error";
    }    
}

export {getTodos,getOneTodo,addTodo,updateTodo,removeOneTodo,removeAllTodo}