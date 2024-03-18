import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailHpHotpot.scss";
import { getDetailInfoHotpot } from "../../../services/hotpotService";
import HotpotSchedule from "./HotpotSchedule";
import HpHotpotExtraInfo from "./HpHotpotExtraInfo";
import Slider from "react-slick";
class DetailHpHotpot extends Component {
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
    console.log("detailhotpot", detailHotpot);
    let name = "";
    let hpHotpot = detailHotpot.hpHotpot;
    name = `${detailHotpot.name}`;
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="hotpot-container">
          <div className="detail-hotpot">
            <Slider
              {...this.props.settings}
              autoplay={true}
              autoplaySpeed={3000}
            >
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
              <HpHotpotExtraInfo
                hotpotIdFromParent={this.state.currentHotpotId}
              />
              {detailHotpot &&
                detailHotpot.Markdown &&
                detailHotpot.Markdown.description && (
                  <span className="des">
                    {detailHotpot.Markdown.description}
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
          </div>
          <div className="schedule-hotpot">
            <div className="book-restaurant">Đặt chỗ</div>
            <HotpotSchedule hotpotIdFromParent={this.state.currentHotpotId} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHpHotpot);
