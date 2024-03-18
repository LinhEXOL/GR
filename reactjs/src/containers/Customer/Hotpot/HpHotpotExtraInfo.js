import React, { Component } from "react";
import { connect } from "react-redux";
import "./HpHotpotExtraInfo.scss";
import Select from "react-select";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import {
  getExtraInfoHotpotById,
  getDetailInfoHotpot,
} from "../../../services/hotpotService";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";

class HpHotpotExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: false,
      extraInfo: {},
    };
  }

  async componentDidMount() {
    if (this.props.hotpotIdFromParent) {
      let res = await getExtraInfoHotpotById(this.props.hotpotIdFromParent);
      console.log(
        "this.props.hotpotIdFromParent extra",
        this.props.hotpotIdFromParent
      );
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.hotpotIdFromParent !== prevProps.hotpotIdFromParent) {
      let res = await getExtraInfoHotpotById(this.props.hotpotIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }

  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: status,
    });
  };

  render() {
    let { isShowDetailInfo, extraInfo } = this.state;
    console.log(" extraInfo", extraInfo);
    let { language } = this.props;
    return (
      <div className="hotpot-extra-info-container">
        <div className="content-up">
          <div className="address-restaurant">
            <i class="fas fa-map-marker-alt"> </i>

            {extraInfo && extraInfo.note ? extraInfo.note : ""}
          </div>
          <div className="type">
            Loại hình: {extraInfo && extraInfo.Type ? extraInfo.Type.name : ""}
          </div>
          <div className="short-info">
            <span className="price">
              <FormattedMessage id="customer.extra-info-hotpot.price" />{" "}
            </span>

            {extraInfo && extraInfo.priceData && language === LANGUAGES.VI && (
              // <NumberFormat
              //   className="currency"
              //   value={extraInfo.priceData.valueVi}
              //   displayType={"text"}
              //   thousandSeparator={true}
              //   suffix={"VND"}
              // />
              <dev>
                {extraInfo.priceData.valueVi} <span> VND </span>
              </dev>
            )}

            {extraInfo && extraInfo.priceData && language === LANGUAGES.EN && (
              // <NumberFormat
              //   className="currency"
              //   value={extraInfo.priceData.valueEn}
              //   displayType={"text"}
              //   thousandSeparator={true}
              //   suffix={"$"}
              // />
              <dev>
                {extraInfo.priceData.valueEn} <span> $ </span>
              </dev>
            )}
          </div>
        </div>
        <div className="content-down"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HpHotpotExtraInfo);
