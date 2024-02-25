import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
class ModalEditHotpot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      phonenumber: "",
      image: "",
      priceId: "",
      provinceId: "",
      paymentId: "",
      typeId: "",
      restaurantId: "",
      note: "",
    };
  }

  componentDidMount() {
    let hotpot = this.props.currentHotpot;
    if (hotpot && !_.isEmpty(hotpot)) {
      this.setState({
        id: hotpot.id,
        name: hotpot.name,
        phonenumber: hotpot.phonenumber,
        //image: hotpot.,
        priceId: hotpot.priceId,
        provinceId: hotpot.provinceId,
        paymentId: hotpot.paymentId,
        typeId: hotpot.typeId,
        restaurantId: hotpot.restaurantId,
        note: hotpot.note,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    //good code
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "name",
      "phonenumber",
      "priceId",
      "provinceId",
      "paymentId",
      "typeId",
      "restaurantId",
      "note",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveHotpot = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.editHotpot(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-hotpot-container"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit a hotpot
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div class="form-group col-md-6">
                <label for="inputName">Name</label>
                <input
                  type="name"
                  class="form-control"
                  name="name"
                  placeholder="Name"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "name");
                  }}
                  value={this.state.name}
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputPhonenumber">Phone number</label>
                <input
                  type="text"
                  class="form-control"
                  name="phonenumber"
                  placeholder="0123456789"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "phonenumber");
                  }}
                  value={this.state.phonenumber}
                />
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-3">
                <label for="inputProvince">ProvinceId</label>
                <input
                  type="text"
                  class="form-control"
                  name="provinceId"
                  placeholder="PRO1"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "provinceId");
                  }}
                  value={this.state.provinceId}
                />
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-3">
                <label for="inputRestaureantId">restaurantId</label>
                <input
                  type="text"
                  class="form-control"
                  name="restaurantId"
                  placeholder="1234 Main St"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "restaurantId");
                  }}
                  value={this.state.restaurantId}
                />
              </div>
            </div>
            <div class="form-group">
              <label for="inputTypeId">typeId</label>
              <input
                type="text"
                class="form-control"
                name="typeId"
                placeholder="typeId"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "typeId");
                }}
                value={this.state.typeId}
              />
            </div>
            <div class="form-group">
              <label for="inputNote">Note</label>
              <input
                type="text"
                class="form-control"
                name="note"
                placeholder="Note"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "note");
                }}
                value={this.state.note}
              />
            </div>

            <div class="row">
              <div class="form-group col-md-6">
                <label for="inputPrice">PriceId</label>
                <input
                  type="text"
                  class="form-control"
                  name="priceId"
                  placeholder="PRI1"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "priceId");
                  }}
                  value={this.state.priceId}
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputPayment">PaymentId</label>
                {/* <!-- <select name="paymentId" class="form-control">
                <option value="1">Credit Card</option>
                <option value="2">Cash</option>
                <option value="3">Momo</option>
              </select> --> */}
                <input
                  type="text"
                  class="form-control"
                  name="paymentId"
                  placeholder="PAY1"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "paymentId");
                  }}
                  value={this.state.paymentId}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleSaveHotpot();
            }}
          >
            Save
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditHotpot);
