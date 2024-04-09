import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageHotpot.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { LANGUAGES, CommonUtils } from "../../../utils";
import Lightbox from "react-image-lightbox";
import { createNewHotpot } from "../../../services/restaurantService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHotpot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      restaurantId: "",
      previewImgURL: "",
    };
  }

  async componentDidMount() {}

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

  handleSaveNewHotpot = async () => {
    console.log("Hotpot", this.state);
    let res = await createNewHotpot(this.state);
    if (res && res.errCode === 0) {
      toast.success("Create new Hotpot successfully!");
      this.state = {
        name: "",
        imageBase64: "",
        restaurantId: "",
      };
    } else {
      toast.error("Create new Hotpot serror!");
    }
  };

  render() {
    return (
      <div className="manage-hotpot-container">
        <div className="manage-hotpot-title">Quan li hotpot</div>

        <div className="add-new-hotpot row">
          <div className="col-6 form-group">
            <label>Ten hotpot</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            ></input>
          </div>
          <div className="col-6 form-group">
            <label>restaurantId</label>
            <input
              className="form-control"
              type="text"
              value={this.state.restaurantId}
              onChange={(event) =>
                this.handleOnChangeInput(event, "restaurantId")
              }
            ></input>
          </div>
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
              className="btn-save-hotpot"
              onClick={() => this.handleSaveNewHotpot()}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHotpot);
