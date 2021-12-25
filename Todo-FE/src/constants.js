import LOCAL_URL from "./config"

const TODO_PREFIX = "todos";
const URL_TODO_GET_ALL =(sort="")=>{
    if(sort=="")
    return `${LOCAL_URL}/${TODO_PREFIX}/all`
    return `${LOCAL_URL}/${TODO_PREFIX}/all?sort=${sort}`
 };
const URL_TODO_GET_ONE =(id)=>{
   return `${LOCAL_URL}/${TODO_PREFIX}/${id}`
};
const URL_TODO_ADD =`${LOCAL_URL}/${TODO_PREFIX}/add`;
const URL_UPDATE =(id)=>{
    return `${LOCAL_URL}/${TODO_PREFIX}/${id}/edit`
 };
const URL_DELETE_ONE =(id)=>{
    return `${LOCAL_URL}/${TODO_PREFIX}/${id}/delete`
 };;
const URL_DELETE_ALL =`${LOCAL_URL}/${TODO_PREFIX}/deleteall`;

export {URL_TODO_GET_ALL,URL_TODO_GET_ONE,URL_TODO_ADD,URL_UPDATE,URL_DELETE_ONE,URL_DELETE_ALL}