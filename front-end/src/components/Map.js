import React from "react";
import GoogleMapReact from "google-map-react";
import LocationPin from "./LocationPin";
import styled from "styled-components";

const Map = ({ location, zoomLevel, name }) => {
  return (
    <>
      <Wrapper>
        <Map1>
          <MapActual>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_KEY,
              }}
              defaultCenter={location}
              defaultZoom={zoomLevel}
            >
              <LocationPin lat={location.lat} lng={location.lng} text={name} />
            </GoogleMapReact>
          </MapActual>
          {/* <Address>
            <Bold>Restaurant here</Bold>
          </Address> */}
        </Map1>
      </Wrapper>
    </>
  );
};

export default Map;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Map1 = styled.div`
  height: 450px;
  width: 450px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const MapActual = styled.div`
  display: flex;
  /* padding: 0 90px; */
  height: 335px;
  width: 335px;
`;
// const Address = styled.div`
//   width: 100%;
//   margin-top: 30px;
//   display: flex;
//   font-size: 17px;
//   justify-content: center;
//   height: 20px;
// `;

// const Bold = styled.div`
//   font-weight: bold;
//   margin-left: 10px;
// `;
