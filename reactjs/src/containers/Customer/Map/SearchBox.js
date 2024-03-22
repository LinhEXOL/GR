import React, { Component } from "react";
import { connect } from "react-redux";
import "./SearchBox.scss";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import markerImage from "../../../assets/images/marker.png";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "", // Khởi tạo searchText
      listPlace: [],
    };
  }

  handleInputChange = (event) => {
    this.setState({ searchText: event.target.value }); // Cập nhật searchText khi có thay đổi
  };

  handleListPlace = (response) => {
    // Kiểm tra nếu response không phải là mảng hoặc là mảng rỗng
    if (!Array.isArray(response) || response.length === 0) {
      this.setState({ listPlace: [] });
      return;
    }

    // Lấy danh sách các địa điểm từ phản hồi API và cập nhật vào state listPlace
    const places = response;
    this.setState({ listPlace: places });
  };

  handleSelect = (selectedPlace) => {
    // Xử lý logic khi chọn vị trí trong component con
    const { display_name } = selectedPlace;
    this.setState({ searchText: display_name, listPlace: [] });
    // Gọi hàm handelSelectPosition được truyền từ cha
    this.props.handelSelectPosition(selectedPlace);
  };

  handleClear = () => {
    // Xử lý khi nhấn vào biểu tượng Clear
    this.setState({ searchText: "", listPlace: [] });
    // Gọi hàm handleClearPlace được truyền từ cha
    this.props.handleClearPlace();
  };

  //   componentDidUpdate(prevProps, prevState) {
  //     // Kiểm tra xem isClearPlace đã thay đổi từ true thành false
  //     if (prevState.isClearPlace && !this.state.isClearPlace) {
  //       // Cập nhật isClearPlace của SearchBox thành false khi nhận được thông báo từ cha
  //       this.setState({ isClearPlace: false });
  //     }
  //   }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.search();
    }
  };

  search = () => {
    const { searchText } = this.state;
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.handleListPlace(result);
      })
      .catch((err) => console.log("err:", err));
  };

  render() {
    const { searchText, listPlace } = this.state;
    return (
      <div className="search-box-container">
        <div className="up">
          <div className="search-info">
            <OutlinedInput
              value={searchText}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              placeholder="Search..."
              startAdornment={
                <InputAdornment position="start">
                  <i className="fas fa-search" />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  {searchText && (
                    <i
                      className="fas fa-times"
                      onClick={this.handleClear}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </InputAdornment>
              }
            />
          </div>
        </div>

        {listPlace.length > 0 && (
          <div className="search-list">
            <List component="nav" aria-label="main mailbox folders">
              {listPlace.map((item) => (
                <div key={item.osm_id}>
                  <ListItem button onClick={() => this.handleSelect(item)}>
                    <ListItemIcon>
                      <img
                        className="img"
                        src={markerImage}
                        alt="Placeholder"
                      />
                    </ListItemIcon>
                    <ListItemText primary={item.display_name} />
                  </ListItem>
                </div>
              ))}
            </List>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
