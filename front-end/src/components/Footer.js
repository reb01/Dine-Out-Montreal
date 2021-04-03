import React from "react";

import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <Wrapper>
        <FooterTextContainer>
          <FooterText>© 2021 - FABULOUS FEASTS</FooterText>
        </FooterTextContainer>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-style: solid;
  border-bottom-style: solid;
  border-width: 1px;
  border-color: gray;
  height: 100px;
  background-color: #3f3f3f;
`;

const FooterTextContainer = styled.div`
  display: flex;
  height: 14px;
  flex-wrap: wrap;
  font-family: "Alata", sans-serif;
  justify-content: center;
  align-items: center;
  color: #ffffff;
`;

const FooterText = styled.p`
  position: absolute;
`;

export default Footer;
