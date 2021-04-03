import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { getStoreItemArray } from "../reducers";
import logo from "../assets/HomeBanner.jpg";
import logo1 from "../assets/GAPic.jpg";
import logo2 from "../assets/SDPic.jpg";
import logo3 from "../assets/CMPic.jpg";
import logo4 from "../assets/SSPic.jpg";
import logo5 from "../assets/GGPic.jpg";
import logo6 from "../assets/KAPic.jpg";
import { spinner6 } from "react-icons-kit/icomoon/spinner6";
import { Icon } from "react-icons-kit";
import ReactStars from "react-rating-stars-component";
import { RiCalendar2Line, RiTimeLine, RiGroupLine } from "react-icons/ri";
import Map from "./Map";
import { DatePicker } from "@y0c/react-datepicker";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import { useHistory } from "react-router-dom";
import { Link } from "react-scroll";
import OpenNow from "./OpenNow";
import NearYou from "./NearYou";
import RestoByLocation from "./RestoByLocation";
import RestoByNameOne from "./RestoByNameOne";
import RestoByNameTwo from "./RestoByNameTwo";
const photos = [
  {
    namePhoto: logo,
  },
  {
    namePhoto: logo1,
  },
  {
    namePhoto: logo2,
  },
  {
    namePhoto: logo3,
  },
  {
    namePhoto: logo4,
  },
  {
    namePhoto: logo5,
  },
  {
    namePhoto: logo6,
  },
];

const RestaurantPage = () => {
  const [activePhoto, setActivePhoto] = useState(0);
  const [dataOpenNow, setDataOpenNow] = useState("");
  const [dataNearYou, setDataNearYou] = useState("");
  const [location, setLocation] = useState([]);
  const [valueDate, setValueDate] = useState("");
  const [valueTime, setValueTime] = useState("");
  const [valuePeople, setValuePeople] = useState("ValuePeople");
  const [loading, setLoading] = useState(false);
  const [data1, setData1] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [restoByName, setRestoByName] = useState([]);
  const [data, setData] = useState([]);

  const history = useHistory();
  const { reference } = useParams();
  const findLocationsNearby = "https://ip.nf/me.json";
  const storeItems = useSelector(getStoreItemArray);
  console.log("storeItemsRP", storeItems);
  console.log("reference", reference);

  // console.log("valuePeople", valuePeople);
  // console.log("valueDate", valueDate);
  // console.log("valueTime", valueTime);

  localStorage.setItem("valuePeople", valuePeople);
  localStorage.setItem("valueDate", valueDate);
  localStorage.setItem("valueTime", valueTime);
  // const handleClick = () => history.push("/preconfirmation");
  // Restaurants Open Now
  useEffect(() => {
    const url1 = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+montreal+canada&opennow="true"&key=${process.env.REACT_APP_GOOGLE_KEY}`;
    fetch(url1)
      .then((response) => response.json())
      .then((response) => {
        setDataOpenNow(response);
        console.log("response1", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reference]);
  // Restaurants Nearby
  useEffect(() => {
    const url = findLocationsNearby;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setLocation("response", response);
        // const condition = storeItems[0].location !== "" ? url1 : null;
        // console.log("response", response);
        const url2 = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${response.ip.latitude},${response.ip.longitude}&radius=1500&type=restaurant&key=${process.env.REACT_APP_GOOGLE_KEY}`;
        fetch(url2)
          .then((response) => response.json())
          .then((response) => {
            setDataNearYou(response);
            console.log("response2", response);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, [reference]);
  // Restaurants by name search
  console.log("dataNearYou", dataNearYou);

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
        console.log("restoByName", response.candidates);
        console.log("responseRestoName", response.candidates[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [storeItems[0].restaurantsCuisines]);
  // Restaurants by location search

  useEffect(() => {
    const location1 =
      storeItems[0].restaurantsCuisines === "" && storeItems[0].location !== ""
        ? storeItems[0].location
        : "";
    console.log("location1", location1);
    setLocation(location1);
    console.log("location", location);
    const url1 = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+${storeItems[0].location}+canada&key=${process.env.REACT_APP_GOOGLE_KEY}`;
    // const condition = storeItems[0].location !== "" ? url1 : null;
    console.log("url1", url1);
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
  console.log("datarestopage", data);
  const randomPhotos = () => {
    const lengthPhotos = photos.length;
    setActivePhoto(Math.floor(Math.random() * lengthPhotos));
    let allPhotos = photos[activePhoto].namePhoto;
    // console.log("allphotos", allPhotos);
    return allPhotos;
  };
  useEffect(() => {
    randomPhotos();
  }, []);

  function fetchReservations() {
    fetch("/getReservations")
      .then((response) => response.json())
      .then((data) => console.log("getdata", data));
  }

  useEffect(() => {
    fetchReservations();
  }, []);

  if (!dataOpenNow || !dataNearYou) {
    return (
      <SpinnerWrapper>
        <StyledIcon size={50} icon={spinner6} />
      </SpinnerWrapper>
    );
  }
  return (
    <>
      <Logo>
        <img
          // key={index}
          src={photos[activePhoto].namePhoto}
          height={400}
          alt={"imageHere"}
        />
      </Logo>{" "}
      <>
        {/* Restaurants Open Now */}
        {dataOpenNow !== "" && (
          <OpenNow dataOpenNow={dataOpenNow} reference={reference} />
        )}
      </>
      <>
        {/* Restaurants Nearby */}
        {dataNearYou !== "" && (
          <NearYou dataNearYou={dataNearYou} reference={reference} />
        )}
      </>
      <>
        {/* Restaurants by location search */}
        {data !== [] && storeItems[0].restaurantsCuisines === "" && (
          <RestoByLocation data={data} reference={reference} />
        )}
      </>
      <>
        {/* Restaurants by name search (1) */}
        {restoByName.length === 1 &&
          storeItems[0].restaurantsCuisines !== "" && (
            <RestoByNameOne restoByName={restoByName} reference={reference} />
          )}
      </>
      <>
        {/* Restaurants by name search (2+) */}
        {restoByName.length > 1 && (
          <RestoByNameTwo restoByName={restoByName} reference={reference} />
        )}
      </>
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
export default RestaurantPage;
