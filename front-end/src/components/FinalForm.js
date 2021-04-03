import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const initialState = {
  restaurantsCuisines: "",
  location: "",
};

const FinalForm = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const submitForm = (e) => {
    e.preventDefault();
    // console.log("formData1", formData);
    dispatch({
      type: "SET_FORMVALUES",
      payload: formData,
    });
    history.push("/findRestaurant");
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    // console.log("infinalform", name, value);
    setFormData((formData) => ({ ...formData, [name]: value }));
  }
  // console.log("formData2", formData);
  return (
    <>
      <form onSubmit={submitForm}>
        <InputWrapper>
          <Input
            name="restaurantsCuisines"
            placeholder="Search by Restaurant name"
            type="text"
            onChange={handleInputChange}
            value={formData.restaurantsCuisines}
          />
          <Input
            name="location"
            placeholder="Search by Restaurant Location"
            type="text"
            onChange={handleInputChange}
            value={formData.location}
          />
          <Button type="submit">Find</Button>
        </InputWrapper>
      </form>
    </>
  );
};

const InputWrapper = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  width: 80%;
  top: 400px;
  left: 320px;
  border-color: lightgrey;
`;
const Input = styled.input`
  width: 20vw;
  height: 35px;
  margin-right: 25px;
  font-size: 17px;
  color: black;
  opacity: 80%;
`;
const Button = styled.button`
  width: 10vw;
  height: 35px;
  background-color: #ffdf6c;
  font-size: 17px;
  color: black;
`;

export default FinalForm;
