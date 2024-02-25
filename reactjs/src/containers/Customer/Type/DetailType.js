import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailType.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import HotpotSchedule from "../Hotpot/HotpotSchedule";
import HotpotExtraInfo from "../Hotpot/HotpotExtraInfo";
import HotpotProfile from "../Hotpot/HotpotProfile";
import {
  getDetailTypeById,
  getAllCodeService,
} from "../../../services/hotpotService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
class DetailType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrHotpotId: [],
      dataDetailType: {},
      listProvince: [],
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getDetailTypeById({
        id: id,
        location: "ALL",
      });

      let resProvince = await getAllCodeService("PROVINCE");
      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let arrHotpotId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.hotpotType;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrHotpotId.push(item.id);
            });
          }
        }

        let dataProvince = resProvince.data;
        console.log("Check resProvince", resProvince);
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueEn: "All",
            valueVi: "Toàn quốc",
          });
        }

        this.setState({
          dataDetailType: res.data,
          arrHotpotId: arrHotpotId,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;

      let res = await getDetailTypeById({
        id: id,
        location: location,
      });

      console.log("RES", res);

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrHotpotId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.hotpotType;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrHotpotId.push(item.id);
            });
          }
        }

        this.setState({
          dataDetailType: res.data,
          arrHotpotId: arrHotpotId,
        });
      }
    }
  };

  render() {
    let { arrHotpotId, dataDetailType, listProvince } = this.state;
    console.log("Check dataDetailType arrHotpotId", arrHotpotId);
    let { language } = this.props;
    return (
      <div className="detail-type-container">
        <HomeHeader />
        <div className="detail-type-body">
          <div className="description-type">
            {dataDetailType && !_.isEmpty(dataDetailType) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailType.descriptionHTML,
                }}
              ></div>
            )}
          </div>
          <div className="search-type-hotpot">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {listProvince &&
                listProvince.length > 0 &&
                listProvince.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailType);
