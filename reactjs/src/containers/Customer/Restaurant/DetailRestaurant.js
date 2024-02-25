import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailRestaurant.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import HotpotSchedule from "../Hotpot/HotpotSchedule";
import HotpotExtraInfo from "../Hotpot/HotpotExtraInfo";
import HotpotProfile from "../Hotpot/HotpotProfile";
import {
  getDetailRestaurantById,
  getAllCodeService,
} from "../../../services/hotpotService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
class DetailRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrHotpotId: [],
      dataDetailRestaurant: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getDetailRestaurantById({
        id: id,
      });
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrHotpotId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.hotpotRestaurant;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrHotpotId.push(item.id);
            });
          }
        }

        this.setState({
          dataDetailRestaurant: res.data,
          arrHotpotId: arrHotpotId,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { arrHotpotId, dataDetailRestaurant } = this.state;
    console.log("Check dataDetailType arrHotpotId", arrHotpotId);
    let { language } = this.props;
    return (
      <div className="detail-type-container">
        <HomeHeader />
        <div className="detail-type-body">
          <div className="description-type">
            {dataDetailRestaurant && !_.isEmpty(dataDetailRestaurant) && (
              <>
                <div className="name">{dataDetailRestaurant.name}</div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailRestaurant.descriptionHTML,
                  }}
                ></div>
              </>
            )}
          </div>

          {arrHotpotId &&
            arrHotpotId.length > 0 &&
            arrHotpotId.map((item, index) => {
              return (
                <div className="each-hotpot" key={index}>
                  <div className="dt-content-left">
                    <div className="profile-hotpot">
                      <HotpotProfile
                        hotpotId={item}
                        isShowDescriptionHotpot={true}
                        isShowLinkDetail={true}
                        isShowPrice={false}
                      />
                    </div>
                  </div>
                  <div className="dt-content-right">
                    <div className="hotpot-schedule">
                      <HotpotSchedule hotpotIdFromParent={item} />
                    </div>
                    <div className="hotpot-extra-info">
                      <HotpotExtraInfo hotpotIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailRestaurant);
