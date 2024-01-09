import React, { Component } from "react";
import { connect } from "react-redux";
import "./HotpotSchedule.scss";
import Select from "react-select";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleHotpotByDate } from "../../../services/hotpotService";
import { FormattedMessage } from "react-intl";

class HotpotSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDays(language);
    this.setState({
      allDays: allDays,
    });
  }

  capitalizeFisrtLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFisrtLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("dddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      console.log("check allday", allDays);
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.hotpotIdFromParent !== prevProps.hotpotIdFromParent) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getScheduleHotpotByDate(
        this.props.hotpotIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }

  handleOnChangeSelect = async (event) => {
    console.log("check parent", this.props.hotpotIdFromParent);
    if (this.props.hotpotIdFromParent && this.props.hotpotIdFromParent !== -1) {
      let hotpotId = this.props.hotpotIdFromParent;
      let date = event.target.value;
      let res = await getScheduleHotpotByDate(hotpotId, date);
      console.log("check res", res);

      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }

      console.log("check res", res);
    }
  };

  render() {
    let { allDays, allAvailableTime } = this.state;
    let { language } = this.props;
    return (
      <div className="hotpot-schedule-container">
        <div className="all-schedule">
          <select onChange={(event) => this.handleOnChangeSelect(event)}>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-available-time">
          <div className="text-calender">
            <i className="fa fa-calendar" aria-hidden="true">
              <span>
                <FormattedMessage id="customer.detail-hotpot.schedule" />
              </span>
            </i>
          </div>
          <div className="time-content">
            {allAvailableTime && allAvailableTime.length > 0 ? (
              <>
                <div className="time-content-btns">
                  {allAvailableTime.map((item, index) => {
                    let timeDisplay =
                      language === LANGUAGES.VI
                        ? item.timeTypeData.valueVi
                        : item.timeTypeData.valueEn;
                    return (
                      <button
                        key={index}
                        className={
                          language === LANGUAGES.VI ? "btn-vi" : "btn-en"
                        }
                      >
                        {timeDisplay}
                      </button>
                    );
                  })}
                </div>

                <div className="book-free">
                  <span>
                    <FormattedMessage id="customer.detail-hotpot.choose" />{" "}
                    <i class="far fa-hand-point-up"></i>{" "}
                    <FormattedMessage id="customer.detail-hotpot.book-free" />
                  </span>
                </div>
              </>
            ) : (
              <div className="no-schedule">
                <FormattedMessage id="customer.detail-hotpot.no-schedule" />
              </div>
            )}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HotpotSchedule);
