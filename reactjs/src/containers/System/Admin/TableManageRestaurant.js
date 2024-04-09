import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageRestaurant.scss";
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

class TableManageRestaurant extends Component {
  state = {};
  //constructor:
  //khi component được render thì nó sẽ check hàm constructor đầu tiên
  // khởi tạo những state (những biến mà ta muốn dùng class TableManageRestaurant này)
  constructor(props) {
    super(props);
    this.state = {
      restaurantsRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchRestaurantRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listRestaurants !== this.props.listRestaurants) {
      this.setState({
        restaurantsRedux: this.props.listRestaurants,
      });
    }
  }

  handleDeleteRestaurant = (restaurant) => {
    this.props.deleteRestaurantRedux(restaurant.id);
  };

  handleEditRestaurant = (restaurant) => {
    this.props.handleEditRestaurant(restaurant);
  };

  render() {
    let arrRestaurants = this.state.restaurantsRedux;
    return (
      <React.Fragment>
        <table id="TableManageRestaurant">
          <tbody>
            <tr>
              <th>Name</th>
              <th>ProvinceId</th>
              <th>Staff Id</th>
              <th>Type Id</th>
              <th>PriceId</th>
              <th>Address</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>

            {arrRestaurants &&
              arrRestaurants.length > 0 &&
              arrRestaurants.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.provinceId}</td>
                    <td>{item.staffId}</td>
                    <td>{item.typeId}</td>
                    <td>{item.priceId}</td>
                    <td>{item.address}</td>
                    <td>{item.latitude}</td>
                    <td>{item.longitude}</td>
                    <td>{item.phoneBumber}</td>

                    <td>
                      <button
                        onClick={() => this.handleEditRestaurant(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        onClick={() => this.handleDeleteRestaurant(item)}
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
    listRestaurants: state.admin.restaurants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRestaurantRedux: () => dispatch(actions.fetchAllRestaurantsStart()),
    deleteRestaurantRedux: (id) => dispatch(actions.deleteRestaurant(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageRestaurant);
