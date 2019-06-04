#  React
1.  创建项目 Node >
    npx create-react-app my-app
    cd my-app
    npm start
    npx

2. 原理
> react下面有一个方法 createElement 函数返回的是一个对象 这个对象就是我们说的虚拟dom
```
import React,{Component} from 'react'
import React from 'react'

let React = {
    createElement(type,props,...children){
        // console.log(arguments)
        // 0:type     "h1" 
        // 1:props    className:"red"
        // 2:children "hello" span 
        return {type,props,children}
    }
}
```
> ReactDom是一个对象 {render}对象的解构赋值
```
import ReactDom from 'react-dom'
import ReactDom,{render} from 'react-dom'

let jsxEle = 
    // 通常来说 多行用括号表示是一个整体
    (<h1 className="red">
        hello
        <span>world1</span>
        <span>world2</span>
    </h1>)
// console.log(jsxEle)
```
> render方法 就是把虚拟dom 渲染成真实dom
ReactDom.render() 解构赋值之后：
```
render(jsxEle,window.root)
```
原理：
```
function render(jsx,content){
    let {type,props,children} = jsx;
    // 如果是字符串 直接放在content里面
    if(typeof jsx === 'string') return content.appendChild(document.createTextNode(jsx))
    let ele = document.createElement(type) // 创建一个h1的元素
    if(props){ // 包含class之类的属性
        for(let key in props){
            if(key === 'className'){
                ele.setAttribute('class',props[key])
            }
            ele.setAttribute(key,props[key])
        }
        // children 的结果和ele的结构是一样 有可能也是对象 所以递归调用render方法
        children.forEach(child => {
            render(child,ele)
        });
        content.appendChild(ele)
    }
}
render(jsxEle,window.root)
```

3. 使用 Ant Design UI组件
```
npm install antd
```

# redux
- 使用redux 目的
 > 在react中组件与组件之间的通信很麻烦，于是借用redux进行第三方的通信，通过把数据存储在store里，实现各个组件间快速通信
- redux 基础
1. 核心
    - state：普通对象
    - action：JS 普通对象，用来描述发生了什么，store 数据的唯一来源
    - reducer：把 action 和 state 串起来。接收 state 和 action 作为参数，并返回新的 state 的函数。
2. 三大原则
    - 单一数据源：只存在唯一一个store
    - state只读：唯一改变 state 的方法就是触发 action
    - 使用纯函数进行修改：reducer
3. 主要组件
    - action
    > 通过dispatch传递数据到store
    - reducer
    > 描述如何响应action更新state
    - store
    > 维持应用的 state；
      提供 getState() 方法获取 state；
      提供 dispatch(action) 方法更新 state；
      通过 subscribe(listener) 注册监听器;
      通过 subscribe(listener) 返回的函数注销监听器。
4. 主要流程
    - 创建store、reducer、初始的state
    - store 的 dispatch(action) 传递 action 给 store，store 会自动转发给 reducer
    - reducer 接收信息，并返回给 store 一个 newState
5. 优化
    - action的type由公共的actionTypes管理
    - 将action封装成对象，写在actionCreator.js文件里

