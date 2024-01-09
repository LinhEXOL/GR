import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./HotpotManage.scss";
import {
  getAllHotpots,
  createNewHotpotService,
  deleteHotpotService,
  editHotpotService,
} from "../../services/hotpotService";
import ModalHotpot from "./ModalHotpot";
import ModalEditHotpot from "./ModalEditHotpot";
import { emitter } from "../../utils/emitter";

class HotpotManage extends Component {
  state = {};
  //constructor:
  //khi component được render thì nó sẽ check hàm constructor đầu tiên
  // khởi tạo những state (những biến mà ta muốn dùng class HotpotManage này)
  constructor(props) {
    super(props);
    this.state = {
      arrHotpots: [],
      isOpenModalHotpot: false,
      isOpenModalEditHotpot: false,
      hotpotEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllHotpotsFromReact();
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

  getAllHotpotsFromReact = async () => {
    let response = await getAllHotpots("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrHotpots: response.hotpots,
      });
    }
  };

  handleAddNewHopot = () => {
    this.setState({
      isOpenModalHotpot: true,
    });
  };

  toggleHotpotModal = () => {
    this.setState({
      isOpenModalHotpot: !this.state.isOpenModalHotpot,
    });
  };

  toggleHotpotEditModal = () => {
    this.setState({
      isOpenModalEditHotpot: !this.state.isOpenModalEditHotpot,
    });
  };

  createNewHotpot = async (data) => {
    try {
      let response = await createNewHotpotService(data);
      //   if (response && response.errCode !== 0) {
      //     alert(response.errMessage);
      //   } else {
      //     await this.getAllHotpotsFromReact();
      //   }
      await this.getAllHotpotsFromReact();
      this.setState({
        isOpenModalHotpot: false,
      });
      emitter.emit("EVENT_CLEAR_MODAL_DATA");
    } catch (e) {
      console.log(e);
    }

    console.log("check data from", data);
  };

  handleDeleteHotpot = async (hotpot) => {
    console.log("click delete", hotpot);
    try {
      let res = await deleteHotpotService(hotpot.id);
      if (res && res.errCode === 0) {
        await this.getAllHotpotsFromReact();
      } else {
        alert(res.errMessage);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  handleEditHotpot = (hotpot) => {
    console.log("check edit hotpot", hotpot);
    this.setState({
      isOpenModalEditHotpot: true,
      hotpotEdit: hotpot,
    });
  };

  doEditHotpot = async (hotpot) => {
    try {
      let res = await editHotpotService(hotpot);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEditHotpot: false,
        });
        await this.getAllHotpotsFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let arrHotpots = this.state.arrHotpots.hotpots;
    console.log("check arr", arrHotpots);
    console.log("Type of arrHotpots:", typeof arrHotpots);
    return (
      <div className="hotpots-container">
        <ModalHotpot
          isOpen={this.state.isOpenModalHotpot}
          toggleFromParent={this.toggleHotpotModal}
          createNewHotpot={this.createNewHotpot}
        />
        {this.state.isOpenModalEditHotpot && (
          <ModalEditHotpot
            //isOpen={true}
            isOpen={this.state.isOpenModalEditHotpot}
            toggleFromParent={this.toggleHotpotEditModal}
            currentHotpot={this.state.hotpotEdit}
            editHotpot={this.doEditHotpot}
          />
        )}

        <div className="title text-center">Manage hotpot</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewHopot()}
          >
            <i className="fas fa-plus"></i> Add new hotpot
          </button>
        </div>
        <div className="hotpots-table mt-3 mx-1">
          <table id="customers">
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
                arrHotpots.map((item, index) => {
                  return (
                    <tr>
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
                          className="btn-edit"
                          onClick={() => this.handleEditHotpot(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteHotpot(item)}
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

export default connect(mapStateToProps, mapDispatchToProps)(HotpotManage);
