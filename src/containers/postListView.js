import React from "react";
import Post from "./postView.js";
import "./postListView.css";

class postListView extends React.Component {
  render() {
    return (
      <div className="postList_area">
        {this.props.comments.map((comment) => {
          return (
            <Post
              key={comment.ID}
              comment_id={comment.ID}
              //感情
              emotion_id={comment.EmotionID}
              //投稿者の名前
              user_name={comment.UserName}
              //自分の投稿か否か(削除ボタンの表示判断)
              mine={comment.UserName === localStorage.getItem("userName")}
            />
          );
        })}
      </div>
    );
  }
}

export default postListView;
