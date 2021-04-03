import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logoforproject (1).png";

import { useHistory } from "react-router-dom";
// import LoginButton from "./LoginButton";
// import LogoutButton from "./LogoutButton";

// import { useAuth0 } from "@auth0/auth0-react";

console.log(logo);
const Header = () => {
  // const { isLoading } = useAuth0();
  const history = useHistory();

  // if (isLoading) return <div>Loading...</div>;
  return (
    <Wrapper>
      <Logo to="/">
        <img
          src={logo}
          alt="Logo"
          width="110px"
          onClick={() => {
            history.push("/");
          }}
        />
      </Logo>
      <Dropdown>
        <NavLink
          exact
          to="/"
          activeStyle={{
            fontWeight: "bold",
            color: "white",
          }}
        >
          HOME
        </NavLink>
      </Dropdown>
      {/* <LoginButton />
      <LogoutButton /> */}
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-width: 1px;
  border-color: #202020;
  border-bottom-style: solid;
  border-width: 1px;
  border-color: gray;
  height: 120px;
  padding-left: 40px;
  padding-right: 100px;
  background-color: #202020;
`;
const Logo = styled(NavLink)``;
const Dropdown = styled.div``;
