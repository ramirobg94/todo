import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      todo: '',
      elements: [
        {text: 'create slides', isDone: true, id: 0},
        {text: 'prepare demo', isDone: false, id: 1},
        {text: 'create slides', isDone: true, id: 2},
        {text: 'prepare demo', isDone: false, id: 3}
      ],
      currentId: 4
    }

    this.addTodo = this.addTodo.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
  }

  addTodo(){
    this.setState(prevState => ({
      todo: '',
      elements: [
        ...prevState.elements, 
        {text: prevState.todo, isDone: false, id: prevState.currentId}
      ],
      currentId: prevState.currentId+1
    }))
  }

  changeStatus(idElem){
    this.setState(prevState => ({
      elements: [...prevState.elements].map(
        (elem) => (
          {...elem, isDone: elem.id === idElem ? !elem.isDone : elem.isDone}
        )
      )
    }))
  }

  render() {
    return (
      <div className="App">
        <TodoTitle />
        <TodoInput 
          todo={this.state.todo}
          addTodo={this.addTodo}
          onChange={(text)=>this.setState({todo:text})}/>
        <TodoList
          todos={this.state.elements.filter((elm)=> !elm.isDone)}
          changeStatus={this.changeStatus} />
        <TodoList
          isDone={true}
          todos={this.state.elements.filter((elm)=> elm.isDone)}
          changeStatus={this.changeStatus} />
      </div>
    );
  }
}

export default App;



const TodoTitle = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">To-do list</h1>
  </header>
)

const TodoInput = ({ todo, addTodo, onChange }) => (
  <div className="Todo-input-container">
    <input
      className="Todo-input-input"
      type="text"
      placeholder="escribir to-do ..."
      onChange={e => onChange(e.target.value)}
      value={todo}
    />
    <div className="Todo-input-btn" onClick={() => addTodo()}>
      <span> Send</span>
    </div>
  </div>
)

const TodoList = ({ todos, changeStatus, isDone }) => (
  <div className={`Todo-list ${isDone ? 'Todo-list-done' : 'Todo-list-undone'}`}>
    {todos.length > 0 ? (
      todos.map((todo, idx) => <TodoItem key={todo.id} position={idx} item={todo} changeStatus={changeStatus} />)
    ) : (
      <p> {isDone ? 'No has terminado ni un to-do' : 'No tienes To-dos por hacer'}</p>
    )}
  </div>
)

const TodoItem = ({ item: { id, isDone, text }, position, changeStatus }) => (
  <div
    className={`Todo-element-container Todo-element-${isDone ? 'done' : 'undone'}`}
    onClick={() => changeStatus(id)}
    style={{ backgroundColor: position % 2 === 0 ? '#fcfcfc' : '#f4f4f4' }}
  >
    <TodoItemContent id={id} text={text} />
    <TodoItemCheckBox isDone={isDone} />
  </div>
)

const TodoItemContent = ({ id, text }) => (
  <div className="Todo-element-text">
    <p>
      {id}. {text}
    </p>
  </div>
)

const TodoItemCheckBox = ({ isDone }) => (
  <div className="Todo-element-check">
    <p>{`${isDone ? 'X' : ''}`}</p>
  </div>
)
