import React, { Component } from "react";

import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class NearSearch extends Component {
  render() {
    return (
      <div className="pop-up">
        <div>Near Search</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NearSearch);
//connect:kết nối react với redux
//

/**
 * muốn lưu thông tin vào redux thì phải fire actions của nó
 * muốn lấy thông tin thì dùng hàm map và lấy qua biến props
 */
