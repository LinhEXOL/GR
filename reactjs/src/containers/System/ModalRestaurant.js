import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModalRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phonenumber: "",
      image: "",
      priceId: "",
      provinceId: "",
      paymentId: "",
      typeId: "",
      note: "",
      staffId: "",
    };

    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      //reset state
      this.setState = {
        name: "",
        phonenumber: "",
        image: "",
        priceId: "",
        provinceId: "",
        paymentId: "",
        typeId: "",
        note: "",
        staffId: "",
      };
    });
  }

  componentDidMount() {
    console.log("mouting");
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    //bad code
    /*
    this.state.name === this.state['email']
    
    */
    // this.state[id] = event.target.value;
    // this.setState(
    //   {
    //     ...this.state,
    //   },
    //   () => {
    //     console.log("check bad state: ", this.state);
    //   }
    // );

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

  handleAddNewRestaurant = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.createNewRestaurant(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-restaurant-container"}
        size="lg"
        centered
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create new restaurant
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
            <div class="row"></div>
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
              this.handleAddNewRestaurant();
            }}
          >
            Add new
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalRestaurant);
