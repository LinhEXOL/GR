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
      previewImgURL: "",
      isOpen: false,
      name: "",
      phoneNumber: "",
      provinceId: "",
      typeId: "",
      averagePrice: "",
      address: "",
      image: "",
      action: "",
      restaurantEditId: "",
      listTypeNames: [],
      staffId: "",
      longitude: "",
      latitude: "",
      isOpen: "",
      isDelete: "",
      openTime: "",
      closeTime: "",
      rate: "",
    };
  }

  async componentDidMount() {
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
      let arrTypeNames = this.props.allTypeNames;
      this.setState({
        name: "",
        phoneNumber: "",
        address: "",
        latitude: "",
        staffId: "",
        longitude: "",
        //image: "",
        provinceId:
          arrProvinces && arrProvinces.length > 0 ? arrProvinces[0].keyMap : "",

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
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    //let action = this.state.action
    //fire redux create restaurant
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewRestaurant({
        name: this.state.name,
        phoneNumber: this.state.phoneNumber,
        averagePrice: this.state.averagePrice,
        provinceId: this.state.provinceId,
        typeId: this.state.typeId,
        address: this.state.address,
        image: this.state.image,
        staffId: this.state.staffId,
        longitude: this.state.longitude,
        latitude: this.state.latitude,
        isOpen: this.state.isOpen,
        isDelete: this.state.isDelete,
        openTime: this.state.openTime,
        closeTime: this.state.closeTime,
        rate: this.state.rate,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      //Fire redux edit restaurant
      this.props.editRestaurantRedux({
        id: this.state.restaurantEditId,
        name: this.state.name,
        phoneNumber: this.state.phoneNumber,
        averagePrice: this.state.averagePrice,
        provinceId: this.state.provinceId,
        typeId: this.state.typeId,
        address: this.state.address,
        image: this.state.image,
        staffId: this.state.staffId,
        longitude: this.state.longitude,
        latitude: this.state.latitude,
        isOpen: this.state.isOpen,
        isDelete: this.state.isDelete,
        openTime: this.state.openTime,
        closeTime: this.state.closeTime,
        rate: this.state.rate,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "name",
      //"phoneNumber",
      "provinceId",
      "typeId",
      "averagePrice",
      //"address",
      //"longitude"
      //"latitude"
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
      phoneNumber: restaurant.phoneNumber,
      typeId: restaurant.typeId,
      address: restaurant.address,
      image: "",
      previewImgURL: imageBase64,
      provinceId: restaurant.provinceId,
      averagePrice: restaurant.averagePrice,
      action: CRUD_ACTIONS.EDIT,
      restaurantEditId: restaurant.id,
      staffId: restaurant.staffId,
      longitude: restaurant.longitude,
      latitude: restaurant.latitude,
      isOpen: restaurant.isOpen,
      isDelete: restaurant.isDelete,
      openTime: restaurant.openTime,
      closeTime: restaurant.closeTime,
      rate: restaurant.rate,
    });
  };

  render() {
    let language = this.props.language;
    let isLoadingProvince = this.props.isLoadingProvince;
    let provinces = this.state.provinceArr;
    let typeNames = this.state.listTypeNames;

    let {
      name,
      phoneNumber,
      provinceId,
      typeId,
      averagePrice,
      address,
      image,
      staffId,
      longitude,
      latitude,
      isOpen,
      isDelete,
      openTime,
      closeTime,
      rate,
    } = this.state;

    return (
      <div className="restaurant-redux-container">
        <div className="title">MANAGE RESTAURANT</div>
        <div className="restaurant-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <b>
                  <FormattedMessage id="manage-restaurant.add" />
                </b>
              </div>
              <div className="col-12">
                {isLoadingProvince === true ? "Loading province" : ""}
              </div>
              <div className="col-4">
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
                  <FormattedMessage id="manage-restaurant.phoneNumber" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber}
                  onChange={(event) => {
                    this.onChangeInput(event, "phoneNumber");
                  }}
                />
              </div>
              <div className="col-4">
                <label>
                  {/* <FormattedMessage id="manage-restaurant.phone-number" /> */}
                  Staff ID
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={staffId}
                  onChange={(event) => {
                    this.onChangeInput(event, "staffId");
                  }}
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
              <div className="col-8">
                <label>
                  <FormattedMessage id="manage-restaurant.address" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(event) => {
                    this.onChangeInput(event, "address");
                  }}
                />
              </div>
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-restaurant.latitude" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={latitude}
                  onChange={(event) => {
                    this.onChangeInput(event, "latitude");
                  }}
                />
              </div>
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-restaurant.longitude" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={longitude}
                  onChange={(event) => {
                    this.onChangeInput(event, "longitude");
                  }}
                />
              </div>

              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-restaurant.typeId" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={typeId}
                  onChange={(event) => {
                    this.onChangeInput(event, "typeId");
                  }}
                />
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-restaurant.averagePrice" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={averagePrice}
                  onChange={(event) => {
                    this.onChangeInput(event, "averagePrice");
                  }}
                />
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-restaurant.rate" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={rate}
                  onChange={(event) => {
                    this.onChangeInput(event, "rate");
                  }}
                />
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-restaurant.openTime" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={openTime}
                  onChange={(event) => {
                    this.onChangeInput(event, "openTime");
                  }}
                />
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-restaurant.closeTime" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={closeTime}
                  onChange={(event) => {
                    this.onChangeInput(event, "closeTime");
                  }}
                />
              </div>

              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-restaurant.isOpen" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={isOpen}
                  onChange={(event) => {
                    this.onChangeInput(event, "isOpen");
                  }}
                />
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-restaurant.isDelete" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={isDelete}
                  onChange={(event) => {
                    this.onChangeInput(event, "isDelete");
                  }}
                />
              </div>

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
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handleSaveRestaurant()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-restaurant.edit" />
                  ) : (
                    <FormattedMessage id="manage-restaurant.save" />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5 ">
                <TableManageRestaurant
                  handleEditRestaurant={this.handleEditRestaurant}
                  action={this.state.action}
                />
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
    provinceRedux: state.admin.provinces,
    allTypeNames: state.admin.allTypeNames,
    isLoadingProvince: state.admin.isLoadingProvince,
    listRestaurants: state.admin.restaurants,
    allRestaurantNames: state.admin.allrestaurantNames,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
