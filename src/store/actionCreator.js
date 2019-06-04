//用actionCreator创建统一的action
import {CHANGE_INPUT_VALUE,ADD_TODO_ITEM,DELETE_TODO_ITEM} from './actionTypes'; //引入常量
 
//为了封装  const  action={
//             // type:'add_todo_item'
//             type:ADD_TODO_ITEM
//         };
export  const getInputChangeAction=(value)=>({
    type:CHANGE_INPUT_VALUE,
    value:value,
});
 
export  const getAddAction=()=>({
    type:ADD_TODO_ITEM,
});
export const getDeleteAction=(index)=>({
    type:DELETE_TODO_ITEM,
    index:index,
})