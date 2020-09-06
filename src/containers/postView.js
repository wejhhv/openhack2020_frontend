import React from "react";
import "./postView.css";
import Delete from "./delete.js";
import Detail from "./detail.js";
import { get } from "../api/Request.js";
import { convertIDtoContentColor, convertIDtoBorderColor } from "./color.js";

class postView extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup_delete: false,
      showPopup_detail: false,
      comment: "",
      responses: [],
    };
  }

  componentDidMount() {
    this.getComments();
  }

  render() {
    return (
      <>
        <div
          className="post_frame"
          style={{
            background: convertIDtoContentColor(this.props.emotion_id),
            border:
              "2px solid " + convertIDtoBorderColor(this.props.emotion_id),
            borderRadius: "20px",
          }}
        >
          <div
            onClick={() => {
              this.togglePopup_detail();
            }}
            className="post_fill"
          >
            <img
              src={
                `${process.env.PUBLIC_URL}/face/` +
                this.props.emotion_id +
                `.png`
              }
              className="post_emotion"
              alt="emotion"
            ></img>
            <span className="user_name">{this.props.user_name}</span>
          </div>
          {this.props.mine ? (
            <img
              src={`${process.env.PUBLIC_URL}/Button/削除ボタン.png`}
              onClick={() => {
                this.togglePopup_delete();
              }}
              className="post_garbage"
              alt="delete"
            ></img>
          ) : null}
        </div>
        {this.state.showPopup_delete ? (
          <Delete
            closePopup={this.togglePopup_delete.bind(this)}
            comment_id={this.props.comment_id}
          />
        ) : null}
        {this.state.showPopup_detail ? (
          <Detail
            comment={this.state.comment}
            comment_id={this.props.comment_id}
            emotion_id={this.props.emotion_id}
            user_name={this.props.user_name}
            date_time={this.state.comment.DateTime}
            responses={this.state.responses}
            closePopup={this.togglePopup_detail.bind(this)}
            mine={this.props.mine}
          />
        ) : null}
      </>
    );
  }

  async getComments() {
    const myComment = await get("emotion/comments/" + this.props.comment_id);
    this.setState({
      comment: myComment.CommentContent.Comment,
      responses: myComment.Response,
    });
  }

  togglePopup_detail() {
    this.setState({
      showPopup_detail: !this.state.showPopup_detail,
    });
  }

  togglePopup_delete() {
    this.setState({
      showPopup_delete: !this.state.showPopup_delete,
    });
  }
}

export default postView;
