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
import NearSearch from "../Customer/Map/NearSearch";

class HomePage extends Component {
  //handleAfterChange = (event, slick, currentSlide) => {};
  constructor(props) {
    super(props);
    this.state = {
      showNearSearch: false,
    };
  }

  handleViewNearSearch = () => {
    this.setState({ showNearSearch: true });
  };

  handleCloseModal = () => {
    this.setState({ showNearSearch: false });
  };
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      // afterChange: this.handleAfterChange,
    };
    const { showNearSearch } = this.state;
    return (
      <div>
        <HomeHeader
          isShowBanner={true}
          onViewNearSearch={this.handleViewNearSearch}
        />

        {showNearSearch && <NearSearch handleClose={this.handleCloseModal} />}
        {/* <HotpotType settings={settings} /> */}
        {/* <Restaurant settings={settings} /> */}
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
