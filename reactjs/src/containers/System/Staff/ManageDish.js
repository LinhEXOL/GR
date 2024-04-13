import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageDish.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { LANGUAGES, CommonUtils } from "../../../utils";
import Lightbox from "react-image-lightbox";
import { createNewDish } from "../../../services/restaurantService";
import { toast } from "react-toastify";
import { getRestaurantByStaffId } from "../../../services/staffService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      restaurantId: "",
      price: "",
      description: "",
    };
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  //   handleEditorChange = ({ html, text }) => {
  //     this.setState({
  //       descriptionHTML: html,
  //       descriptionMarkdown: text,
  //     });
  //   };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log("check base64", base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        imageBase64: base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveNewDish = async () => {
    console.log("Dish", this.state);
    let res = await createNewDish(this.state);
    if (res && res.errCode === 0) {
      toast.success("Create new Dish successfully!");
      this.state = {
        name: "",
        imageBase64: "",
        //restaurantId: "",
        description: "",
        price: "",
      };
    } else {
      toast.error("Create new Dish serror!");
    }
  };

  async componentDidMount() {
    let { userInfo } = this.props;
    let res = this.getRestaurantId(userInfo);
  }

  getRestaurantId = async (userInfo) => {
    let res = await getRestaurantByStaffId(userInfo.id);
    if (res && res.errCode === 0) {
      this.setState({
        restaurantId: res.data.id,
      });
    }
  };

  render() {
    let { restaurantId } = this.state;
    console.log("restaurantId", restaurantId);
    return (
      <div className="manage-dish-container">
        <div className="manage-dish-title">Manage dish</div>

        <div className="add-new-dish row">
          <div className="col-6 form-group">
            <label>Dish name</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            ></input>
          </div>
          <div className="col-6 form-group">
            <label>Dish price</label>
            <input
              className="form-control"
              type="text"
              value={this.state.price}
              onChange={(event) => this.handleOnChangeInput(event, "price")}
            ></input>
          </div>
          <div className="col-6 form-group">
            <label>Dish description</label>
            <input
              className="form-control"
              type="text"
              value={this.state.description}
              onChange={(event) =>
                this.handleOnChangeInput(event, "description")
              }
            ></input>
          </div>
          {/* <div className="col-6 form-group">
            <label>restaurantId</label>
            <input
              className="form-control"
              type="text"
              value={this.state.restaurantId}
              onChange={(event) => this.handleOnChangeInput(event, "restaurantId")}
            ></input>
          </div> */}
          <div className="col-12 form-group">
            <label>Image</label>
            {/* <input className="form-control-file" type="file"
            onChange={(event) => this.handleOnChangeImage(event)}></input> */}
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
          <div className="col-12">
            <button
              className="btn-save-dish"
              onClick={() => this.handleSaveNewDish()}
            >
              Save
            </button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDish);
