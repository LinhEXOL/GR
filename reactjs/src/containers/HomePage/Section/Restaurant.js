import React, { Component } from "react";

import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class Restaurant extends Component {
  render() {
    return (
      <div className="section-share section-restaurant">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Các nhà hàng nổi bật</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-restaurant" />
                <div>Nhà hàng 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-restaurant" />
                <div>Nhà hàng 2</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-restaurant" />
                <div>Nhà hàng 3</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-restaurant" />
                <div>Nhà hàng 4</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-restaurant" />
                <div>Nhà hàng 5</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-restaurant" />
                <div>Nhà hàng 6</div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
//connect:kết nối react với redux
//

/**
 * muốn lưu thông tin vào redux thì phải fire actions của nó
 * muốn lấy thông tin thì dùng hàm map và lấy qua biến props
 */
