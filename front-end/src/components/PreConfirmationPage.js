import React from "react";
import Profile from "./Profile";

import styled from "styled-components";

const PreConfirmationPage = () => {
  const valueOfPeople = localStorage.getItem("valuePeople");
  console.log("valuePeople");
  const valueOfDate = localStorage.getItem("valueDate");
  localStorage.getItem("valueTime");
  return (
    <>
      <div>{valueOfPeople}</div>
      <div>{valueOfDate}</div>

      <Profile />
    </>
  );
};

export default PreConfirmationPage;
