import React, { Component } from "react";

import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import "./HomePage.scss";
// Import css files
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import HotpotType from "./Section/HotpotType";
import Restaurant from "./Section/Restaurant";
import Hotpot from "./Section/Hotpot";
import HandBook from "./Section/HandBook";
import Video from "./Section/Video";
import HomeFooter from "./HomeFooter";

class HomePage extends Component {
  //handleAfterChange = (event, slick, currentSlide) => {};
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      // afterChange: this.handleAfterChange,
    };
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <HotpotType settings={settings} />
        <Restaurant settings={settings} />
        <Hotpot settings={settings} />
        {/* <HandBook settings={settings} /> */}
        <Video />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
