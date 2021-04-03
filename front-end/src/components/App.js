import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Homepage from "./Homepage";
import FindRestaurantPage from "./FindRestaurantPage";
import RestaurantPage from "./RestaurantPage";
import Footer from "./Footer";
import styled from "styled-components";
import GlobalStyles from "../GlobalStyles";
import PreConfirmationPage from "./PreConfirmationPage";

const App = () => {
  return (
    <Wrapper>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/findRestaurant">
            <FindRestaurantPage />
          </Route>
          <Route exact path="/restaurant/:reference">
            <RestaurantPage />
          </Route>
          <Route exact path="/preconfirmation">
            <PreConfirmationPage />
          </Route>
        </Switch>
        <Footer />
        <GlobalStyles />
      </Router>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: calc(0.76 * 100vh);
  overflow: hidden;
  border-top-style: solid;
  border-left-style: solid;
  border-right-style: solid;
  border-width: 1px;
  border-color: #202020;
`;
