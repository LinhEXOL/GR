import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./HotpotManage.scss";
import { emitter } from "../../utils/emitter";
import { getAllUsers } from "../../services/userService";

class UserManage extends Component {
  state = {};
  //constructor:
  //khi component được render thì nó sẽ check hàm constructor đầu tiên
  // khởi tạo những state (những biến mà ta muốn dùng class HotpotManage này)
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;
    console.log("user:", arrUsers);
    return (
      <div className="hotpots-container">
        <div className="title text-center">Manage user</div>
        <div className="hotpots-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone number</th>
                <th>Address</th>
              </tr>

              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.phonenumber}</td>
                      <td>{item.address}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
