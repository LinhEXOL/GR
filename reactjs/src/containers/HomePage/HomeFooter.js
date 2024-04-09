import React, { Component } from "react";

import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
  render() {
    return (
      <div id="about-us" className="home-footer">
        <div>
          Contact Details
          <p>Phone: 0123456789</p>
          <p>Email: info@restaurant.com</p>
          <p>Address: 1st Dai Co Viet, Hai Ba Trung, Ha Noi</p>
        </div>
        <p>
          &copy; 2023 EXOL. More information, please visit my facebook.
          <a target="_blank" href="https://www.facebook.com/weareoneEXO">
            &#8594; Click here &#8592;
          </a>
        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
//connect:kết nối react với redux
//

/**
 * muốn lưu thông tin vào redux thì phải fire actions của nó
 * muốn lấy thông tin thì dùng hàm map và lấy qua biến props
 */
