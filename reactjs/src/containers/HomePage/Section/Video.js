import React, { Component } from "react";

import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class Video extends Component {
  render() {
    return (
      <div className="section-share section-video">
        <div className="section-video-header">Khám phá</div>
        <div className="section-video-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/zXAqw0Vzr4w"
              title="Nothing you can’t solve with a traditional Sichuan hot pot这世界上没有什么事情是一顿地道老四川火锅解决不了的|Liziqi channel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              It's so cold outside, let's place a traditional Sichuan hot pot at
              our website! The boiling red soup brings all the trouble away, it
              warms your heart and stomach. There's nothing you can't solve with
              our Sichuan hot pot!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

//mapStateToProps: map state của redux vào react (Props), redux có thể lấy các biến qua câu lệnh this.props

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

//fire events của redux
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
//connect:kết nối react với redux
//

/**
 * muốn lưu thông tin vào redux thì phải fire actions của nó
 * muốn lấy thông tin thì dùng hàm map và lấy qua biến props
 */
