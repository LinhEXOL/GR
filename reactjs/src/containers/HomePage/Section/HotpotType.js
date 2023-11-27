import React, { Component } from "react";

import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class HotpotType extends Component {
  render() {
    return (
      <div className="section-share section-type">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Các loại lẩu</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-type" />
                <div>Lẩu buffet 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-type" />
                <div>Lẩu buffet 2</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-type" />
                <div>Lẩu buffet 3</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-type" />
                <div>Lẩu buffet 4</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-type" />
                <div>Lẩu buffet 5</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-type" />
                <div>Lẩu buffet 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HotpotType);
//connect:kết nối react với redux
//

/**
 * muốn lưu thông tin vào redux thì phải fire actions của nó
 * muốn lấy thông tin thì dùng hàm map và lấy qua biến props
 */
