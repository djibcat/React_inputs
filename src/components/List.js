import React, { Component } from "react";
import User from "./User";
import validator from "validator";
//STYLE//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import "../Style/style.scss";
import "./List.css";
//Tooltips & Popcorns//
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

const iconSort = <FontAwesomeIcon icon={faSort} />;

export default class List extends Component {
  //===========GET INPUT INFO============//
  constructor(props) {
    super(props);

    this.inputName = React.createRef();
    this.inputFirstName = React.createRef();
    this.inputEmail = React.createRef();
    this.inputAge = React.createRef();

    this.state = {
      userInputArray: [],
    };
    this.id = 0;
  }

  handleFormClick = () => {
    if (
      (validator.isAlpha(this.inputName.current.value),
      validator.isAlpha(this.inputFirstName.current.value),
      validator.isEmail(this.inputEmail.current.value),
      validator.isDecimal(this.inputAge.current.value))
    ) {
      this.state.userInputArray.push({
        id: this.id,
        name: this.inputName.current.value,
        firstName: this.inputFirstName.current.value,
        email: this.inputEmail.current.value,
        age: this.inputAge.current.value,
      });
      this.setState({
        userInputArray: this.state.userInputArray,
      });
    } else {
      if (!validator.isAlpha(this.inputName.current.value)) {
        const inputName = this.inputName.current;
        inputName.classList.add("error");
      }
      if (!validator.isAlpha(this.inputFirstName.current.value)) {
        const inputFirstName = this.inputFirstName.current;
        inputFirstName.classList.add("error");
      }
      if (!validator.isEmail(this.inputEmail.current.value)) {
        const inputEmail = this.inputEmail.current;
        inputEmail.classList.add("error");
      }
      if (!validator.isDecimal(this.inputAge.current.value)) {
        const inputAge = this.inputAge.current;
        inputAge.classList.add("error");
      }
    }

    this.inputName.current.value = "";
    this.inputFirstName.current.value = "";
    this.inputEmail.current.value = "";
    this.inputAge.current.value = "";
    this.id += 1;
  };
  handleKeyPress = (event) => {
    let Enter = event.charCode;
    if (Enter === 13) {
      this.handleFormClick();
    } else {
      return 0;
    }
  };
  //===============DELETE=================//
  removeClassName = () => {
    const inputName = this.inputName.current;
    inputName.classList.remove("error");
  };
  removeClassFirstName = () => {
    const inputFirstName = this.inputFirstName.current;
    inputFirstName.classList.remove("error");
  };
  removeClassEmail = () => {
    const inputEmail = this.inputEmail.current;
    inputEmail.classList.remove("error");
  };
  removeClassAge = () => {
    const inputAge = this.inputAge.current;
    inputAge.classList.remove("error");
  };

  deleteClick = (id) => {
    const newUserInputArray = this.state.userInputArray.filter(
      (user) => user.id !== id
    );
    this.setState({
      userInputArray: newUserInputArray,
    });
  };

  //=================SORT==================//

  sortById = () => {
    this.state.userInputArray.sort((a, b) => {
      return a.id - b.id;
    });
    this.setState({
      userInputArray: this.state.userInputArray,
    });
  };

  sortByAge = () => {
    this.state.userInputArray.sort((a, b) => {
      return a.age - b.age;
    });
    this.setState({
      userInputArray: this.state.userInputArray,
    });
  };

  sortNameAZ = () => {
    this.state.userInputArray.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    this.setState({
      userInputArray: this.state.userInputArray,
    });
  };

  sortFirstNameAZ = () => {
    this.state.userInputArray.sort((a, b) => {
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
        return -1;
      }
      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    this.setState({
      userInputArray: this.state.userInputArray,
    });
  };

  sortMailAZ = () => {
    this.state.userInputArray.sort((a, b) => {
      if (a.email.toLowerCase() < b.email.toLowerCase()) {
        return -1;
      }
      if (a.email.toLowerCase() > b.email.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    this.setState({
      userInputArray: this.state.userInputArray,
    });
  };

  //============RENDER====================//
  render() {
    return (
      <div className="inputContainer">
        <h1>User Manager 3.0</h1>
        <div className="form" onKeyPress={this.handleKeyPress}>
          <div className="labelForm">
            <p>id</p>
            <i onClick={this.sortById}>{iconSort}</i>
          </div>

          <div className="labelForm">
            <input
              className="inputs"
              type="text"
              ref={this.inputName}
              placeholder="Name"
              onFocus={this.removeClassName}
            ></input>
            <i onClick={this.sortNameAZ}>{iconSort}</i>
          </div>

          <div className="labelForm">
            <input
              className="inputs"
              type="text"
              ref={this.inputFirstName}
              placeholder="First-Name"
              onFocus={this.removeClassFirstName}
            ></input>
            <i onClick={this.sortFirstNameAZ}>{iconSort}</i>
          </div>

          <div className="labelForm">
            <input
              className="inputs"
              type="text"
              ref={this.inputEmail}
              placeholder="Email"
              onFocus={this.removeClassEmail}
            ></input>{" "}
            <i onClick={this.sortMailAZ}>{iconSort}</i>
          </div>

          <div className="labelForm">
            <input
              className="inputs"
              type="text"
              ref={this.inputAge}
              placeholder="Age"
              onFocus={this.removeClassAge}
            ></input>
            <i onClick={this.sortByAge}>{iconSort}</i>
          </div>

          <div className="labelForm">
            <button class="btn" type="button" onClick={this.handleFormClick}>
              Add User
            </button>
          </div>
        </div>
        {this.state.userInputArray.map((user) => {
          return (
            <User
              id={user.id}
              key={user.id}
              name={user.name}
              firstName={user.firstName}
              email={user.email}
              age={user.age}
              deleteClick={(id) => {
                this.deleteClick(id);
              }}
            />
          );
        })}
      </div>
    );
  }
}
