import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ExtraInfoHotpot.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDetailInfoHotpot } from "../../../services/hotpotService";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ExtraInfoHotpot extends Component {
  state = {};
  //constructor:
  //khi component được render thì nó sẽ check hàm constructor đầu tiên
  // khởi tạo những state (những biến mà ta muốn dùng class ManageHotpot này)
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedHotpot: "",
      description: "",
      listHotpotNames: [],
      hasOldData: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllHotpotNames();
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = `${item.name}`;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allHotpotNames !== this.props.allHotpotNames) {
      let dataSelect = this.buildDataInputSelect(this.props.allHotpotNames);
      this.setState({
        listHotpotNames: dataSelect,
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
    this.props.saveDetailHotpot({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      hotpotId: this.state.selectedHotpot.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
  };

  handleChangeSelect = async (selectedHotpot) => {
    this.setState({ selectedHotpot });
    let res = await getDetailInfoHotpot(selectedHotpot.value);
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
      <div className="manage-hotpot-container">
        <div className="manage-hotpot-title">Tạo thêm thông tin món lẩu</div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>Chọn món lẩu</label>
            <Select
              value={this.state.selectedHotpot}
              onChange={this.handleChangeSelect}
              options={this.state.listHotpotNames}
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
        <div className="manage-hotpot-editor">
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
              ? "save-content-hotpot"
              : "create-content-hotpot"
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
    allHotpotNames: state.admin.allHotpotNames,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllHotpotNames: () => dispatch(actions.fetchAllHotpotNames()),
    saveDetailHotpot: (data) => dispatch(actions.saveDetailHotpot(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtraInfoHotpot);
