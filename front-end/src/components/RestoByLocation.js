import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import styled, { keyframes } from "styled-components";
import Map from "./Map";
import { Icon } from "react-icons-kit";
import { RiCalendar2Line, RiTimeLine, RiGroupLine } from "react-icons/ri";
import { DatePicker } from "@y0c/react-datepicker";
import { Link } from "react-scroll";

const RestoByLocation = ({ data, reference }) => {
  const [valueDate, setValueDate] = useState("");
  const [valueTime, setValueTime] = useState("");
  const [valuePeople, setValuePeople] = useState("ValuePeople");
  const [loading, setLoading] = useState(false);
  const [data1, setData1] = useState([]);
  const [chosenRestaurant, setChosenRestaurant] = useState("test");
  const [reservationData, setReservationData] = useState("");

  // console.log("value", valuePeople);
  const onChangeDate = () => (...args) => setValueDate(args);
  const onChangeTime = () => (...args) => setValueTime(args);

  useEffect(() => {
    const passRestaurantName = data
      .filter((items) => items.reference === reference)
      .map((items) => items.name);
    setChosenRestaurant(passRestaurantName);
  }, []);
  console.log(chosenRestaurant);
  return (
    <>
      {data
        .filter((items) => items.reference === reference)
        .map((items, index) => (
          <Wrapper>
            <TextwrapperAll>
              <TextWrapperLeft>
                <NavLink
                  className="link"
                  activeClass="active"
                  to="overview"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={750}
                >
                  <TextLeft section="overview">Overview</TextLeft>
                </NavLink>
                <NavLink
                  className="link"
                  activeClass="active"
                  to="reviews"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={750}
                >
                  <TextLeft section="reviews">Reviews</TextLeft>
                </NavLink>
                <NavLink
                  className="link"
                  activeClass="active"
                  to="photos"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={750}
                >
                  <TextLeft section="photos">Photos</TextLeft>
                </NavLink>
                <NavLink
                  className="link"
                  activeClass="active"
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={750}
                >
                  <TextLeft section="contact">Contact</TextLeft>
                </NavLink>
              </TextWrapperLeft>
              <TextWrapperRight>
                <TextRight>Reserve your table at {items.name} now!</TextRight>
              </TextWrapperRight>
            </TextwrapperAll>
            <BottomwrapperAll>
              {" "}
              <WrapperBottomLeft>
                <RestaurantName>{items.name}Location</RestaurantName>
                <TextWrapperInfo>
                  <TextLeftInfo>{items.rating}</TextLeftInfo>
                  <ReactStars
                    value={items.rating}
                    name="rating"
                    readOnly="true"
                    isHalf="true"
                  />
                  <TextLeftInfo1>
                    {items.user_ratings_total} reviews
                  </TextLeftInfo1>
                  <TextLeftInfo2>
                    {items.price_level === 1
                      ? "$"
                      : items.price_level === 2
                      ? "$$"
                      : items.price_level === 3
                      ? "$$$"
                      : items.price_level === 4
                      ? "$$$$"
                      : ""}
                  </TextLeftInfo2>
                </TextWrapperInfo>
                <TextWrapperDetails>
                  <section id="overview">
                    <Overview>Overview</Overview>
                  </section>
                  <OverviewContent>
                    At {items.name}, we create great memories by serving out
                    original signature dishes using recipes that have been
                    passed down over generations. Our restaurant provides an
                    authentic dining experience that is unique to the area.
                  </OverviewContent>

                  <Divider />
                  <section id="reviews">
                    <Reviews>Reviews</Reviews>
                  </section>
                  <ReviewsContent>
                    See a sample review for {items.name} here!
                    {items.photos[0].html_attributions[0] &&
                      items.photos[0].html_attributions[0].length !== 0 && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: items.photos[0].html_attributions[0],
                          }}
                        />
                      )}
                    {/* {console.log("thisON", items.photos[0].html_attributions)} */}
                  </ReviewsContent>
                  <Divider />
                  <section id="photos">
                    <Photos>Photos</Photos>
                  </section>
                  <PhotosContent
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${items["photos"][0]["photo_reference"]}&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                    width={150}
                    height={150}
                  />

                  <Divider />
                  <section id="contact">
                    <Contact>Contact</Contact>
                  </section>
                  <ContactContent>{items.formatted_address}</ContactContent>

                  <MapMove>
                    <Map
                      name={items.name}
                      location={items.geometry.location}
                      address={items.vicinity}
                      zoomLevel={17}
                    />
                  </MapMove>
                  <Divider />
                </TextWrapperDetails>
              </WrapperBottomLeft>
              <WrapperBottomRight>
                <Form
                  onSubmit={(ev) => {
                    ev.preventDefault();

                    fetch("/book-reservation", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                      body: JSON.stringify({
                        NameResto: chosenRestaurant,
                        people: valuePeople,
                        // valueTime,
                      }),
                    })
                      .then((res) => console.log(res.JSON, "here"))
                      // .then((data) => setReservationData(data))
                      .catch((err) => {
                        console.error(err);
                      });
                  }}
                >
                  <NumberPeopleWrapper>
                    <NumberPeopleIcon>
                      <RiGroupLine size="30" />
                    </NumberPeopleIcon>
                    <NumberPeopleText>Number of people</NumberPeopleText>
                    <DropdownWrapper>
                      <DropDown
                        value={valuePeople}
                        onChange={(e) => setValuePeople(e.target.value)}
                      >
                        <option value={"1"}>{"1"}</option>; return
                        <option value={"2"}>{"2"}</option>;
                        <option value={"3"}>{"3"}</option>;
                        <option value={"4"}>{"4"}</option>;
                        <option value={"5"}>{"5"}</option>;
                        <option value={"6"}>{"6"}</option>;
                        <option value={"6+"}>{"6+"}</option>;
                      </DropDown>
                    </DropdownWrapper>
                  </NumberPeopleWrapper>
                  <CalendarWrapper>
                    <CalendarIcon>
                      <RiCalendar2Line size="30" />
                    </CalendarIcon>
                    <CalendarText>Date of reservation</CalendarText>
                    <DatePickerWrapper>
                      <DatePicker
                        showToday
                        onChange={onChangeDate("DatePicker")}
                        valueDate={valueDate}
                        placeholder={new Date().toLocaleDateString()}
                        color={"yellow"}
                      />
                    </DatePickerWrapper>
                  </CalendarWrapper>
                  <TimeWrapper>
                    <TimeIcon>
                      <RiTimeLine size="30" />
                    </TimeIcon>
                    <TimeText>Time of reservation</TimeText>
                    <DatePicker
                      showTimeOnly
                      onChange={onChangeTime("DatePicker")}
                      valueTime={valueTime}
                      placeholder={new Date().toLocaleTimeString()}
                      color={"yellow"}
                    />
                  </TimeWrapper>
                  <WrapperButton>Reserve my table</WrapperButton>
                </Form>
              </WrapperBottomRight>
            </BottomwrapperAll>
          </Wrapper>
        ))}
    </>
  );
};
const Form = styled.form`
  height: 500px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
`;
const TextwrapperAll = styled.div`
  display: flex;
  width: 100%;
`;
const TextWrapperLeft = styled.ul`
  width: 45%;
  display: flex;
  background-color: white;
  justify-content: space-evenly;
  margin-left: 5%;
  margin-bottom: 40px;
  color: black;
  .active {
    border-bottom: 1px solid black;
    padding-bottom: 5px;
    text-decoration: none;
    font-size: 1.2rem;
    color: black;
  }
`;

