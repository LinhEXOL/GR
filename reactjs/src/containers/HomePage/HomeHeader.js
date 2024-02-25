import React, { Component } from "react";

import { connect } from "react-redux";
import "./HomeHeader.scss";
import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";
import { getAllTypes } from "../../services/hotpotService";
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataType: [],
      restaurantId: "",
    };
  }
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    //fire redux event(actions)
    //bootstrap (v): áp khởi động thành công
  };

  async componentDidMount() {
    this.props.fetchAllRestaurantNames();
    let res = await getAllTypes();
    if (res && res.errCode === 0) {
      this.setState({
        dataType: res.data,
      });
    }
  }

  handleViewDetailType = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-type/${item.id}`);
    }
  };

  handleViewDetailRestaurant = (id) => {
    this.props.history.push(`/detail-restaurant/${id}`);
  };

  returnHomePage = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allRestaurantNames !== this.props.allRestaurantNames) {
      let arrRestaurantNames = this.props.allRestaurantNames;
      this.setState({
        listRestaurantNames: arrRestaurantNames,
        restaurantId:
          arrRestaurantNames && arrRestaurantNames.length > 0
            ? arrRestaurantNames[0].id
            : "",
      });
    }
    if (prevProps.allTypeNames !== this.props.allTypeNames) {
      let arrTypeNames = this.props.allTypeNames;
      this.setState({
        listTypeNames: arrTypeNames,
        typeId:
          arrTypeNames && arrTypeNames.length > 0 ? arrTypeNames[0].id : "",
      });
    }
  }

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
    this.handleViewDetailRestaurant(event.target.value);
  };

  render() {
    let language = this.props.language;
    let { dataType, restaurantId } = this.state;
    let restaurantNames = this.state.listRestaurantNames;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i class="fas fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => this.returnHomePage()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.type" />
                  </b>
                </div>
                <div className="subtitle">
                  <FormattedMessage id="homeheader.searchhotpotbytype" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.restaurant" />
                  </b>
                </div>
                <div className="subtitle">
                  <FormattedMessage id="homeheader.nearbyrestaurant" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.hotpot" />
                  </b>
                </div>
                <div className="subtitle">
                  <FormattedMessage id="homeheader.favoritehotpot" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.explore" />
                  </b>
                </div>
                <div className="subtitle">
                  <FormattedMessage id="homeheader.history" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="placehotpot">
                <span>Đặt lẩu</span>
              </div>
              <div className="support">
                <i class="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VI
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>

        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            {/* <div class="l-section-video" data-video-disable-width="0">
              <video muted="" loop="" autoplay="" playsinline="" preload="auto">
                <source
                  src="https://qiaolinhotpot.com/wp-content/uploads/2022/06/侨林火锅.mp4"
                  type="video/mp4"
                />
              </video>
            </div> */}

            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                {/* <input type="text" placeholder="tìm lẩu" /> */}
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "restaurantId");
                  }}
                  value={restaurantId}
                >
                  {restaurantNames &&
                    restaurantNames.length > 0 &&
                    restaurantNames.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                {dataType &&
                  dataType.length > 0 &&
                  dataType.slice(0, 5).map((item, index) => {
                    return (
                      <div
                        className="option-child"
                        key={index}
                        onClick={() => this.handleViewDetailType(item)}
                      >
                        <div className="icon-child">
                          <i className="fa fa-heartbeat"></i>
                        </div>
                        <div className="text-child">{item.name}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

//mapStateToProps: map state của redux vào react (Props), redux có thể lấy các biến qua câu lệnh this.props

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allRestaurantNames: state.admin.allRestaurantNames,
  };
};

//fire events của redux
const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    fetchAllRestaurantNames: () => dispatch(actions.fetchAllRestaurantNames()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
//connect:kết nối react với redux
//

/**
 * muốn lưu thông tin vào redux thì phải fire actions của nó
 * muốn lấy thông tin thì dùng hàm map và lấy qua biến props
 */
