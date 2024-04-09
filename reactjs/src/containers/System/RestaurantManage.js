import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./RestaurantManage.scss";
import {
  getAllRestaurants,
  createNewRestaurantService,
  deleteRestaurantService,
  editRestaurantService,
} from "../../services/restaurantService";
import ModalRestaurant from "./ModalRestaurant";
import ModalEditRestaurant from "./ModalEditRestaurant";
import { emitter } from "../../utils/emitter";

class RestaurantManage extends Component {
  state = {};
  //constructor:
  //khi component được render thì nó sẽ check hàm constructor đầu tiên
  // khởi tạo những state (những biến mà ta muốn dùng class RestaurantManage này)
  constructor(props) {
    super(props);
    this.state = {
      arrRestaurants: [],
      isOpenModalRestaurant: false,
      isOpenModalEditRestaurant: false,
      restaurantEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllRestaurantsFromReact();
  }

  /**
   *Life cycle:
   Run component:
   1. Run constructor -> init state (khởi tạo những biến sẽ dùng)
   2. Run Did mount: khi nào muốn gán gtri cho 1 state nào đấy sẽ dùng trong hàm did mount 
   - gọi API lấy giá trị vào và set state cho component 
   - state lưu giá trị của các biến, và được dùng trong render 
   3. Run render 
   render cho ta nhìn thấy trên màn hình 
   *
   *
   *
   *
   */

  getAllRestaurantsFromReact = async () => {
    let response = await getAllRestaurants("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrRestaurants: response.restaurants,
      });
    }
  };

  handleAddNewHopot = () => {
    this.setState({
      isOpenModalRestaurant: true,
    });
  };

  toggleRestaurantModal = () => {
    this.setState({
      isOpenModalRestaurant: !this.state.isOpenModalRestaurant,
    });
  };

  toggleRestaurantEditModal = () => {
    this.setState({
      isOpenModalEditRestaurant: !this.state.isOpenModalEditRestaurant,
    });
  };

  createNewRestaurant = async (data) => {
    try {
      let response = await createNewRestaurantService(data);
      //   if (response && response.errCode !== 0) {
      //     alert(response.errMessage);
      //   } else {
      //     await this.getAllRestaurantsFromReact();
      //   }
      await this.getAllRestaurantsFromReact();
      this.setState({
        isOpenModalRestaurant: false,
      });
      emitter.emit("EVENT_CLEAR_MODAL_DATA");
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteRestaurant = async (restaurant) => {
    try {
      let res = await deleteRestaurantService(restaurant.id);
      if (res && res.errCode === 0) {
        await this.getAllRestaurantsFromReact();
      } else {
        alert(res.errMessage);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  handleEditRestaurant = (restaurant) => {
    this.setState({
      isOpenModalEditRestaurant: true,
      restaurantEdit: restaurant,
    });
  };

  doEditRestaurant = async (restaurant) => {
    try {
      let res = await editRestaurantService(restaurant);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEditRestaurant: false,
        });
        await this.getAllRestaurantsFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let arrRestaurants = this.state.arrRestaurants.restaurants;
    return (
      <div className="restaurants-container">
        <ModalRestaurant
          isOpen={this.state.isOpenModalRestaurant}
          toggleFromParent={this.toggleRestaurantModal}
          createNewRestaurant={this.createNewRestaurant}
        />
        {this.state.isOpenModalEditRestaurant && (
          <ModalEditRestaurant
            //isOpen={true}
            isOpen={this.state.isOpenModalEditRestaurant}
            toggleFromParent={this.toggleRestaurantEditModal}
            currentRestaurant={this.state.restaurantEdit}
            editRestaurant={this.doEditRestaurant}
          />
        )}

        <div className="title text-center">Manage restaurant</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewHopot()}
          >
            <i className="fas fa-plus"></i> Add new restaurant
          </button>
        </div>
        <div className="restaurants-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Name</th>
                <th>ProvinceId</th>
                <th>Phone number</th>
                <th>Type Id</th>
                <th>PriceId</th>
                <th>Note</th>
                <th>Action</th>
              </tr>

              {arrRestaurants &&
                arrRestaurants.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.provinceId}</td>
                      <td>{item.phonenumber}</td>
                      <td>{item.typeId}</td>
                      <td>{item.priceId}</td>
                      <td>{item.note}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditRestaurant(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteRestaurant(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantManage);
