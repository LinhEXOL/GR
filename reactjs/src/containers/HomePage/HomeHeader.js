import React, { Component } from "react";

import { connect } from "react-redux";
import "./HomeHeader.scss";
import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";
import { getAllTypes } from "../../services/restaurantService";
import { Link } from "react-router-dom";
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataType: [],
      isClicked: false,
    };
  }
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    //fire redux event(actions)
    //bootstrap (v): áp khởi động thành công
  };

  async componentDidMount() {
    let res = await getAllTypes();
    if (res && res.errCode === 0) {
      this.setState({
        dataType: res.data,
      });
    }
    if (window.location.hash === "#video-section") {
      // Lấy phần tử Video bằng id
      const videoElement = document.getElementById("video-section");
      // Nếu phần tử tồn tại, cuộn đến nó sau một khoảng thời gian trễ
      if (videoElement) {
        setTimeout(() => {
          videoElement.scrollIntoView({ behavior: "smooth" });
        }, 1000);
      }
    }
  }

  handleClick = (sectionId) => {
    // Khi nút được click, cập nhật trạng thái để màu sắc của văn bản được thay đổi
    this.setState({ isClicked: true });

    // Sau đó, cuộn đến phần tử có id là "video-section"
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  handleViewMap = () => {
    if (this.props.history) {
      //this.props.history.push(`/detail-type`);
      this.props.history.push("/view-map");
    }
  };

  returnHomePage = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
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
  };

  render() {
    let language = this.props.language;
    let { dataType, isClicked } = this.state;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              {/* <i class="fas fa-bars"></i> */}
              <div
                className="header-logo"
                onClick={() => this.returnHomePage()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    {/* <FormattedMessage id="homeheader.type" /> */}
                    <Link
                      to="/home#home-section"
                      onClick={() => this.handleClick("home-section")}
                    >
                      Home
                    </Link>
                  </b>
                </div>
                {/* <div className="subtitle">
                  <FormattedMessage id="homeheader.searchrestaurantbytype" />
                </div> */}
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {/* <FormattedMessage id="homeheader.restaurant" /> */}
                    <Link
                      to="/home#restaurant-section"
                      onClick={() => this.handleClick("restaurant-section")}
                    >
                      Restaurant
                    </Link>
                  </b>
                </div>
                {/* <div className="subtitle">
                  <FormattedMessage id="homeheader.nearbyrestaurant" />
                </div> */}
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {/* Sử dụng một phần tử khác thay vì <a>, chẳng hạn <button> */}
                    <Link
                      to="/home#about-us"
                      onClick={() => this.handleClick("about-us")}
                    >
                      About Us
                    </Link>
                  </b>
                </div>
                {/* <div className="subtitle">
                  <FormattedMessage id="homeheader.favoriterestaurant" />
                </div> */}
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {/* <FormattedMessage id="homeheader.explore" /> */}

                    <Link
                      to="/home#video-section"
                      onClick={() => this.handleClick("video-section")}
                    >
                      Tin tức & Blog
                    </Link>
                  </b>
                </div>
                {/* <div className="subtitle">
                  <FormattedMessage id="homeheader.history" />
                </div> */}
              </div>
              <div
                className="child-content"
                onClick={() => this.handleViewMap()}
              >
                <div>
                  <b>
                    {/* <FormattedMessage id="homeheader.explore" /> */}
                    Gần bạn
                  </b>
                </div>
                {/* <div className="subtitle">
                  <FormattedMessage id="homeheader.history" />
                </div> */}
              </div>

              {/* <div
                className="child-content"
                onClick={this.props.onViewNearSearch}
              >
                <div>
                  <b>NearYou</b>
                </div>
              </div> */}
            </div>
            <div className="right-content">
              <div className="placerestaurant">
                <Link
                  to="/home#restaurant-section"
                  onClick={() => this.handleClick("restaurant-section")}
                >
                  Đặt ngay!
                </Link>
              </div>
              {/* <div className="support">
                <i class="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div> */}
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
          <div id="home-section" className="home-header-banner">
            {/* <div class="section-video" data-video-disable-width="0">
              <video muted="" loop="" autoplay="" playsinline="" preload="auto">
                <source
                  src="https://qiaolindish.com/wp-content/uploads/2022/06/侨林火锅.mp4"
                  type="video/mp4"
                />
              </video>
            </div> */}
            {/* <video autoplay muted loop id="video-bg">
              <source src="../../assets/images/V1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}

            <div className="content-up">
              {/* <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div> */}

              <div className="page-wrapper">
                <div className="content-wrapper">
                  <div className="heading-wrapper">
                    <div className="left">
                      <div className="heading-text">Taste the magic of</div>
                      <div className="title-wrapper">Flavorful Dish</div>
                    </div>

                    <div className="image-wrapper">
                      <img
                        src="https://qiaolinhotpot.com/wp-content/uploads/2022/06/Vector-1.png"
                        alt=""
                        className="banner-image"
                      />
                    </div>
                  </div>

                  <div className="description-wrapper">
                    <p>Delight in dish's exquisite perfection</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                {/* {dataType &&
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
                  })} */}
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
  };
};

//fire events của redux
const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
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
