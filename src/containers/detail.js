import React from "react";
import "./detail.css";
import Response from "./responseView.js";
import { post } from "../api/Request";
import { convertIDtoContentColor, convertIDtoBorderColor } from "./color.js";

class detail extends React.Component {
  constructor() {
    super();
    this.state = {
      response: "",
    };
  }
  render() {
    const responses =
      this.props.responses.length !== 0
        ? this.props.responses.map((response) => {
            return (
              <Response
                user_name={response.UserName}
                response={response.Comment}
                date_time={response.DateTime}
              />
            );
          })
        : null;
    return (
      <div className="popup">
        <div className="detail_area">
          <div
            className="detail_post_frame"
            style={{
              background: convertIDtoContentColor(this.props.emotion_id),
              border:
                "2px solid " + convertIDtoBorderColor(this.props.emotion_id),
              borderRadius: "20px",
            }}
          >
            <img
              src={
                `${process.env.PUBLIC_URL}/face/` +
                this.props.emotion_id +
                `.png`
              }
              className="detail_post_emotion"
              alt="emotion"
            ></img>
            <div className="detail_post_name">{this.props.user_name}</div>
            <div className="detail_post_time">{this.props.date_time}</div>
            <div className="detail_post_line"></div>
            <div className="detail_post_comment">{this.props.comment}</div>
          </div>
          <>
            <input
              value={this.state.response}
              type="text"
              onChange={this.onChangeResponse.bind(this)}
              className="detail_response_area"
              maxLength="100"
              placeholder="response…"
            ></input>
            <img
              src={`${process.env.PUBLIC_URL}/Button/返信送信ボタン.png`}
              onClick={this.onSend.bind(this)}
              className="detail_send_button"
              alt="返信送信"
            ></img>
          </>
          <div className="responses_area">{responses}</div>
          <img
            src={`${process.env.PUBLIC_URL}/Button/戻るボタン.png`}
            onClick={this.props.closePopup}
            className="detail_back_button"
            alt="戻る"
          ></img>
        </div>
      </div>
    );
  }

  onChangeResponse(e) {
    this.setState({
      response: e.target.value,
    });
  }

  async onSend() {
    if (this.state.response === "") {
      alert("返信内容を入力してください");
    } else {
      post("/comment/response/register", {
        user_id: parseInt(localStorage.getItem("userId")),
        comment_id: this.props.comment_id,
        comment: this.state.response,
      }).then((res) => {
        if (res.ID !== 0) {
          this.props.closePopup();
        } else {
          alert("コメント返信に失敗しました");
          this.props.closePopup();
        }
      });
    }
  }
}

export default detail;
