import React, { Component } from "react";
import { connect } from "react-redux";
import "./HotpotExtraInfo.scss";
import Select from "react-select";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleHotpotByDate } from "../../../services/hotpotService";
import { FormattedMessage } from "react-intl";

class HotpotExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: false,
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: status,
    });
  };

  render() {
    let { isShowDetailInfo } = this.state;
    return (
      <div className="hotpot-extra-info-container">
        <div className="content-up">
          <div className="text-address"> dia chi nha hang</div>
          <div className="name-restaurant">Nha hang lau Tu Xuyen</div>
          <div className="address-restaurant">10 tran dai nghia</div>
        </div>
        <div className="content-down">
          {isShowDetailInfo === false && (
            <div className="short-info">
              GIA MON LAU: 250.000d.{" "}
              <span onClick={() => this.showHideDetailInfo(true)}>
                Xem chi tiet
              </span>
            </div>
          )}
          {isShowDetailInfo === true && (
            <>
              <div className="title-price">GIA MON MAU</div>
              <div className="detail-info">
                <div className="price">
                  <span className="left">GIA MON LAU</span>
                  <span className="right"> 100 000</span>
                </div>
                <div className="note">Free voi tre em duoi 1m</div>
              </div>

              <div className="payment">Thanh toan bang the or tien mat</div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfo(false)}>
                  An bang gia
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HotpotExtraInfo);
