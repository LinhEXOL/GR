import React, { Component } from "react";
import { connect } from "react-redux";
import "./HotpotRestaurantExtraInfo.scss";
import Select from "react-select";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import {
  getExtraInfoRestaurantById,
  getDetailInfoRestaurant,
} from "../../../services/restaurantService";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";

class HotpotRestaurantExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: false,
      extraInfo: {},
    };
  }

  async componentDidMount() {
    if (this.props.restaurantIdFromParent) {
      let res = await getExtraInfoRestaurantById(
        this.props.restaurantIdFromParent
      );
      console.log(
        "this.props.restaurantIdFromParent extra",
        this.props.restaurantIdFromParent
      );
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.restaurantIdFromParent !== prevProps.restaurantIdFromParent
    ) {
      let res = await getExtraInfoRestaurantById(
        this.props.RestaurantIdFromParent
      );
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
      <div className="Restaurant-extra-info-container">
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
              <FormattedMessage id="customer.extra-info-Restaurant.price" />{" "}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotpotRestaurantExtraInfo);
