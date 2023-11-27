import React, { Component } from "react";

import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class Hotpot extends Component {
  render() {
    return (
      <div className="section-share section-hotpot">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Lẩu hot tuần qua</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-hotpot" />
                  </div>
                  <div className="position text-center">
                    <div>Lẩu 1</div>
                    <div>Lẩu buffet</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-hotpot" />
                  </div>
                  <div className="position text-center">
                    <div>Lẩu 2</div>
                    <div>Lẩu buffet</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-hotpot" />
                  </div>
                  <div className="position text-center">
                    <div>Lẩu 3</div>
                    <div>Lẩu buffet</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-hotpot" />
                  </div>
                  <div className="position text-center">
                    <div>Lẩu 4</div>
                    <div>Lẩu buffet</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-hotpot" />
                  </div>
                  <div className="position text-center">
                    <div>Lẩu 5</div>
                    <div>Lẩu buffet</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="outer-bg">
                    <div className="bg-image section-hotpot" />
                  </div>
                  <div className="position text-center">
                    <div>Lẩu 6</div>
                    <div>Lẩu buffet</div>
                  </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Hotpot);
//connect:kết nối react với redux
//

/**
 * muốn lưu thông tin vào redux thì phải fire actions của nó
 * muốn lấy thông tin thì dùng hàm map và lấy qua biến props
 */
