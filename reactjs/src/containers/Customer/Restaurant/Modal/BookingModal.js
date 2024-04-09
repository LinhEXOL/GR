import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import RestaurantProfile from "../RestaurantProfile";
import _ from "lodash";
import { postCustomerBookRestaurant } from "../../../../services/restaurantService";
import { toast } from "react-toastify";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      note: "",
      restaurantId: "",
      timeType: "",
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let restaurantId = this.props.dataTime.restaurantId;
        let timeType = this.props.dataTime.timeType;
        let date = this.props.dataTime.date;
        this.setState({
          restaurantId: restaurantId,
          timeType: timeType,
          date: date,
        });
      }
    }
  }

  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleConfirmBooking = async () => {
    let res = await postCustomerBookRestaurant({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      note: this.state.note,
      restaurantId: this.state.restaurantId,
      timeType: this.state.timeType,
      date: this.state.date,
    });
    if (res && res.errCode === 0) {
      toast.success("Booking restaurant successfully!");
      this.props.closeBookingModal();
    } else {
      toast.error("Booking restaurant error!");
    }
  };

  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let restaurantId =
      dataTime && !_.isEmpty(dataTime) ? dataTime.restaurantId : "";
    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="lg"
        centered
        // backdrop={true}
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">
              <FormattedMessage id="customer.booking-modal.title" />
            </span>
            <span className="right" onClick={closeBookingModal}>
              {/* <i className="fa-solid fa-x"></i> */}
              <i class="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body">
            <div className="restaurant-info">
              <RestaurantProfile
                restaurantId={restaurantId}
                isShowDescriptionRestaurant={false}
                dataTime={dataTime}
                isShowLinkDetail={false}
                //isShowPrice={true}
              />
            </div>
            <div className="row">
              <div className="col-12 form-group">
                <label>
                  {/* <FormattedMessage id="customer.booking-modal.fullName" /> */}
                  firstName
                </label>
                <input
                  className="form-control"
                  value={this.setState.firstName}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "firstName")
                  }
                ></input>
              </div>
              <div className="col-12 form-group">
                <label>
                  {/* <FormattedMessage id="customer.booking-modal.fullName" /> */}
                  lastName
                </label>
                <input
                  className="form-control"
                  value={this.setState.lastName}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "lastName")
                  }
                ></input>
              </div>
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.phoneNumber" />
                </label>
                <input
                  className="form-control"
                  value={this.setState.phoneNumber}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "phoneNumber")
                  }
                ></input>
              </div>
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.email" />
                </label>
                <input
                  className="form-control"
                  value={this.setState.email}
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                ></input>
              </div>

              <div className="col-12 form-group">
                <label>
                  {/* <FormattedMessage id="customer.booking-modal.note" /> */}
                  Số lượng người
                </label>
                <input
                  className="form-control"
                  value={this.setState.note}
                  onChange={(event) => this.handleOnChangeInput(event, "note")}
                ></input>
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn-booking-confirm"
              //   onClick={closeBookingModal}
              onClick={() => this.handleConfirmBooking()}
            >
              <FormattedMessage id="customer.booking-modal.btn-confirm" />
            </button>
            <button className="btn-booking-cancel" onClick={closeBookingModal}>
              <FormattedMessage id="customer.booking-modal.btn-cancel" />
            </button>
          </div>
        </div>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
