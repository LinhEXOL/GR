import React, { Component } from "react";
import { connect } from "react-redux";
import "./RestaurantExtraInfo.scss";
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

class RestaurantExtraInfo extends Component {
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
        this.props.restaurantIdFromParent
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
    let { language } = this.props;
    return (
      <div className="restaurant-extra-info-container">
        <div className="content-up">
          <div className="text-address">
            {" "}
            <FormattedMessage id="customer.extra-info-restaurant.text-address" />
          </div>
          <div className="name-restaurant">
            {extraInfo && extraInfo.Restaurant ? extraInfo.Restaurant.name : ""}
          </div>
          <div className="address-restaurant">
            {extraInfo && extraInfo.Restaurant
              ? extraInfo.Restaurant.address
              : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfo === false && (
            <div className="short-info">
              <span className="price">
                <FormattedMessage id="customer.extra-info-restaurant.price" />{" "}
              </span>

              <span
                className="detail"
                onClick={() => this.showHideDetailInfo(true)}
              >
                {" "}
                <FormattedMessage id="customer.extra-info-restaurant.detail" />
              </span>
            </div>
          )}
          {isShowDetailInfo === true && (
            <>
              <div className="title-price">
                <FormattedMessage id="customer.extra-info-restaurant.price" />
              </div>
              <div className="detail-info">
                <div className="price">
                  <span className="left">
                    <FormattedMessage id="customer.extra-info-restaurant.price" />
                  </span>
                  <span className="right"> </span>
                </div>
                <div className="note">
                  {extraInfo && extraInfo.note ? extraInfo.note : ""}
                </div>
              </div>

              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfo(false)}>
                  <FormattedMessage id="customer.extra-info-restaurant.hide-price" />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantExtraInfo);
