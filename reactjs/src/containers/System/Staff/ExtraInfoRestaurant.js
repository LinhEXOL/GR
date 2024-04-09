import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ExtraInfoRestaurant.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDetailInfoRestaurant } from "../../../services/restaurantService";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ExtraInfoRestaurant extends Component {
  state = {};
  //constructor:
  //khi component được render thì nó sẽ check hàm constructor đầu tiên
  // khởi tạo những state (những biến mà ta muốn dùng class ManageRestaurant này)
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedRestaurant: "",
      description: "",
      listRestaurantNames: [],
      hasOldData: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllRestaurantNames();
  }

  buildDataInputSelect = (inputData) => {
    console.log("check inputData", inputData);
    let result = [];
    let { userInfo } = this.props;
    console.log("check userInfo11", userInfo);
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        if (item.staffId === userInfo.id) {
          object.label = `${item.name}`;
          object.value = item.id;
          result.push(object);
        }
      });
    }
    console.log("check result", result);
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allRestaurantNames !== this.props.allRestaurantNames) {
      let dataSelect = this.buildDataInputSelect(this.props.allRestaurantNames);
      this.setState({
        listRestaurantNames: dataSelect,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailRestaurant({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      restaurantId: this.state.selectedRestaurant.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
  };

  handleChangeSelect = async (selectedRestaurant) => {
    this.setState({ selectedRestaurant });
    let res = await getDetailInfoRestaurant(selectedRestaurant.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
  };

  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
    let { hasOldData } = this.state;
    return (
      <div className="manage-restaurant-container">
        <div className="manage-restaurant-title">Add restaurant infomation</div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>Chọn nhà hàng</label>
            <Select
              value={this.state.selectedRestaurant}
              onChange={this.handleChangeSelect}
              options={this.state.listRestaurantNames}
            />
          </div>
          <div className="content-right">
            <label>Thông tin giới thiệu</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) => this.handleOnChangeDesc(event)}
              value={this.state.description}
            >
              asdfghj
            </textarea>
          </div>
        </div>
        <div className="manage-restaurant-editor">
          <label>Thông tin chi tiết</label>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={
            hasOldData === true
              ? "save-content-restaurant"
              : "create-content-restaurant"
          }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {hasOldData === true ? (
            <span>Lưu thông tin </span>
          ) : (
            <span>Tạo thông tin</span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allRestaurantNames: state.admin.allRestaurantNames,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllRestaurantNames: () => dispatch(actions.fetchAllRestaurantNames()),
    saveDetailRestaurant: (data) =>
      dispatch(actions.saveDetailRestaurant(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtraInfoRestaurant);
