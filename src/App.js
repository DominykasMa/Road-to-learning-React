import React, { Component } from "react";
import "./App.css";
import { Button, Checkbox, Form, Input } from 'semantic-ui-react'

const list = [
  {
    title: "React",
    url: "https://reactjs.org",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://redux.js.org",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  },
  {
    title: "Redux",
    url: "https://redux.js.org",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 2
  }
];

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      appName: "Road to learning React",
      searchTerm: ""
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }
  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
        <h1>{this.state.appName}</h1>
        <Search value={searchTerm} onChange={this.onSearchChange}>
        </Search>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

class Search extends Component {
  render() {
    const { value, onChange, children } = this.props;
    return (
      <Form>
        {children}
        <Input className={'searchInput'} placeholder={'Search'} type={'text'} value={value} onChange={onChange} />
      </Form>
    );
  }
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div className={'list'}>
        <div className={'listHeader'}>
         <span className={'table-cell'}>Title</span>
          <span className={'table-cell'}>Author</span>
          <span className={'table-cell'}>Comments</span>
          <span className={'table-cell'}>Points</span>
          <span className={'table-cell'}>Action</span>
        </div>
        {list.filter(isSearched(pattern)).map(item => (
          <div className={'listItem'} key={item.objectID}>
            <span className={'table-cell'}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span className={'table-cell'}>{item.author}</span>
            <span className={'table-cell'}>{item.num_comments}</span>
            <span className={'table-cell'}>{item.points}</span>
            <span className={'table-cell'}>
              <ButtonDelete onClick={() => onDismiss(item.objectID)} type="button">
                Dismiss
              </ButtonDelete>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

class ButtonDelete extends Component {
  render() {
    const {
      onClick,
      className,
      children,
    } = this.props;
    return (
        <Button
            onClick={onClick}
            className={className}
            type="button"
        >
          {children}
        </Button>
    );
  }
}


export default App;
