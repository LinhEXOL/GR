import React, { Component } from "react";

import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";

class Hotpot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrHotpots: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topHotpotsRedux !== this.props.topHotpotsRedux) {
      this.setState({
        arrHotpots: this.props.topHotpotsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopHotpots();
  }

  handleViewDetailHotpot = (hotpot) => {
    this.props.history.push(`/detail-hotpot/${hotpot.id}`);
  };
  render() {
    let arrHotpots = this.state.arrHotpots;
    let { language } = this.props;
    //arrHotpots = arrHotpots.concat(arrHotpots).concat(arrHotpots); //its đata quá fai tạo thêm
    return (
      <div className="section-share section-hotpot">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.outstanding-hotpot" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrHotpots &&
                arrHotpots.length > 0 &&
                arrHotpots.map((item, index) => {
                  let imageBase64 = "";
                  let name = `${item.name}`;
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailHotpot(item)}
                    >
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image section-hotpot"
                            style={{
                              backgroundImage: `url(${imageBase64})`,
                            }}
                          />
                        </div>
                        <div className="position text-center">
                          <div>{name}</div>
                          <div>Lẩu buffet</div>
                        </div>
                      </div>
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
    topHotpotsRedux: state.admin.topHotpots,
  };
};

//fire events của redux
const mapDispatchToProps = (dispatch) => {
  return {
    loadTopHotpots: () => dispatch(actions.fetchTopHotpot()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hotpot));
//connect:kết nối react với redux
//

/**
 * muốn lưu thông tin vào redux thì phải fire actions của nó
 * muốn lấy thông tin thì dùng hàm map và lấy qua biến props
 */
