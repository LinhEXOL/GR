import React, { Component } from "react";
import "./RestaurantType.scss";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllTypes } from "../../../services/restaurantService";
import { withRouter } from "react-router";
class RestaurantType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataType: [],
    };
  }

  async componentDidMount() {
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
  render() {
    let { dataType } = this.state;
    return (
      <div className="section-share section-type">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.type-popular" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataType &&
                dataType.length > 0 &&
                dataType.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div
                      className="section-customize type-child"
                      key={index}
                      onClick={() => this.handleViewDetailType(item)}
                    >
                      <div
                        className="bg-image section-type"
                        style={{
                          backgroundImage: `url(${imageBase64})`,
                        }}
                      />
                      <div className="type-name">{item.name}</div>
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
  connect(mapStateToProps, mapDispatchToProps)(RestaurantType)
);
//connect:kết nối react với redux
//

/**
 * muốn lưu thông tin vào redux thì phải fire actions của nó
 * muốn lấy thông tin thì dùng hàm map và lấy qua biến props
 */
