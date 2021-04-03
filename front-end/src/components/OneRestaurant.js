import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import styled from "styled-components";

const OneRestaurant = ({ restoByName }) => {
  return (
    <>
      <Wrapper>
        {" "}
        <Link to={`restaurant/${restoByName[0].name}`}>
          <PhotosContent
            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restoByName[0]["photos"][0]["photo_reference"]}&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            width={100}
            height={100}
          />{" "}
        </Link>
        <WrapperToColumn>
          <LocationName>{restoByName[0].name}</LocationName>
          <LocationAddress>{restoByName[0].formatted_address}</LocationAddress>
          <RatingWrapper>
            <LocationRating>{restoByName[0].rating}</LocationRating>
            <ReactStars
              value={restoByName[0].rating}
              name="rating"
              readOnly="true"
              isHalf="true"
            />
            <LocationRating>
              {restoByName.user_ratings_total} Customer reviews
            </LocationRating>
          </RatingWrapper>
          <PriceWrapper>
            {restoByName[0].price_level === 1
              ? "$"
              : restoByName[0].price_level === 2
              ? "$$"
              : restoByName[0].price_level === 3
              ? "$$$"
              : restoByName[0].price_level === 4
              ? "$$$$"
              : ""}
          </PriceWrapper>
        </WrapperToColumn>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 150px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #ffffff;
`;
const WrapperToColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  padding: 20px;
`;
const PhotosContent = styled.img`
  display: flex;
  border-radius: 10px;
  min-width: 150px;
  min-height: 150px;
`;
const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const LocationName = styled.div`
  display: flex;
  font-size: 20px;
  padding: 5px;
`;
const LocationAddress = styled.div`
  display: flex;
  padding: 5px;
`;
const LocationRating = styled.div`
  display: flex;
  padding: 5px;
`;
const PriceWrapper = styled.span`
  display: flex;
  padding: 5px;
`;
export default OneRestaurant;
