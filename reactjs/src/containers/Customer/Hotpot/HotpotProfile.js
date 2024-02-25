import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HotpotProfile.scss";
import {
  getExtraInfoHotpotById,
  getDetailInfoHotpot,
} from "../../../services/hotpotService";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import localization from "moment/locale/vi";
import { Link } from "react-router-dom";

class HotpotProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInfoHotpot(this.props.hotpotId);
    console.log("this.props.hotpotId:", this.props.hotpotId);
    this.setState({
      dataProfile: data,
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.hotpotId !== prevProps.hotpotId) {
      // this.getInfoHotpot(this.props.hotpotId)
    }
  }

  getInfoHotpot = async (id) => {
    let result = {};
    if (id) {
      let res = await getExtraInfoHotpotById(id);
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
      isShowDescriptionHotpot,
      dataTime,
      isShowLinkDetail,
      isShowPrice,
      hotpotId,
    } = this.props;

    return (
      <div className="profile-hotpot-container">
        <div className="intro-hotpot">
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
              {/* <div>{dataProfile.Restaurant?.name}</div>
              <div>{dataProfile.Restaurant?.address}</div> */}
              {isShowDescriptionHotpot === true ? (
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
          <div className="view-detail-hotpot">
            {/* <a href={`/detail-hotpot/${hotpotId}`}>Xem them</a> */}
            <Link to={`/detail-hotpot/${hotpotId}`}>Xem them</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(HotpotProfile);
