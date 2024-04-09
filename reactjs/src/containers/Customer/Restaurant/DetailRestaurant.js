import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailRestaurant.scss";
import { getDetailInfoRestaurant } from "../../../services/restaurantService";
import RestaurantSchedule from "./RestaurantSchedule";
import RestaurantExtraInfo from "./RestaurantExtraInfo";
import Slider from "react-slick";
class DetailRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailRestaurant: {},
      currentRestaurantId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentRestaurantId: id,
      });
      let res = await getDetailInfoRestaurant(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailRestaurant: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { language } = this.props;
    let { detailRestaurant } = this.state;
    let name = "";
    let hotpotRestaurant = detailRestaurant.hotpotRestaurant;
    name = `${detailRestaurant.name}`;
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="restaurant-detail-container">
          <Slider {...this.props.settings}>
            {hotpotRestaurant &&
              hotpotRestaurant.length > 0 &&
              hotpotRestaurant.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                return (
                  <div
                    className="section-customize restaurant-child"
                    key={index}
                    onClick={() => this.handleViewDetailRestaurant(item)}
                  >
                    <div
                      className="bg-image section-type"
                      style={{
                        backgroundImage: `url(${imageBase64})`,
                      }}
                    />
                    <div className="restaurant-name">{item.name}</div>
                  </div>
                );
              })}
          </Slider>
          {/* <div className="intro-restaurant">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailRestaurant && detailRestaurant.image ? detailRestaurant.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">{name}</div>
              <div className="down">
                {detailRestaurant &&
                  detailRestaurant.Markdown &&
                  detailRestaurant.Markdown.description && (
                    <span>{detailRestaurant.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-Restaurant">
            <div className="content-left">
              <RestaurantSchedule restaurantIdFromParent={this.state.currentRestaurantId} />
            </div>
            <div className="content-right">
              <RestaurantExtraInfo
                restaurantIdFromParent={this.state.currentRestaurantId}
              />
            </div>
          </div>
          <div className="detail-info-restaurant">
            {detailRestaurant &&
              detailRestaurant.Markdown &&
              detailRestaurant.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailRestaurant.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-restaurant"></div> */}
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailRestaurant);
