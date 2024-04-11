import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import RestaurantManage from "../containers/System/RestaurantManage";
import RestaurantRedux from "../containers/System/Admin/RestaurantRedux";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";
import ExtraInfoRestaurant from "../containers/System/Admin/ExtraInfoRestaurant";
import ManageSchedule from "../containers/System/Admin/ManageSchedule";
import ManageType from "../containers/System/Type/ManageType";
import ManageDish from "../containers/System/Dish/ManageDish";
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route
                path="/system/extra-info-restaurant"
                component={ExtraInfoRestaurant}
              />
              <Route
                path="/system/CRUD-restaurant"
                component={RestaurantManage}
              />
              <Route path="/system/CRUD-user" component={UserManage} />
              <Route
                path="/system/restaurant-redux"
                component={RestaurantRedux}
              />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/manage-type" component={ManageType} />
              <Route
                path="/system/schedule-manage"
                component={ManageSchedule}
              />
              <Route path="/system/manage-dish" component={ManageDish} />
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
