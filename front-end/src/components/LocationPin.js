import React from "react";
import styled from "styled-components";

import { RiMapPin2Fill } from "react-icons/ri";

const LocationPin = ({ text }) => (
  <Pin>
    <RiMapPin2Fill size="35" />
    <p className="pin-text">{text}</p>
  </Pin>
);

export default LocationPin;

const Pin = styled.div`
  display: flex;
  width: 300px;
  font-weight: bold;
`;
