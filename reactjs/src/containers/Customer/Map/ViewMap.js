import React, { useRef, useState } from "react";
import "./ViewMap.scss";
import { MapContainer, TileLayer } from "react-leaflet";
import osm from "./osm-provider";

const ViewMap = () => {
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef(null);

  return (
    <>
      <div className="row">
        <div className="col text-center">
          <h2>React-leaflet - Bản đồ cơ bản OpenStreetMap</h2>
          <p>Đang tải bản đồ cơ bản sử dụng lớp từ maptiler</p>
          <div className="col">
            <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
              <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
              />
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewMap;
