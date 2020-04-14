import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "./firebase.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: "",
      items: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref("items");
    const item = {
      title: this.state.currentItem,
    };
    itemsRef.push(item);
    this.setState({
      currentItem: "",
    });
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref("items");
    itemsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
        });
      }
      this.setState({
        items: newState,
      });
    });
  }

  removeItem(itemId) {
    console.log("remove-item-clicked");
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  render() {
    return (
      <div>
        <div className="header-nav">
          <h1>Todo-App</h1>

          <input
            type="text"
            name="currentItem"
            placeholder="What are you bringing ?"
            onChange={this.handleChange}
            value={this.state.currentItem}
          />

          <button onClick={this.handleSubmit}> Add</button>
        </div>

        <div className="flex-container">
          <ul>
            {this.state.items.map((item) => {
              return (
                <li className="flex-item" key={item.id}>
                  <p>{item.title}</p>

                  <h6 onClick={() => this.removeItem(item.id)}>Remove</h6>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
