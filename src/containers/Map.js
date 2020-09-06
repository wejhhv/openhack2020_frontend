import React from "react";
import { ReactComponent as MapContent } from "../map.svg";
import styled from "styled-components";
import { get } from "../api/Request";
import "./postListViewPopup.css";
import PostListView from "./postListView";

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: null,
      lng: null,
      colors: [],
      comments: [],
      showPopup: false,
    };
  }
  componentDidMount() {
    get("/emotion/prefectures").then((res) => {
      this.setState({
        colors: res,
      });
      this.setColorsAndEvent();
    });
  }
  render() {
    const MapArea = styled.div`
      position: absolute;
      top: 110px;
      left: 0%;
    `;
    return (
      <div>
        <MapArea>
          <MapContent id="MapStyle" width="600px" height="600px"  />
        </MapArea>
        {this.state.showPopup ? (
          <Popup
            closePopup={this.togglePopup.bind(this)}
            comments={this.state.comments}
          />
        ) : null}
      </div>
    );
  }

  async setColorsAndEvent() {
    this.state.colors.map((color) => {
      let element = document
        .getElementById("MapStyle")
        .getElementById(color.Prefecture);
      //色塗り
      element.setAttribute("fill", color.Color);
      //イベント処理
      element.addEventListener(
        "click",
        async () => {
          await get("/emotion/" + color.Prefecture + "/comments").then(
            (res) => {
              this.setState({
                comments: res,
              });
              console.log(this.state.comments);
            }
          );
          this.togglePopup();
        },
        false
      );
    });
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
}

class Popup extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="popup_from_map">
        <div className="popup_inner_from_map">
          <div className="post_list_container">
            <PostListView comments={this.props.comments} />
          </div>
          <div className="buttons_area">
            <img
              src={`${process.env.PUBLIC_URL}/Button/戻るボタン.png`}
              onClick={this.props.closePopup}
              className="back_button_left"
              alt="戻る"
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
