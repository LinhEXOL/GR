import React, { Component } from "react";
import "./Restaurant.scss";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
import {
  getRestaurantByLocation,
  getAllCodeService,
} from "../../../services/restaurantService";
import _ from "lodash";
class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrRestaurantId: [],
      arrRestaurants: [],
      listProvince: [],
      searchValue: "",
      currentPage: 1,
      restaurantsPerPage: 8,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topRestaurantsRedux !== this.props.topRestaurantsRedux) {
      this.setState({
        arrRestaurants: this.props.topRestaurantsRedux,
      });
    }
  }

  async componentDidMount() {
    this.props.loadTopRestaurants();
    let res = await getRestaurantByLocation("ALL");
    let resProvince = await getAllCodeService("PROVINCE");
    if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
      let data = res.data;
      let arrRestaurantId = [];
      if (data && !_.isEmpty(data)) {
        // let arr = data.restaurantType;
        // console.log("data.restaurantType", arr);
        // if (arr && arr.length > 0) {
        //   arr.map((item) => {
        //     arrrestaurantId.push(item.id);
        //     console.log("id", item.id);
        //   });
        // }

        data.map((item) => {
          arrRestaurantId.push(item.id);
        });
      }

      let dataProvince = resProvince.data;
      if (dataProvince && dataProvince.length > 0) {
        dataProvince.unshift({
          createAt: null,
          keyMap: "ALL",
          type: "PROVINCE",
          valueEn: "All",
          valueVi: "Toàn quốc",
        });
      }

      this.setState({
        arrRestaurantId: arrRestaurantId,
        listProvince: dataProvince ? dataProvince : [],
      });
    } else {
      console.log("LOI");
    }
  }

  handleViewDetailRestaurant = (restaurant) => {
    this.props.history.push(`/detail-hotpotRestaurant/${restaurant.id}`);
  };

  handleOnChangeSelect = async (event) => {
    let location = event.target.value;
    let res = await getRestaurantByLocation(location);
    if (res && res.errCode === 0) {
      let data = res.data;
      let arrRestaurants = [];
      arrRestaurants = data;
      // let arrRestaurantId = [];
      // if (data && !_.isEmpty(data)) {
      //   if (data && data.length > 0) {
      //     data.map((item) => {
      //       arrRestaurantId.push(item.id);
      //     });
      //   }
      // }

      this.setState({
        //arrRestaurantId: arrRestaurantId,
        arrRestaurants: arrRestaurants,
      });
    } else {
      console.log("LOOOIIII");
    }
  };

  handleOnChangeSearch = (event) => {
    const searchValue = event.target.value; // Lấy giá trị tìm kiếm từ trường input
    this.setState({ searchValue }); // Lưu vào state
  };

  render() {
    let arrRestaurants = this.state.arrRestaurants;
    let filteredRestaurants = this.state.arrRestaurants.filter((restaurant) =>
      restaurant.name
        .toLowerCase()
        .includes(this.state.searchValue.toLowerCase())
    );
    arrRestaurants = filteredRestaurants;
    let { currentPage, restaurantsPerPage } = this.state;
    let startIndex = (currentPage - 1) * restaurantsPerPage;
    let endIndex = startIndex + restaurantsPerPage;
    let currentRestaurants = arrRestaurants.slice(startIndex, endIndex);
    let { listProvince } = this.state;
    let { language } = this.props;

    //arrRestaurants = arrRestaurants.concat(arrRestaurants).concat(arrRestaurants); //its đata quá fai tạo thêm
    return (
      <div id="restaurant-section" className="body">
        <div className="restaurant-search">
          <div className="container">
            <div className="row">
              <div className="col-md-2 search-location">
                <select onChange={(event) => this.handleOnChangeSelect(event)}>
                  {listProvince &&
                    listProvince.length > 0 &&
                    listProvince.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-md-8 search-name">
                <input
                  type="text"
                  placeholder="Search by name" // Placeholder cho trường tìm kiếm
                  onChange={this.handleOnChangeSearch} // Xử lý sự kiện thay đổi giá trị tìm kiếm
                />
              </div>
            </div>
          </div>
        </div>

        <div className="section-share section-restaurant">
          <div className="section-container">
            <div className="section-header">
              <h1>
                Thế giới nhà hàng LẨU ngon, thực đơn món nhúng lẩu đa dạng!
              </h1>
              <p>
                Thưởng thức hương vị trọn vẹn với vô số các loại lẩu từ khắp nơi
                trên thế giới như lẩu Thái, lẩu Hàn Quốc, lẩu Nhật Bản, lẩu
                Trung Quốc, lẩu Việt Nam,...đã được chúng tôi lựa chọn & tổng
                hợp lại ở bên dưới. Với mức giá từ BÌNH DÂN đến CAO CẤP sẽ giúp
                bạn có thể dễ dàng lựa chọn một địa chỉ ăn uống phù hợp nhất.
                Xem ngay!
              </p>

              {/* <span className="title-section">
                <FormattedMessage id="homepage.outstanding-restaurant" />
                
              </span> */}
              {/* <button className="btn-section">
                <FormattedMessage id="homepage.more-info" />
              </button> */}
            </div>
            {/* <div className="section-body">
              <Slider {...this.props.settings}>
                {arrRestaurants &&
                  arrRestaurants.length > 0 &&
                  arrRestaurants.map((item, index) => {
                    let imageBase64 = "";
                    let name = `${item.name}`;
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    return (
                      <div
                        className="section-customize"
                        key={index}
                        onClick={() => this.handleViewDetailRestaurant(item)}
                      >
                        <div className="customize-border">
                          <div className="outer-bg">
                            <div
                              className="bg-image section-restaurant"
                              style={{
                                backgroundImage: `url(${imageBase64})`,
                              }}
                            />
                          </div>
                          <div className="position text-center">
                            <div>{name}</div>
                            <div>Lẩu buffet</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div> */}
            <div className="section-body">
              <div className="restaurant-list">
                {currentRestaurants &&
                  currentRestaurants.length > 0 &&
                  currentRestaurants.map((item, index) => {
                    let imageBase64 = "";
                    let name = `${item.name}`;
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    return (
                      <div
                        className="section-customize"
                        key={index}
                        onClick={() => this.handleViewDetailRestaurant(item)}
                      >
                        <div className="customize-border">
                          <div className="outer-bg">
                            <div
                              className="bg-image section-restaurant"
                              style={{
                                backgroundImage: `url(${imageBase64})`,
                              }}
                            />
                          </div>
                          <div className="position">
                            <div className="name">{name}</div>
                            <div className="address">{item.note}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Phần phân trang */}
              <div className="pagination">
                {arrRestaurants.length > restaurantsPerPage &&
                  Array.from(
                    {
                      length: Math.ceil(
                        arrRestaurants.length / restaurantsPerPage
                      ),
                    },
                    (_, i) => (
                      <button
                        key={i}
                        className={i + 1 === currentPage ? "active" : ""}
                        onClick={() => this.setState({ currentPage: i + 1 })}
                      >
                        {i + 1}
                      </button>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//mapStateToProps: map state của redux vào react (Props), redux có thể lấy các biến qua câu lệnh this.props

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topRestaurantsRedux: state.admin.topRestaurants,
  };
};

//fire events của redux
const mapDispatchToProps = (dispatch) => {
  return {
    loadTopRestaurants: () => dispatch(actions.fetchTopRestaurant()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Restaurant)
);
//connect:kết nối react với redux
//

/**
 * muốn lưu thông tin vào redux thì phải fire actions của nó
 * muốn lấy thông tin thì dùng hàm map và lấy qua biến props
 */
