import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _, { result } from "lodash";
import { saveBulkScheduleRestaurant } from "../../../services/restaurantService";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRestaurantNames: [],
      selectedRestaurant: {},
      currentDate: "",
      rangeTime: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllRestaurantNames();
    this.props.fetchAllScheduleTime();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allRestaurantNames !== this.props.allRestaurantNames) {
      let dataSelect = this.buildDataInputSelect(this.props.allRestaurantNames);
      this.setState({
        listRestaurantNames: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = `${item.name}`;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleChangeSelect = async (selectedRestaurant) => {
    this.setState({ selectedRestaurant });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  handleClickTimeBtn = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  //_.isEmpty(selectedRestaurant) tra ve true khi object rỗng

  handleSaveSchedule = async () => {
    let { rangeTime, selectedRestaurant, currentDate } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Invalid date!");
      return;
    }
    if (selectedRestaurant && _.isEmpty(selectedRestaurant)) {
      toast.error("Invalid selected restaurant!");
      return;
    }
    let formatedDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      selectedTime.map((schedule) => {
        let object = {};
        object.restaurantId = selectedRestaurant.value;
        object.date = formatedDate;
        object.timeType = schedule.keyMap;
        result.push(object);
      });
    } else {
      toast.error("Invalid selected time!");
      return;
    }
    let res = await saveBulkScheduleRestaurant({
      arrSchedule: result,
      restaurantId: selectedRestaurant.value,
      formatedDate: formatedDate,
    });
    if (res && res.errCode === 0) {
      toast.success("Save info successfully!");
    } else {
      toast.error("error saveBulkScheduleRestaurant");
      console.log("error saveBulkScheduleRestaurant >>> res:", res);
    }
  };

  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    return (
      <div className="manage-schedule-container">
        <div className="manage-schedule-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>
                {/* <FormattedMessage id="manage-schedule.choose-Restaurant" /> */}
                Chọn nhà hàng
              </label>
              <Select
                value={this.state.selectedRestaurant}
                onChange={this.handleChangeSelect}
                options={this.state.listRestaurantNames}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
                minDate={yesterday}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      button
                      className={
                        item.isSelected === true
                          ? "btn btn-schedule active"
                          : "btn btn-schedule"
                      }
                      key={index}
                      onClick={() => this.handleClickTimeBtn(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary btn-save-schedule"
                onClick={() => this.handleSaveSchedule()}
              >
                <FormattedMessage id="manage-schedule.save" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allRestaurantNames: state.admin.allRestaurantNames,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllRestaurantNames: () => dispatch(actions.fetchAllRestaurantNames()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