const NavLink = styled(Link).attrs(() => ({
  activeClass: "active",
}))`
  cursor: pointer;
  border-top: 5px solid grey;
  &:active {
    border-top: 5px solid blue;
  }
`;
const TextWrapperRight = styled.div`
  width: 35%;
  display: flex;
  background-color: white;
  justify-content: center;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 50px;
`;
const BottomwrapperAll = styled.div`
  display: flex;
  width: 100%;
`;
const WrapperBottomLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  margin-left: 5%;
  padding-left: 6%;
  padding-right: 6%;
  background-color: #eee;
  padding-top: 40px;
  padding-bottom: 40px;
  margin-bottom: 80px;
  border-radius: 10px;
`;
const WrapperBottomRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  margin-left: 10%;
  margin-right: 10%;
  align-items: center;
  background-color: #eee;
  min-height: 800px;
  padding-top: 40px;
  padding-bottom: 40px;
  margin-bottom: 80px;
  border-radius: 10px;
`;
const RestaurantName = styled.div`
  display: flex;
  font-size: 22px;
  height: 90px;
  align-items: center;
`;
const TextWrapperInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 40px;
  align-items: center;
`;
const MapMove = styled.div`
  display: flex;
  position: absolute;
  top: 105px;
  left: 40px;
`;
const NumberPeopleWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  justify-content: space-evenly;
  align-items: center;
`;
const NumberPeopleIcon = styled.div`
  font-size: 14px;
  margin-right: 10px;
`;
const NumberPeopleText = styled.div`
  font-size: 16px;
  margin-right: 10px;
`;
const CalendarWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  justify-content: space-evenly;
  align-items: center;
