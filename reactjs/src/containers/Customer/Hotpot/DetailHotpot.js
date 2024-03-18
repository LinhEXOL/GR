import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailHotpot.scss";
import { getDetailInfoHotpot } from "../../../services/hotpotService";
import HotpotSchedule from "./HotpotSchedule";
import HotpotExtraInfo from "./HotpotExtraInfo";
import Slider from "react-slick";
class DetailHotpot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailHotpot: {},
      currentHotpotId: -1,
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
        currentHotpotId: id,
      });
      let res = await getDetailInfoHotpot(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailHotpot: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { language } = this.props;
    let { detailHotpot } = this.state;
    let name = "";
    let hpHotpot = detailHotpot.hpHotpot;
    name = `${detailHotpot.name}`;
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="hotpot-detail-container">
          <Slider {...this.props.settings}>
            {hpHotpot &&
              hpHotpot.length > 0 &&
              hpHotpot.map((item, index) => {
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
          {/* <div className="intro-hotpot">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailHotpot && detailHotpot.image ? detailHotpot.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">{name}</div>
              <div className="down">
                {detailHotpot &&
                  detailHotpot.Markdown &&
                  detailHotpot.Markdown.description && (
                    <span>{detailHotpot.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-hotpot">
            <div className="content-left">
              <HotpotSchedule hotpotIdFromParent={this.state.currentHotpotId} />
            </div>
            <div className="content-right">
              <HotpotExtraInfo
                hotpotIdFromParent={this.state.currentHotpotId}
              />
            </div>
          </div>
          <div className="detail-info-hotpot">
            {detailHotpot &&
              detailHotpot.Markdown &&
              detailHotpot.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailHotpot.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-hotpot"></div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHotpot);
