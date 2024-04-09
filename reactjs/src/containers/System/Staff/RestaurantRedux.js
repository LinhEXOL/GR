import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./RestaurantRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageRestaurant from "./TableManageRestaurant";
class RestaurantRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceArr: [],
      priceArr: [],
      paymentArr: [],
      previewImgURL: "",
      isOpen: false,
      name: "",
      phonenumber: "",
      provinceId: "",
      typeId: "",
      priceId: "",
      paymentId: "",
      note: "",
      image: "",
      action: "",
      restaurantEditId: "",
      listTypeNames: [],
    };
  }

  async componentDidMount() {
    this.props.getPriceStart();
    this.props.getPaymentStart();
    this.props.getProvinceStart();
    this.props.fetchAllTypeNames();
    this.props.fetchAllRestaurantNames();
    // try {
    //   let res = await getAllCodeService("province");
    //   console.log("check provine", res);
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       provinceArr: res.data,
    //     });
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  }

  // sau khi render chay se goi den ham componentDidUpdate
  //hàm componentDidUpdate so sánh hiện tại (this) và quá khứ (prev) của provinceRedux
  // quá khứ là chưa fire event, hiện tại là đã fire event
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.priceRedux !== this.props.priceRedux) {
      let arrPrices = this.props.priceRedux;
      this.setState({
        priceArr: arrPrices,
        priceId: arrPrices && arrPrices.length > 0 ? arrPrices[0].keyMap : "",
      });
    }
    if (prevProps.paymentRedux !== this.props.paymentRedux) {
      let arrPayments = this.props.paymentRedux;
      this.setState({
        paymentArr: arrPayments,
        paymentId:
          arrPayments && arrPayments.length > 0 ? arrPayments[0].keyMap : " ",
      });
    }
    if (prevProps.provinceRedux !== this.props.provinceRedux) {
      let arrProvinces = this.props.provinceRedux;
      this.setState({
        provinceArr: arrProvinces,
        provinceId:
          arrProvinces && arrProvinces.length > 0 ? arrProvinces[0].keyMap : "",
      });
    }

    if (prevProps.allTypeNames !== this.props.allTypeNames) {
      let arrTypeNames = this.props.allTypeNames;
      this.setState({
        listTypeNames: arrTypeNames,
        typeId:
          arrTypeNames && arrTypeNames.length > 0 ? arrTypeNames[0].id : "",
      });
    }
    if (prevProps.listRestaurants !== this.props.listRestaurants) {
      let arrProvinces = this.props.provinceRedux;
      let arrPayments = this.props.paymentRedux;
      let arrPrices = this.props.priceRedux;
      let arrTypeNames = this.props.allTypeNames;
      this.setState({
        name: "",
        phonenumber: "",
        note: "",
        //image: "",
        provinceId:
          arrProvinces && arrProvinces.length > 0 ? arrProvinces[0].keyMap : "",
        paymentId:
          arrPayments && arrPayments.length > 0 ? arrPayments[0].keyMap : " ",
        priceId: arrPrices && arrPrices.length > 0 ? arrPrices[0].keyMap : "",

        typeId:
          arrTypeNames && arrTypeNames.length > 0 ? arrTypeNames[0].id : "",
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
      });
    }
  }

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        image: base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveRestaurant = () => {
    let { userInfo } = this.props;
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    //let action = this.state.action
    //fire redux create restaurant
    console.log("check userInfo handleSave", userInfo);
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewRestaurant({
        name: this.state.name,
        phonenumber: this.state.phonenumber,
        priceId: this.state.priceId,
        provinceId: this.state.provinceId,
        paymentId: this.state.paymentId,
        typeId: this.state.typeId,
        note: this.state.note,
        image: this.state.image,
        staffId: userInfo.id,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      //Fire redux edit restaurant
      this.props.editRestaurantRedux({
        id: this.state.restaurantEditId,
        name: this.state.name,
        phonenumber: this.state.phonenumber,
        priceId: this.state.priceId,
        provinceId: this.state.provinceId,
        paymentId: this.state.paymentId,
        typeId: this.state.typeId,
        note: this.state.note,
        image: this.state.image,
        staffId: userInfo.id,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "name",
      //"phonenumber",
      "provinceId",
      "typeId",
      "priceId",
      "paymentId",
      //"note",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required: " + arrCheck[i]);
        break;
      }
    }

    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditRestaurant = (restaurant) => {
    let imageBase64 = "";
    if (restaurant.image) {
      imageBase64 = new Buffer(restaurant.image, "base64").toString("binary");
    }
    this.setState({
      name: restaurant.name,
      phonenumber: restaurant.phonenumber,
      typeId: restaurant.typeId,
      note: restaurant.note,
      image: "",
      previewImgURL: imageBase64,
      provinceId: restaurant.provinceId,
      paymentId: restaurant.paymentId,
      priceId: restaurant.priceId,
      action: CRUD_ACTIONS.EDIT,
      restaurantEditId: restaurant.id,
    });
  };

  render() {
    let language = this.props.language;
    let isLoadingProvince = this.props.isLoadingProvince;
    let provinces = this.state.provinceArr;
    let prices = this.state.priceArr;
    let payments = this.state.paymentArr;
    let typeNames = this.state.listTypeNames;

    let {
      name,
      phonenumber,
      provinceId,
      typeId,
      priceId,
      paymentId,
      note,
      image,
    } = this.state;

    return (
      <div className="restaurant-redux-container">
        <div className="title">MANAGE RESTAURANT</div>
        <div className="restaurant-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 mb-5 ">
                <TableManageRestaurant
                  handleEditRestaurant={this.handleEditRestaurant}
                  action={this.state.action}
                />
              </div>
              <div className="col-12 my-3">
                <b>
                  {/* <FormattedMessage id="manage-restaurant.add" /> */}
                  Edit restaurant
                </b>
              </div>
              <div className="col-12">
                {isLoadingProvince === true ? "Loading province" : ""}
              </div>
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-restaurant.name" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(event) => {
                    this.onChangeInput(event, "name");
                  }}
                  // dùng disabled để khi edit không cho phép chỉnh sửa trường này
                  // disabled={
                  //   this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  // }
                />
              </div>

              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-restaurant.provinceId" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "provinceId");
                  }}
                  value={provinceId}
                >
                  {provinces &&
                    provinces.length > 0 &&
                    provinces.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-restaurant.priceId" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "priceId");
                  }}
                  value={priceId}
                >
                  {prices &&
                    prices.length > 0 &&
                    prices.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-restaurant.paymentId" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "paymentId");
                  }}
                  value={paymentId}
                >
                  {payments &&
                    payments.length > 0 &&
                    payments.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              {/* <div className="col-8">
                <label>
                  <FormattedMessage id="manage-restaurant.note" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={note}
                  onChange={(event) => {
                    this.onChangeInput(event, "note");
                  }}
                />
              </div> */}
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-restaurant.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label className="label-upload" htmlFor="previewImg">
                    Upload image <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => this.openPreviewImage()}
                  ></div>
                </div>
              </div>
              <div className="col-12 my-3">
                <button
                  // className={
                  //   this.state.action === CRUD_ACTIONS.EDIT
                  //     ? "btn btn-warning"
                  //     : "btn btn-primary"
                  // }
                  className={"btn btn-warning"}
                  onClick={() => this.handleSaveRestaurant()}
                >
                  {/* {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-restaurant.edit" />
                  ) : (
                    <FormattedMessage id="manage-restaurant.save" />
                  )} */}
                  <FormattedMessage id="manage-restaurant.edit" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
    priceRedux: state.admin.prices,
    paymentRedux: state.admin.payments,
    provinceRedux: state.admin.provinces,
    allTypeNames: state.admin.allTypeNames,
    isLoadingProvince: state.admin.isLoadingProvince,
    listRestaurants: state.admin.restaurants,
    allRestaurantNames: state.admin.allrestaurantNames,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPriceStart: () => dispatch(actions.fetchPriceStart()),
    getPaymentStart: () => dispatch(actions.fetchPaymentStart()),
    getProvinceStart: () => dispatch(actions.fetchProvinceStart()),
    createNewRestaurant: (data) => dispatch(actions.createNewRestaurant(data)),
    fetchRestaurantsRedux: () => dispatch(actions.fetchAllRestaurantsStart()),
    editRestaurantRedux: (data) => dispatch(actions.editRestaurant(data)),
    fetchAllTypeNames: () => dispatch(actions.fetchAllTypeNames()),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
    fetchAllRestaurantNames: () => dispatch(actions.fetchAllRestaurantNames()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantRedux);