`;
const CalendarIcon = styled.div`
  font-size: 14px;
  margin-right: 10px;
`;
const CalendarText = styled.div`
  font-size: 16px;
  margin-right: 10px;
`;
const DatePickerWrapper = styled.div``;

const TimeWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  justify-content: space-between;
  align-items: center;
`;
const TimeIcon = styled.div`
  font-size: 14px;
  margin-right: 10px;
`;
const TimeText = styled.div`
  font-size: 16px;
  margin-right: 10px;
`;
const WrapperButton = styled.button`
  border-radius: 4px;
  border-color: black;
  background-color: #ffdf6c;
  color: black;
  cursor: pointer;
  display: flex;
  font-size: 17px;
  height: 44px;
  width: 100%;
  margin-top: 60px;
  justify-content: center;
  align-items: center;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
const TextWrapperDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Overview = styled.div`
  font-weight: 530;
  display: flex;
  font-size: 18px;
  height: 70px;
  align-items: center;
`;
const OverviewContent = styled.div`
  display: flex;
  font-size: 15px;
`;
const Reviews = styled.div`
  font-weight: 530;
  display: flex;
  font-size: 18px;
  height: 70px;
  align-items: center;
`;
const ReviewsContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
`;
const Photos = styled.div`
  font-weight: 530;
  display: flex;
  font-size: 18px;
  height: 70px;
  align-items: center;
`;
const PhotosContent = styled.img`
  display: flex;
  max-width: 300px;
`;
const Contact = styled.div`
  font-weight: 530;
  display: flex;
  font-size: 18px;
  height: 70px;
  align-items: center;
`;
const ContactContent = styled.div`
  display: flex;
`;

const TextLeftInfo = styled.span`
  margin-right: 10px;
  font-size: 18px;
`;
const TextLeftInfo1 = styled.span`
  font-size: 18px;
  margin-left: 20px;
`;
const TextLeftInfo2 = styled.span`
  font-size: 18px;
  margin-left: 20px;
`;
const TextLeft = styled.span`
  display: flex;
  height: 40px;
  font-size: 18px;
  text-align: justify;
  align-items: flex-end;
  color: black;
`;
const TextRight = styled.span`
  padding: 2px;
  margin: 15px;
  font-size: 18px;
  text-align: justify;
  overflow: visible;
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
  height: 400px;
  width: 100%;
  background-color: #3f3f3f;
`;
const Divider = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 1px;
  background-color: #999999;
  margin-top: 20px;
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
const DropdownWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 209px;
  height: 45px;
`;
const DropDown = styled.select`
  display: flex;
  width: 60px;
  height: 35px;
  justify-content: center;
  font-size: 15px;
  margin-bottom: 5px;
  padding-left: 5px;
  padding-right: 10px;
  /* color: gray; */
  option {
    /* color: black; */
    background: white;
    font-weight: small;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
export default RestoByLocation;
