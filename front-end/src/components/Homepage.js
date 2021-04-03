import React from "react";
import styled from "styled-components";
import SliderCarouselOpenNow from "./SliderCarouselOpenNow";
import SliderCarouselNearYou from "./SliderCarouselNearYou";
import FinalForm from "./FinalForm";
import logo from "../assets/HomeBanner.jpg";

console.log(logo);

const Homepage = () => {
  return (
    <>
      <Wrapper>
        <Logo>
          <img src={logo} alt="Logo" style={{ width: "100%" }} />
        </Logo>
        <FinalForm />
        <SliderCarouselNearYou />
        <SliderCarouselOpenNow />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
  justify-content: center;
  min-height: 70vh;
  background-color: #ffffff;
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #999999;
`;
export default Homepage;
