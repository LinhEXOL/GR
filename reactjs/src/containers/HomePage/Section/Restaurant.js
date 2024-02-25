import React, { Component } from "react";
import "./Restaurant.scss";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllRestaurants } from "../../../services/hotpotService";
import { withRouter } from "react-router";
class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRestaurant: [],
    };
  }

  async componentDidMount() {
    let res = await getAllRestaurants();
    if (res && res.errCode === 0) {
      this.setState({
        dataRestaurant: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailRestaurant = (item) => {
    this.props.history.push(`/detail-restaurant/${item.id}`);
  };

  render() {
    let { dataRestaurant } = this.state;
    return (
      <div className="section-share section-restaurant">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.outstanding-restaurant" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataRestaurant &&
                dataRestaurant.length > 0 &&
                dataRestaurant.map((item, index) => {
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
          </div>
        </div>
      </div>
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
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Restaurant)
);
//connect:kết nối react với redux
//

/**
 * muốn lưu thông tin vào redux thì phải fire actions của nó
 * muốn lấy thông tin thì dùng hàm map và lấy qua biến props
 */
