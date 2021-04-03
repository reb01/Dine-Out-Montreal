import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getStoreItemArray } from "../reducers";
import styled, { keyframes } from "styled-components";
import { spinner6 } from "react-icons-kit/icomoon/spinner6";
import { Icon } from "react-icons-kit";
import ReactStars from "react-rating-stars-component";
import Posts from "./Posts";
import Pagination from "./Pagination";
import OneRestaurant from "./OneRestaurant";
import TwoRestaurants from "./TwoRestaurants";

const FindRestaurantPage = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [restoByName, setRestoByName] = useState([]);
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [filterBy4Stars, setfilterBy4Stars] = useState(false);
  const [filterBy3Stars, setfilterBy3Stars] = useState(false);
  const [filterBy2Stars, setfilterBy2Stars] = useState(false);
  const [filterBy1Star, setfilterBy1Star] = useState(false);
  const [radio, setRadio] = useState("allResults");
  const [dropDownState, setDropDownState] = useState("Relevance");
  // const state = useSelector((state) => state);
  // console.log("state", state);
  const storeItems = useSelector(getStoreItemArray);
  console.log("storeItems", storeItems);

  useEffect(() => {
    const location1 =
      storeItems[0].restaurantsCuisines === "" && storeItems[0].location !== 0
        ? storeItems[0].location
        : "";
    // console.log("location1", location1);
    setLocation(location1);
    // console.log("location", location);
    const url1 = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+${storeItems[0].location}+canada&key=${process.env.REACT_APP_GOOGLE_KEY}`;
    // console.log(url1);
    fetch(url1)
      .then((response) => response.json())
      .then((response) => {
        setData(response.results);
        console.log("data", data);
        // setPosts(response.results);
        setLoading(false);

        // console.log("response2", response.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [storeItems[0].location]);
  console.log("data", data);
  useEffect(() => {
    const RestaurantNameFromInput =
      storeItems[0].restaurantsCuisines !== "" && storeItems[0].location !== ""
        ? storeItems[0].restaurantsCuisines
        : storeItems[0].restaurantsCuisines !== "" &&
          storeItems[0].location === ""
        ? storeItems[0].restaurantsCuisines
        : "";

    // Actual restaurant name from redux
    // console.log("RestaurantNameFromInput", RestaurantNameFromInput);
    setRestaurantName(RestaurantNameFromInput);
    // console.log("restaurantName", restaurantName);
    // URL to find restaurant by name search
    const findRestaurantByNameURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${storeItems[0].restaurantsCuisines}&inputtype=textquery&fields=photos,reference,formatted_address,name,rating,opening_hours,price_level,geometry&&locationbias=circle:2000@45.5035,73.5685&key=${process.env.REACT_APP_GOOGLE_KEY}`;
    // console.log("findRestaurantByNameURL", findRestaurantByNameURL);

    fetch(findRestaurantByNameURL)
      .then((response) => response.json())
      .then((response) => {
        setRestoByName(response.candidates);
        // console.log("restoByName", response.candidates);
        // console.log("responseRestoName", response.candidates[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  // console.log("currentPosts", currentPosts);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!data || !restoByName) {
    return (
      <SpinnerWrapper>
        <StyledIcon size={50} icon={spinner6} />
      </SpinnerWrapper>
    );
  }

  return (
    <>
      <MainWrapper>
        <LeftColumnWrapper>
          <form>
            <FilteredBy>Filtered by: </FilteredBy>
            <Divider />
            <Reviews>Review score</Reviews>
            <FourStars>
              {" "}
              <Input
                className="form-check-input"
                type="checkbox"
                id="filterBy4Stars"
                checked={filterBy4Stars}
                onChange={(e) => {
                  setfilterBy4Stars(e.target.checked);
                }}
              />
              <ReactStars value={4} name="rating" readOnly="true" />
              <Text>reviews & Up</Text>
            </FourStars>
            <ThreeStars>
              <Input
                className="form-check-input"
                type="checkbox"
                id="filterBy3Stars"
                checked={filterBy3Stars}
                onChange={(e) => {
                  setfilterBy3Stars(e.target.checked);
                }}
              />
              <ReactStars value={3} name="rating" readOnly="true" />
              <Text>reviews & Up</Text>
            </ThreeStars>
            <TwoStars>
              <Input
                className="form-check-input"
                type="checkbox"
                id="filterBy2Stars"
                checked={filterBy2Stars}
                onChange={(e) => {
                  setfilterBy2Stars(e.target.checked);
                }}
              />
              <ReactStars value={2} name="rating" readOnly="true" />
              <Text>reviews & Up</Text>
            </TwoStars>
            <OneStar>
              <Input
                className="form-check-input"
                type="checkbox"
                id="filterBy1Star"
                checked={filterBy1Star}
                onChange={(e) => {
                  setfilterBy1Star(e.target.checked);
                }}
              />
              <ReactStars value={1} name="rating" readOnly="true" />
              <Text>reviews & Up</Text>
            </OneStar>
            <Divider />
            <Price>Price</Price>
            <CostWrapper>
              <Input
                type="radio"
                checked={radio === "allResults"}
                value="allResults"
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              />
              <AllResults>All Results</AllResults>
            </CostWrapper>
            <CostWrapper>
              <Input
                type="radio"
                checked={radio === "cheap"}
                value="cheap"
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              />
              <OneDollar>$</OneDollar>
            </CostWrapper>
            <CostWrapper>
              {" "}
              <Input
                type="radio"
                checked={radio === "lessCheap"}
                value="lessCheap"
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              />
              <TwoDollars>$$</TwoDollars>
            </CostWrapper>
            <CostWrapper>
              <Input
                type="radio"
                checked={radio === "lessExpensive"}
                value="lessExpensive"
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              />
              <ThreeDollars>$$$</ThreeDollars>
            </CostWrapper>
            <CostWrapper>
              {" "}
              <Input
                type="radio"
                checked={radio === "expensive"}
                value="expensive"
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              />
              <FourDollars>$$$$</FourDollars>
            </CostWrapper>
            {/* {console.log("radio", radio)} */}
            <Divider />
            <DiningOptions>Dining options</DiningOptions>
            <AllDiningOptions>All dining options</AllDiningOptions>
            <DeliveryOnly>Delivery only</DeliveryOnly>
            <TakeoutOnly>Takeout only</TakeoutOnly>
            <Divider />
            <SeatingOptions>Seating options</SeatingOptions>
            <Divider />
          </form>
        </LeftColumnWrapper>
        <RightColumnWrapper>
          {restoByName !== [] && location === "" && restaurantName !== "" && (
            <DropDownWrapper>
              <Heading>Result for "{restaurantName}"</Heading>
              <DropDown
                value={dropDownState}
                onChange={(e) => {
                  setDropDownState(e.target.value);
                }}
              >
                return
                <option value={"Relevance"}>{"Relevance"}</option>;
                <option value={"Top rated"}>{"Top rated"}</option>;
                <option value={"Worst rated"}>{"Worst rated"}</option>;
                <option value={"Most reviewed"}>{"Most reviewed"}</option>;
                <option value={"Most expensive"}>{"Most expensive"}</option>;
                <option value={"Least expensive"}>{"Least expensive"}</option>
              </DropDown>
            </DropDownWrapper>
          )}
          {console.log("dropDownState", dropDownState)}
          {data !== [] && restaurantName === "" && location !== "" && (
            <DropDownWrapper>
              <Heading>Restaurants in "{location}"</Heading>
              <DropDown
                value={dropDownState}
                onChange={(e) => {
                  setDropDownState(e.target.value);
                }}
              >
                return
                <option value={"Relevance"}>{"Relevance"}</option>;
                <option value={"Top rated"}>{"Top rated"}</option>;
                <option value={"Worst rated"}>{"Worst rated"}</option>;
                <option value={"Most reviewed"}>{"Most reviewed"}</option>;
                <option value={"Most expensive"}>{"Most expensive"}</option>;
                <option value={"Least expensive"}>{"Least expensive"}</option>
              </DropDown>
            </DropDownWrapper>
          )}
          {location === "" && restaurantName === "" && (
            <SearchAgain>
              Please search for a restaurant by name or location
            </SearchAgain>
          )}
          {location !== "" && (
            <>
              {filterBy4Stars ? (
                <Posts data={data.filter((post) => post.rating > 3.9)} />
              ) : filterBy3Stars ? (
                <Posts data={data.filter((post) => post.rating > 2.9)} />
              ) : filterBy2Stars && radio === "lessCheap" ? (
                <Posts data={data.filter((post) => post.rating > 1.9)} />
              ) : filterBy1Star ? (
                <Posts data={data.filter((post) => post.rating > 0.9)} />
              ) : radio === "expensive" ? (
                <Posts data={data.filter((post) => post.price_level === 4)} />
              ) : radio === "lessExpensive" ? (
                <Posts data={data.filter((post) => post.price_level === 3)} />
              ) : radio === "lessCheap" ? (
                <Posts data={data.filter((post) => post.price_level === 2)} />
              ) : radio === "cheap" ? (
                <Posts data={data.filter((post) => post.price_level === 1)} />
              ) : dropDownState === "Top rated" ? (
                <Posts
                  data={data.sort(function (a, b) {
                    var nameA = a.rating;
                    var nameB = b.rating;
                    if (nameA > nameB) {
                      return -1;
                    }
                    if (nameA < nameB) {
                      return 1;
                    }
                    return 0;
                  })}
                />
              ) : dropDownState === "Worst rated" ? (
                <Posts
                  data={data.sort(function (a, b) {
                    var nameA = a.rating;
                    var nameB = b.rating;
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                  })}
                />
              ) : dropDownState === "Most reviewed" ? (
                <Posts
                  data={data.sort(function (a, b) {
                    var nameA = a.user_ratings_total;
                    var nameB = b.user_ratings_total;
                    if (nameA > nameB) {
                      return -1;
                    }
                    if (nameA < nameB) {
                      return 1;
                    }
                    return 0;
                  })}
                />
              ) : dropDownState === "Most expensive" ? (
                <Posts
                  data={data.sort(function (a, b) {
                    var nameA = a.price_level;
                    var nameB = b.price_level;
                    if (nameA > nameB) {
                      return -1;
                    }
                    if (nameA < nameB) {
                      return 1;
                    }
                    return 0;
                  })}
                />
              ) : dropDownState === "Least expensive" ? (
                <Posts
                  data={data.sort(function (a, b) {
                    var nameA = a.price_level;
                    var nameB = b.price_level;
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                  })}
                />
              ) : (
                <WrapperPostsPag>
                  <Posts data={currentPosts} />

                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={data.length}
                    paginate={paginate}
                  />
                </WrapperPostsPag>
              )}
            </>
          )}
          {restaurantName !== "" && restoByName.length === 1 && (
            <>
              <OneRestaurant restoByName={restoByName} />
            </>
          )}
          {restaurantName !== "" && restoByName.length > 1 && (
            <>
              <TwoRestaurants restoByName={restoByName} />
            </>
          )}
        </RightColumnWrapper>
      </MainWrapper>
    </>
  );
};
const SearchAgain = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
`;
const Input = styled.input`
  margin-left: 20px;
`;

const AllDiningOptions = styled.div`
  display: flex;
  width: 75%;
  justify-content: space-between;
  font-size: 15px;
  margin-bottom: 5px;
`;
const DropDown = styled.select`
  display: flex;
  width: 29%;
  height: 35px;
  justify-content: flex-end;
  font-size: 15px;
  margin-bottom: 5px;
  padding-left: 5px;
  padding-right: 10px;
  /* color: gray; */
  option {
    color: black;
    background: white;
    font-weight: small;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
const DropDownWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  font-size: 20px;
  margin-bottom: 5px;
`;
const DeliveryOnly = styled.div`
  display: flex;
  width: 75%;
  justify-content: space-between;
  font-size: 15px;
  margin-bottom: 5px;
`;
const Text = styled.div`
  margin-left: 7px;
`;
const TakeoutOnly = styled.div`
  display: flex;
  width: 75%;
  justify-content: space-between;
  font-size: 15px;
  margin-bottom: 5px;
`;
const CostWrapper = styled.div`
  display: flex;
`;
const AllResults = styled.div`
  display: flex;
  width: 75%;
  justify-content: flex-start;
  font-size: 15px;
  margin-bottom: 5px;
  margin-left: 10px;
`;
const OneDollar = styled.div`
  display: flex;
  width: 75%;
  justify-content: flex-start;
  font-size: 15px;
  margin-bottom: 5px;
  margin-left: 10px;
`;
const TwoDollars = styled.div`
  display: flex;
  width: 75%;
  justify-content: flex-start;
  font-size: 15px;
  margin-bottom: 5px;
  margin-left: 10px;
`;
const ThreeDollars = styled.div`
  display: flex;
  width: 75%;
  justify-content: flex-start;
  font-size: 15px;
  margin-bottom: 5px;
  margin-left: 10px;
`;
const FourDollars = styled.div`
  display: flex;
  width: 75%;
  justify-content: space-between;
  font-size: 15px;
  margin-bottom: 5px;
  margin-left: 10px;
`;

const FourStars = styled.div`
  width: 75%;
  justify-content: space-evenly;
  font-size: 15px;
  display: flex;
  margin-bottom: 5px;
  margin-right: 3px;
`;
const ThreeStars = styled.div`
  width: 75%;
  justify-content: space-evenly;
  font-size: 15px;
  display: flex;
  margin-bottom: 5px;
`;
const TwoStars = styled.div`
  width: 75%;
  justify-content: space-evenly;
  font-size: 15px;
  display: flex;
  margin-bottom: 5px;
`;
const OneStar = styled.div`
  width: 75%;
  justify-content: space-evenly;
  font-size: 15px;
  display: flex;
  margin-bottom: 5px;
`;
const Heading = styled.div`
  width: 75%;
  justify-content: center;
  font-size: 20px;
`;
const Divider = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 0.5px;
  background-color: #3f3f3f;
  margin-bottom: 20px;
  margin-top: 20px;
  opacity: 50%;
`;
const MainWrapper = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: flex-start;
  background-color: #ffffff;
`;
const WrapperPostsPag = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const FilteredBy = styled.div`
  font-size: 18px;
`;
const Reviews = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;
const Price = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;
const DiningOptions = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;
const SeatingOptions = styled.div`
  font-size: 18px;
`;
const LeftColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 24.5vw;
  margin-left: 7.5vw;
  margin-bottom: 40px;
  border-radius: 10px;
  padding-top: 50px;
  padding-left: 40px;
  padding-right: 40px;
  background-color: #eee;
  justify-content: center;
  margin-top: 40px;
`;
const RightColumnWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  width: 53vw;
  margin-left: 7.5vw;
  margin-right: 7.5vw;
  margin-bottom: 40px;
  border-radius: 10px;
  padding: 35px;
  background-color: #eee;
  justify-content: center;
  align-content: flex-start;
`;
const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const StyledIcon = styled(Icon)`
  margin: 18% auto;
  animation: ${spinner} linear 1000ms infinite;
`;
const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const SectionWrapper = styled.div`
  max-height: 400px;
  overflow: hidden;
  transition: max-height 0.45s ease-in-out;

  &.expanded {
    max-height: 0px;
  }
`;
export default FindRestaurantPage;
