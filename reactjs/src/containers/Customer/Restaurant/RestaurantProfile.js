import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./RestaurantProfile.scss";
import {
  getExtraInfoRestaurantById,
  getDetailInfoRestaurant,
} from "../../../services/restaurantService";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import localization from "moment/locale/vi";
import { Link } from "react-router-dom";

class RestaurantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInfoRestaurant(this.props.restaurantId);
    console.log("this.props.restaurantId:", this.props.restaurantId);
    this.setState({
      dataProfile: data,
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.restaurantId !== prevProps.restaurantId) {
      // this.getInforestaurant(this.props.restaurantId)
    }
  }

  getInfoRestaurant = async (id) => {
    let result = {};
    if (id) {
      let res = await getExtraInfoRestaurantById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData?.valueVi
          : dataTime.timeTypeData?.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>
            <FormattedMessage id="customer.booking-modal.free-booking" />
          </div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let { dataProfile } = this.state;
    let {
      language,
      isShowDescriptionRestaurant,
      dataTime,
      isShowLinkDetail,
      isShowPrice,
      restaurantId,
    } = this.props;

    return (
      <div className="profile-restaurant-container">
        <div className="intro-restaurant">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">{dataProfile.name}</div>
            <div className="down">
              {isShowDescriptionRestaurant === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>

        {isShowLinkDetail === true && (
          <div className="view-detail-restaurant">
            {/* <a href={`/detail-restaurant/${restaurantId}`}>Xem them</a> */}
            <Link to={`/detail-restaurant/${restaurantId}`}>Xem them</Link>
          </div>
        )}

        {isShowPrice === true && (
          <div className="price">
            <FormattedMessage id="customer.booking-modal.price" />
            {dataProfile &&
            dataProfile.priceData &&
            language === LANGUAGES.VI ? (
              <NumberFormat
                className="currency"
                value={dataProfile.priceData?.valueVi}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"VND"}
              />
            ) : (
              <NumberFormat
                className="currency"
                value={dataProfile.priceData?.valueEn}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"$"}
              />
            )}
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantProfile);
