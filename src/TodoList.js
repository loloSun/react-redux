import React ,{Component}from 'react';
// 引入 ui 插件
import 'antd/dist/antd.css'
import {Input,Button,List} from 'antd'
import store from './store/index';

// 取自定义的action函数
import {getInputChangeAction,getAddAction,getDeleteAction} from './store/actionCreator'
 
class TodoList extends Component{
    constructor(props){
        super(props);
        this.state = store.getState();//获取store里的所有state的数据
        // 监听store里面的变化，只要store里面的数据发生改变，则立即执行subscribe函数里的函数
        store.subscribe(this.StoreChange)
    }
    render(){
        return(
            <div style={{margin:'10px',marginLeft:'10px'}}>
                <div>
                    <Input
                        value={this.state.inputValue}
                        placehoder="todo list "
                        style={{width:'300px'}}
                        onChange={this.InputChange}
                    />
                    <Button
                        type= "primary"
                        onClick={this.BtnClick}
                    >提交</Button>
                </div>
                <List
                    style={{marginTop:'10px',width:'300px'}}
                    bordered
                    dataSource={this.state.list}
                    renderItem={(item,index) => (<List.Item onClick={()=>{this.ItemDelete(index)}}>{item}</List.Item>)}//这个这个参考antd官网
                />
            </div>
        )
    }
    InputChange=(e)=>{
        // console.log(e.target.value);//获取input的value值
        //告诉store,输入的类型和输入框中的值
        // const action={
        //     type:'change_input_value',
        //     value: e.target.value,
        // };
        const action = getInputChangeAction(e.target.value)
        //把action传给store
        store.dispatch(action);
        //store自动传给reducer
    };
    //reducer返回newState之后，store传递newState给组件
    StoreChange=()=>{
        this.setState(store.getState());
        // console.log('store change')
        // 感知store发生变化之后，从store里获取最新的数据，然后进行设置
    };
    //提交按钮(又一次流程)
    BtnClick=()=>{
        // const action={
        //     type:'add_todo_item'
        // };
        const action = getAddAction()
        store.dispatch(action);
    };
    //点击删除
    ItemDelete=(index)=>{
        // const action={
        //     type:'delete_todo_item',
        //     index:index,
        // };
        const action = getDeleteAction(index)
        store.dispatch(action);
    }
}
export default TodoList;