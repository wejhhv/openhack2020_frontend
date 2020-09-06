import React from "react";
import "./add.css";
import { post } from "../api/Request";

class Popup extends React.Component {
  constructor() {
    super();
    this.state = {
      isChoice: false,
      selectedEmotionId: null,
      comment: "",
      lat: null,
      lng: null,
    };
  }

  componentDidMount() {
    //位置情報取得
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="item_emotion">emotion</div>
          <div className="line_emotion"></div>
          <div className="emotions_button">
            <div className="joy_back"></div>
            <img
              src={`${process.env.PUBLIC_URL}/face/0.png`}
              className="j1_button"
              onClick={this.onChoice.bind(this, "0")}
              alt="喜"
            ></img>
            <img
              src={`${process.env.PUBLIC_URL}/face/1.png`}
              className="j2_button"
              onClick={this.onChoice.bind(this, "1")}
              alt="喜"
            ></img>
            <img
              src={`${process.env.PUBLIC_URL}/face/2.png`}
              className="j3_button"
              onClick={this.onChoice.bind(this, "2")}
              alt="喜"
            ></img>
            <div className="angry_back"></div>
            <img
              src={`${process.env.PUBLIC_URL}/face/3.png`}
              className="a1_button"
              onClick={this.onChoice.bind(this, "3")}
              alt="怒"
            ></img>
            <img
              src={`${process.env.PUBLIC_URL}/face/4.png`}
              className="a2_button"
              onClick={this.onChoice.bind(this, "4")}
              alt="怒"
            ></img>
            <img
              src={`${process.env.PUBLIC_URL}/face/5.png`}
              className="a3_button"
              onClick={this.onChoice.bind(this, "5")}
              alt="怒"
            ></img>
            <div className="sad_back"></div>
            <img
              src={`${process.env.PUBLIC_URL}/face/6.png`}
              className="s1_button"
              onClick={this.onChoice.bind(this, "6")}
              alt="哀"
            ></img>
            <img
              src={`${process.env.PUBLIC_URL}/face/7.png`}
              className="s2_button"
              onClick={this.onChoice.bind(this, "7")}
              alt="哀"
            ></img>
            <img
              src={`${process.env.PUBLIC_URL}/face/8.png`}
              className="s3_button"
              onClick={this.onChoice.bind(this, "8")}
              alt="哀"
            ></img>
            <div className="happy_back"></div>
            <img
              src={`${process.env.PUBLIC_URL}/face/9.png`}
              className="h1_button"
              onClick={this.onChoice.bind(this, "9")}
              alt="楽"
            ></img>
            <img
              src={`${process.env.PUBLIC_URL}/face/10.png`}
              className="h2_button"
              onClick={this.onChoice.bind(this, "10")}
              alt="楽"
            ></img>
            <img
              src={`${process.env.PUBLIC_URL}/face/11.png`}
              className="h3_button"
              onClick={this.onChoice.bind(this, "11")}
              alt="楽"
            ></img>
          </div>
          <div className="item_youremotion">your emotion</div>
          <div className="line_youremotion"></div>
          {this.state.isChoice ? (
            <img
              src={
                `${process.env.PUBLIC_URL}/face/` +
                this.state.selectedEmotionId +
                `.png`
              }
              className="choice_emotion"
              alt="your emotion"
            ></img>
          ) : null}
          <div className="item_comment">comment</div>
          <div className="line_comment"></div>
          <textarea
            name="comment"
            type="text"
            className="comment_area"
            maxLength="100"
            value={this.state.comment}
            onChange={this.onChangeComment.bind(this)}
          ></textarea>
          <img
            src={`${process.env.PUBLIC_URL}/Button/戻るボタン.png`}
            onClick={this.props.closePopup}
            className="back_button"
            alt="戻る"
          ></img>
          <button
            className="add_button"
            onClick={this.onClickAddButton.bind(this)}
          >
            add
          </button>
        </div>
      </div>
    );
  }

  onChoice(emotionId) {
    this.setState({ isChoice: true, selectedEmotionId: emotionId });
  }

  onChangeComment(e) {
    this.setState({ comment: e.target.value });
  }

  async onClickAddButton() {
    if (this.state.selectedEmotionId === null) {
      alert("感情を選択してください");
    } else {
      const prefecture = await this.getPrefecture();
      const body = {
        user_id: parseInt(localStorage.getItem("userId")),
        emotion_id: parseInt(this.state.selectedEmotionId),
        comment: this.state.comment,
        latitude: 0,
        longtitude: 0,
        prefecture: prefecture,
      };
      post("/comment/register", body).then((res) => {
        if (res.hasSuccess) {
          alert("感情を登録しました！");
          this.props.closePopup();
          //画面リロードの処理が必要！
        } else {
          alert("感情を登録できませんでした");
        }
      });
    }
  }

  getPrefecture() {
    const param = "lat=" + this.state.lat + "&lon=" + this.state.lng + "&json";
    const url = "https://aginfo.cgk.affrc.go.jp/ws/rgeocode.php?" + param;
    const axios = require("axios");
    return axios
      .get(url)
      .then((res) => {
        const placeData = res.data.result;
        const prefectureKanji = placeData.prefecture.pname;
        return this.convertKanjiToAlphabet(prefectureKanji);
      })
      .catch((err) => {
        console.log("通信エラー: ", err);
      });
  }

  convertKanjiToAlphabet(prefecture) {
    const Kanji = [
      "北海道",
      "青森県",
      "岩手県",
      "宮城県",
      "秋田県",
      "山形県",
      "福島県",
      "茨城県",
      "栃木県",
      "群馬県",
      "埼玉県",
      "千葉県",
      "東京都",
      "神奈川県",
      "新潟県",
      "山梨県",
      "長野県",
      "富山県",
      "石川県",
      "福井県",
      "岐阜県",
      "静岡県",
      "愛知県",
      "三重県",
      "滋賀県",
      "京都府",
      "大阪府",
      "兵庫県",
      "奈良県",
      "和歌山県",
      "鳥取県",
      "島根県",
      "岡山県",
      "広島県",
      "山口県",
      "徳島県",
      "香川県",
      "愛媛県",
      "高知県",
      "福岡県",
      "佐賀県",
      "長崎県",
      "熊本県",
      "大分県",
      "宮崎県",
      "鹿児島県",
      "沖縄県",
      "",
    ];
    const Alphabet = [
      "HOKKAIDO",
      "AOMORI",
      "IWATE",
      "MIYAGI",
      "AKITA",
      "YAMAGATA",
      "FUKUSHIMA",
      "IBARAKI",
      "TOCHIGI",
      "GUNMA",
      "SAITAMA",
      "CHIBA",
      "TOKYO",
      "KANAGAWA",
      "NIIGATA",
      "YAMANASHI",
      "NAGANO",
      "TOYAMA",
      "ISHIKAWA",
      "FUKUI",
      "GIFU",
      "SHIZUOKA",
      "AICHI",
      "MIE",
      "SHIGA",
      "KYOTO",
      "OSAKA",
      "HYOGO",
      "NARA",
      "WAKAYAMA",
      "TOTTORI",
      "SHIMANE",
      "OAKAYAMA",
      "HIROSHIMA",
      "YAMAGUCHI",
      "TOKUSHIMA",
      "KAGAWA",
      "EHIME",
      "KOCHI",
      "FUKUOKA",
      "SAGA",
      "NAGASAKI",
      "KUMAMOTO",
      "OITA",
      "MIYAZAKI",
      "KAGOSHIMA",
      "OKINAWA",
      "ERROR",
    ];
    let ElementNumber = 47;
    //都道府県の要素番号を取得
    //当てはまる要素が存在しないときは-1を返す
    ElementNumber = Kanji.indexOf(prefecture);
    //都道府県以外である時の処理
    if (ElementNumber === -1) {
      ElementNumber = 47;
    }
    return Alphabet[ElementNumber];
  }
}

class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  render() {
    return (
      <div>
        <a onClick={this.togglePopup.bind(this)} className="plus_button_area">
          <img
            src={`${process.env.PUBLIC_URL}/Button/+.png`}
            className="plus_button_icon"
            alt="add"
          ></img>
        </a>
        {this.state.showPopup ? (
          <Popup text="" closePopup={this.togglePopup.bind(this)} />
        ) : null}
      </div>
    );
  }
}

export default Add;
