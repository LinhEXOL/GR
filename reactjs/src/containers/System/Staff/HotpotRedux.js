import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./HotpotRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageHotpot from "./TableManageHotpot";
import { getAllRestaurantNamesService } from "../../../services/hotpotService";
class HotpotRedux extends Component {
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
      restaurantId: "",
      typeId: "",
      priceId: "",
      paymentId: "",
      note: "",
      image: "",
      action: "",
      hotpotEditId: "",
      listRestaurantNames: [],
      //restaurantAddress:[],
      listTypeNames: [],
    };
  }

  async componentDidMount() {
    this.props.getPriceStart();
    this.props.getPaymentStart();
    this.props.getProvinceStart();
    this.props.fetchAllRestaurantNames();
    this.props.fetchAllTypeNames();
    this.props.fetchAllHotpotNames();
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

    if (prevProps.allRestaurantNames !== this.props.allRestaurantNames) {
      let arrRestaurantNames = this.props.allRestaurantNames;
      this.setState({
        listRestaurantNames: arrRestaurantNames,
        restaurantId:
          arrRestaurantNames && arrRestaurantNames.length > 0
            ? arrRestaurantNames[0].id
            : "",
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
    if (prevProps.listHotpots !== this.props.listHotpots) {
      let arrProvinces = this.props.provinceRedux;
      let arrPayments = this.props.paymentRedux;
      let arrPrices = this.props.priceRedux;
      let arrRestaurantNames = this.props.allRestaurantNames;
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
        restaurantId:
          arrRestaurantNames && arrRestaurantNames.length > 0
            ? arrRestaurantNames[0].id
            : "",
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

  handleSaveHotpot = () => {
    let { userInfo } = this.props;
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    //let action = this.state.action
    //fire redux create hotpot
    console.log("check userInfo handleSave", userInfo);
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewHotpot({
        name: this.state.name,
        phonenumber: this.state.phonenumber,
        priceId: this.state.priceId,
        provinceId: this.state.provinceId,
        paymentId: this.state.paymentId,
        typeId: this.state.typeId,
        restaurantId: this.state.restaurantId,
        note: this.state.note,
        image: this.state.image,
        staffId: userInfo.id,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      //Fire redux edit hotpot
      this.props.editHotpotRedux({
        id: this.state.hotpotEditId,
        name: this.state.name,
        phonenumber: this.state.phonenumber,
        priceId: this.state.priceId,
        provinceId: this.state.provinceId,
        paymentId: this.state.paymentId,
        typeId: this.state.typeId,
        restaurantId: this.state.restaurantId,
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
      "phonenumber",
      "provinceId",
      "restaurantId",
      "typeId",
      "priceId",
      "paymentId",
      "note",
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

  handleEditHotpot = (hotpot) => {
    let imageBase64 = "";
    if (hotpot.image) {
      imageBase64 = new Buffer(hotpot.image, "base64").toString("binary");
    }
    this.setState({
      name: hotpot.name,
      phonenumber: hotpot.phonenumber,
      restaurantId: hotpot.restaurantId,
      typeId: hotpot.typeId,
      note: hotpot.note,
      image: "",
      previewImgURL: imageBase64,
      provinceId: hotpot.provinceId,
      paymentId: hotpot.paymentId,
      priceId: hotpot.priceId,
      action: CRUD_ACTIONS.EDIT,
      hotpotEditId: hotpot.id,
    });
  };

  render() {
    let language = this.props.language;
    let isLoadingProvince = this.props.isLoadingProvince;
    let provinces = this.state.provinceArr;
    let prices = this.state.priceArr;
    let payments = this.state.paymentArr;
    let restaurantNames = this.state.listRestaurantNames;
    let typeNames = this.state.listTypeNames;

    let {
      name,
      phonenumber,
      provinceId,
      restaurantId,
      typeId,
      priceId,
      paymentId,
      note,
      image,
    } = this.state;

    return (
      <div className="hotpot-redux-container">
        <div className="title">Hotpot</div>
        <div className="hotpot-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <b>
                  <FormattedMessage id="manage-hotpot.add" />
                </b>
              </div>
              <div className="col-12">
                {isLoadingProvince === true ? "Loading province" : ""}
              </div>
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-hotpot.name" />
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
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-hotpot.phone-number" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={phonenumber}
                  onChange={(event) => {
                    this.onChangeInput(event, "phonenumber");
                  }}
                />
              </div>

              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-hotpot.restaurantId" />
                </label>
                {/* <input
                  className="form-control"
                  type="text"
                  value={restaurantId}
                  onChange={(event) => {
                    this.onChangeInput(event, "restaurantId");
                  }}
                /> */}
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "restaurantId");
                  }}
                  value={restaurantId}
                >
                  {restaurantNames &&
                    restaurantNames.length > 0 &&
                    restaurantNames.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-hotpot.typeId" />
                </label>
                {/* <input
                  className="form-control"
                  type="text"
                  value={typeId}
                  onChange={(event) => {
                    this.onChangeInput(event, "typeId");
                  }}
                /> */}
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "typeId");
                  }}
                  value={typeId}
                >
                  {typeNames &&
                    typeNames.length > 0 &&
                    typeNames.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-hotpot.provinceId" />
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
                  <FormattedMessage id="manage-hotpot.priceId" />
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
                  <FormattedMessage id="manage-hotpot.paymentId" />
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
              <div className="col-8">
                <label>
                  <FormattedMessage id="manage-hotpot.note" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={note}
                  onChange={(event) => {
                    this.onChangeInput(event, "note");
                  }}
                />
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-hotpot.image" />
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
                  onClick={() => this.handleSaveHotpot()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-hotpot.edit" />
                  ) : (
                    <FormattedMessage id="manage-hotpot.save" />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5 ">
                <TableManageHotpot
                  handleEditHotpot={this.handleEditHotpot}
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
    userInfo: state.user.userInfo,
    priceRedux: state.admin.prices,
    paymentRedux: state.admin.payments,
    provinceRedux: state.admin.provinces,
    allRestaurantNames: state.admin.allRestaurantNames,
    allTypeNames: state.admin.allTypeNames,
    isLoadingProvince: state.admin.isLoadingProvince,
    listHotpots: state.admin.hotpots,
    allHotpotNames: state.admin.allHotpotNames,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPriceStart: () => dispatch(actions.fetchPriceStart()),
    getPaymentStart: () => dispatch(actions.fetchPaymentStart()),
    getProvinceStart: () => dispatch(actions.fetchProvinceStart()),
    createNewHotpot: (data) => dispatch(actions.createNewHotpot(data)),
    fetchHotpotsRedux: () => dispatch(actions.fetchAllHotpotsStart()),
    editHotpotRedux: (data) => dispatch(actions.editHotpot(data)),
    fetchAllRestaurantNames: () => dispatch(actions.fetchAllRestaurantNames()),
    fetchAllTypeNames: () => dispatch(actions.fetchAllTypeNames()),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
    fetchAllHotpotNames: () => dispatch(actions.fetchAllHotpotNames()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotpotRedux);
