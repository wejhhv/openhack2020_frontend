import React from "react";
import "./home.css";
import styled from "styled-components";
import AddPage from "./add.js";
import MyProfile from "./myprofile.js";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  render() {
    const HomeArea = styled.div`
      width: 375px;
      height: 812px;
    `;
    return (
      <HomeArea>
        <div className="title_back">
          <div className="title_area">
            <div className="title_text">emore</div>
          </div>
        </div>
        <MyProfile />
        <div className="under_back">
          <div className="under_back_rectangle">
            <div className="under_back_ellipse"></div>
            <Link to="/home">
              <img
                src={`${process.env.PUBLIC_URL}/Button/家のアイコン素材_白.png`}
                className="home_button"
                alt="home"
              ></img>
            </Link>
            <Link to="/profile">
              <img
                src={`${process.env.PUBLIC_URL}/Button/横顔アイコン_グレー.png`}
                className="profile_button"
                alt="profile"
              ></img>
            </Link>
          </div>
        </div>
        <AddPage />
      </HomeArea>
    );
  }
}

export default Profile;
