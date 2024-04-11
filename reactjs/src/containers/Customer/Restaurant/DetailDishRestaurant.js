import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDishRestaurant.scss";
import { getDetailInfoRestaurant } from "../../../services/restaurantService";
import RestaurantSchedule from "./RestaurantSchedule";
import DishRestaurantExtraInfo from "./DishRestaurantExtraInfo";
import Slider from "react-slick";
class DetailDishRestaurant extends Component {
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
    console.log("detailrestaurant", detailRestaurant);
    let name = "";
    let dishRestaurant = detailRestaurant.dishRestaurant;
    name = `${detailRestaurant.name}`;
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="restaurant-container">
          <div className="detail-restaurant">
            <Slider
              {...this.props.settings}
              autoplay={true}
              autoplaySpeed={3000}
            >
              {dishRestaurant &&
                dishRestaurant.length > 0 &&
                dishRestaurant.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailRestaurant(item)}
                    >
                      <div
                        className="bg-image"
                        style={{
                          backgroundImage: `url(${imageBase64})`,
                        }}
                      />
                    </div>
                  );
                })}
            </Slider>
            <div className="content">
              <div className="name-restaurant">{name}</div>
              <DishRestaurantExtraInfo
                restaurantIdFromParent={this.state.currentRestaurantId}
              />
              {detailRestaurant &&
                detailRestaurant.Markdown &&
                detailRestaurant.Markdown.description && (
                  <span className="des">
                    {detailRestaurant.Markdown.description}
                  </span>
                )}
              <div className="list">
                <div> Ưu đãi</div>
                <div> Giới thiệu</div>
                <div> Bảng giá</div>
                <div> Địa chỉ</div>
                <div> Bình luận</div>
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
          </div>
          <div className="schedule-restaurant">
            <div className="book-restaurant">Đặt chỗ</div>
            <RestaurantSchedule
              restaurantIdFromParent={this.state.currentRestaurantId}
            />
          </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailDishRestaurant);
