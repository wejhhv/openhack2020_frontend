import React from "react";
import "./home.css";
import "./signUp.css";
import { post } from "../api/Request";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
  }

  render() {
    if (localStorage.getItem("userId") != null) {
      this.props.history.push("/home");
    }
    return (
      <div>
        <div className="title_back">
          <div className="title_area"></div>
          <div className="title_text">title</div>
        </div>
        <div className="under_back">
          <div className="under_back_rectangle"></div>
          <div className="under_back_ellipse"></div>
        </div>
        <div className="signup_back">
          <div className="signup_area">
            <div className="signup_flame">
              <img
                src={`${process.env.PUBLIC_URL}/Button/人物アイコン.png`}
                className="signupman_icon"
                alt="sign up"
              ></img>
              <div className="signup_title">sign up</div>
            </div>
            <input
              value={this.state.userName}
              type="text"
              onChange={this.onChengeUserName.bind(this)}
              placeholder="your name"
              className="signup_form"
            ></input>
            <button className="OK_button" onClick={this.onSignUp.bind(this)}>
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }

  onChengeUserName(e) {
    this.setState({
      userName: e.target.value,
    });
  }

  async onSignUp() {
    if (this.state.userName === "") {
      alert("名前を入力してください");
    } else {
      post("/user/register", { name: this.state.userName }).then((res) => {
        if (res.ID !== 0) {
          localStorage.setItem("userId", res.ID);
          localStorage.setItem("userName", res.Name);
          this.props.history.push("/home");
        } else {
          alert("この名前は使用できません");
        }
      });
    }
  }
}

export default SignUp;
