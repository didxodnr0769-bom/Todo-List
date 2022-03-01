import React, { createRef } from "react";

function SideSpace() {
  return <div className="side-space"></div>;
}

/** todo 컴포넌트 */
function Todo({ todo, onClick }) {
  const { value, finished } = todo;
  const handleClick = () => {
    onClick(todo);
  };
  return (
    <div className="todo-wrap" onClick={handleClick}>
      <div className="check">
        <input type="checkbox" checked={finished} readOnly />
      </div>
      <div className={`value ${finished && "deprecated"}`}>{value}</div>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.todoRef = createRef();
    this.state = {
      todos: [],
    };
  }

  handleClickCheck = (todo) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.map((_todo) => {
        if (_todo.reg_date === todo.reg_date) {
          return {
            ..._todo,
            finished: !_todo.finished,
          };
        } else {
          return _todo;
        }
      }),
    });
  };

  /** 확인 버튼 클릭 이벤트 */
  handleClickSubmit = () => {
    const { value } = this.todoRef.current;
    if (!value) {
      alert("할 일을 입력해주세요");
      return false;
    }
    const todo = {
      value,
      finished: false,
      reg_date: new Date(),
    };
    this.setState({
      todos: [...this.state.todos, todo],
    });
    this.todoRef.current.value = "";
  };
  /** Enter Event */
  handleEnterPress = (e) => {
    if (e.key === "Enter") {
      this.handleClickSubmit();
    }
  };
  render() {
    const { todos } = this.state;
    return (
      <div className="app-container">
        <SideSpace />
        <div className="content-container">
          <h1 className="title">Todo List</h1>
          <div className="todo-list-container">
            {todos.map((todo, idx) => (
              <Todo key={idx} todo={todo} onClick={this.handleClickCheck} />
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              ref={this.todoRef}
              onKeyPress={this.handleEnterPress}
            />
            <button onClick={this.handleClickSubmit}>확인</button>
          </div>
        </div>
        <SideSpace />
      </div>
    );
  }
}

export default App;
