import React from "react";
import "./edit.css";
import { patch } from "../api/Request";

class Edit extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: localStorage.getItem("userName"),
    };
  }
  render() {
    return (
      <div className="popup">
        <div className="edit_area">
          <div className="edit_flame">
            <img
              src={`${process.env.PUBLIC_URL}/Button/人物アイコン.png`}
              className="editman_icon"
              alt="profile"
            ></img>
            <div className="edit_title">edit</div>
          </div>
          <input
            value={this.state.userName}
            type="text"
            onChange={this.onChangeUserName.bind(this)}
            placeholder={this.state.userName}
            className="edit_form"
          ></input>
          <button className="OK_button" onClick={this.onEdit.bind(this)}>
            OK
          </button>
        </div>
      </div>
    );
  }

  onChangeUserName(e) {
    this.setState({
      userName: e.target.value,
    });
  }

  async onEdit() {
    if (this.state.userName === "") {
      alert("名前を入力してください");
    } else {
      patch("/user/edit", {
        id: parseInt(localStorage.getItem("userId")),
        newName: this.state.userName,
      }).then((res) => {
        if (res.ID !== 0) {
          localStorage.setItem("userName", this.state.userName)
          this.props.closePopup();
        } else {
          alert("この名前は使用できません");
          this.props.closePopup();
        }
      });
    }
  }
}

export default Edit;
