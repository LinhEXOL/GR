import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageHotpot.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageHotpot extends Component {
  state = {};
  //constructor:
  //khi component được render thì nó sẽ check hàm constructor đầu tiên
  // khởi tạo những state (những biến mà ta muốn dùng class TableManageHotpot này)
  constructor(props) {
    super(props);
    this.state = {
      hotpotsRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchHotpotRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listHotpots !== this.props.listHotpots) {
      this.setState({
        hotpotsRedux: this.props.listHotpots,
      });
    }
  }

  handleDeleteHotpot = (hotpot) => {
    this.props.deleteHotpotRedux(hotpot.id);
  };

  handleEditHotpot = (hotpot) => {
    console.log("hotpot edit:", hotpot);
    this.props.handleEditHotpot(hotpot);
  };

  render() {
    console.log("check all hotpot", this.props.listHotpots);
    console.log("check state:", this.state.hotpotsRedux);
    let arrHotpots = this.state.hotpotsRedux;
    return (
      <React.Fragment>
        <table id="TableManageHotpot">
          <tbody>
            <tr>
              <th>Name</th>
              <th>ProvinceId</th>
              <th>Phone number</th>
              <th>Restaurant Id</th>
              <th>Type Id</th>
              <th>PriceId</th>
              <th>Note</th>
              <th>PaymentId</th>
              <th>Action</th>
            </tr>

            {arrHotpots &&
              arrHotpots.length > 0 &&
              arrHotpots.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.provinceId}</td>
                    <td>{item.phonenumber}</td>
                    <td>{item.restaurantId}</td>
                    <td>{item.typeId}</td>
                    <td>{item.priceId}</td>
                    <td>{item.note}</td>
                    <td>{item.paymentId}</td>
                    <td>
                      <button
                        onClick={() => this.handleEditHotpot(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        onClick={() => this.handleDeleteHotpot(item)}
                        className="btn-delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {/* <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        /> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listHotpots: state.admin.hotpots,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHotpotRedux: () => dispatch(actions.fetchAllHotpotsStart()),
    deleteHotpotRedux: (id) => dispatch(actions.deleteHotpot(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageHotpot);
