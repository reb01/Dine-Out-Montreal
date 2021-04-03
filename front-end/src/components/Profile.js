import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Profile = ({ valueDate, valueTime, valuePeople }) => {
  const { user } = useAuth0();
  return (
    <Div>
      {JSON.stringify(user, null, 2)}
      {/* {valueDate[1]}
      {valueTime[1]}
      {valuePeople} */}
    </Div>
  );
};

const Div = styled.div`
  color: black;
`;
export default Profile;
