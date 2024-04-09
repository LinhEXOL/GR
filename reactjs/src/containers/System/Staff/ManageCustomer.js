import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageCustomer.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getListCustomerForStaff,
  getRestaurantByStaffId,
} from "../../../services/staffService";
import moment from "moment";

class ManageCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).add(0, "days").startOf("day").valueOf(),
      dataCustomer: [],
    };
  }

  async componentDidMount() {
    let { userInfo } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    this.getDataCustomer(userInfo, formatedDate);
  }

  getDataCustomer = async (userInfo, formatedDate) => {
    let res = await getListCustomerForStaff({
      staffId: userInfo.id,
      date: formatedDate,
    });

    let res1 = await getRestaurantByStaffId(userInfo.id);
    console.log("res1", res1);
    if (res && res.errCode === 0) {
      this.setState({
        dataCustomer: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        let { userInfo } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        this.getDataCustomer(userInfo, formatedDate);
      }
    );
  };

  render() {
    console.log("state", this.state);
    let { dataCustomer } = this.state;
    return (
      <div className="manage-customer-container">
        <div className="m-c-title">Quan ly khach hang</div>
        <div className="manage-customer-body row">
          <div className="col-4 form-group">
            <label>Chon ngay</label>
            <DatePicker
              onChange={this.handleOnChangeDatePicker}
              className="form-control"
              value={this.state.currentDate}
            />
          </div>
          <div className="col-12 table-manage-customer">
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <th>STT </th>
                  <th>Time</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                </tr>
                {dataCustomer && dataCustomer.length > 0 ? (
                  dataCustomer.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.timeTypeDataBooking.valueVi}</td>
                        <td>{item.customerData.firstName}</td>
                        <td>{item.customerData.lastName}</td>
                        <td>{item.customerData.email}</td>
                        <td>{item.customerData.phonenumber}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>no data</tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCustomer);
