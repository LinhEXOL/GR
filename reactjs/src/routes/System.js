import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import HotpotManage from "../containers/System/HotpotManage";
import HotpotRedux from "../containers/System/Admin/HotpotRedux";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";
import ManageHotpot from "../containers/System/Admin/ManageHotpot";
import ManageSchedule from "../containers/System/Admin/ManageSchedule";
import ManageType from "../containers/System/Type/ManageType";
import ManageRestaurant from "../containers/System/Restaurant/ManageRestaurant";
import ManageHp from "../containers/System/Hp/ManageHp";
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/manage-hotpot" component={ManageHotpot} />
              <Route path="/system/CRUD-hotpot" component={HotpotManage} />
              <Route path="/system/CRUD-user" component={UserManage} />
              <Route path="/system/hotpot-redux" component={HotpotRedux} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/manage-type" component={ManageType} />
              <Route
                path="/system/manage-restaurant"
                component={ManageRestaurant}
              />
              <Route
                path="/system/schedule-manage"
                component={ManageSchedule}
              />
              <Route path="/system/manage-hp" component={ManageHp} />
              component=
              {() => {
                return <Redirect to={systemMenuPath} />;
              }}
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
