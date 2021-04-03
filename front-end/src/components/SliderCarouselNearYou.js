import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
require("es6-promise").polyfill();
require("isomorphic-fetch");

function SliderCarouselNearYou() {
  const [allRestosNearby, setAllRestosNearby] = useState([]);
  const [location, setLocation] = useState([]);
  const [city, setCity] = useState([]);
  const [country, setCountry] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const findLocationsNearby = "https://ip.nf/me.json";
  const [currentlyDisplayed, setCurrentlyDisplayed] = useState("");
  const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
  const url = `https://api.unsplash.com/search/photos?query=restaurant&client_id=${accessKey}`;

  useEffect(() => {
    const handleClick = () => {
      setLoading(true);
      axios
        .get(url, {
          params: { page: 5, per_page: 20 },
          headers: {
            Authorization: "Client-ID " + accessKey,
          },
        })
        .then((data) => {
          console.log("data.data.results", data.data.results);
          setImages(data.data.results);
          setLoading(false);
          setCurrentlyDisplayed(query);
        })
        .catch((err) => {
          console.log("Error happened during fetching!", err);
        });
    };
    handleClick();
  }, []);

  useEffect(() => {
    const url = findLocationsNearby;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setLocation("response", response);
        // console.log("response", response);
        setCity(response.ip.city);
        setCountry(response.ip.country);
        const url1 = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${response.ip.latitude},${response.ip.longitude}&radius=1500&type=restaurant&key=${process.env.REACT_APP_GOOGLE_KEY}`;
        fetch(url1)
          .then((response1) => response1.json())
          .then((response1) => {
            setAllRestosNearby(response1.results);
            console.log("responseCarouselSlidernearyou", response1.results);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, []);

  let settings = {
    infinite: false,
    speed: 1000,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 4,
    className: "slides",
  };
  return (
    <>
      {" "}
      <Heading>
        It looks like you are in {city}, {country}
      </Heading>
      <Wrapper>
        <Container>
          <TitleAbove>Restaurants Nearby</TitleAbove>
          {allRestosNearby.length === 0 ? (
            <div role="status">
              <span>Loading...</span>
            </div>
          ) : (
            <>
              <Slider {...settings}>
                {allRestosNearby.map((restaurant, index) => {
                  const image = images[index];
                  // console.log("image", image);
                  return (
                    <div key={restaurant.reference}>
                      <Link to={`restaurant/${restaurant.reference}`}>
                        <Card>
                          <Image
                            alt={"restaurants here"}
                            key={index}
                            src={image?.urls.small}
                            height={150}
                            width={150}
                          />
                          <WrapperNameButton>
                            <RestoName>{restaurant.name}</RestoName>
                            <Button>See info/book this restaurant</Button>
                          </WrapperNameButton>
                        </Card>
                      </Link>
                    </div>
                  );
                })}
              </Slider>
            </>
          )}
        </Container>
      </Wrapper>
    </>
  );
}

const WrapperNameButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  display: flex;
  background-color: #202020 !important;
  /* border: 1px solid #d64b4b !important; */
  width: 130px;
  border-radius: 4px;
  color: rgb(255, 255, 255);
  margin-top: 20px !important;
  font-size: 13px;
`;
const Container = styled.div`
  margin-bottom: 30px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 80vw;
`;
const RestoName = styled.h5`
  color: #262626;
  display: block;
  overflow: hidden;
  font-size: 14px;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0 !important;
`;
const Card = styled.div`
  text-align: center;
  padding-top: 10px;
  opacity: 1;
  width: 200px;
  margin-top: 20px;
  color: white;
`;
const Heading = styled.div`
  width: 100%;
  font-size: 15px;
  margin-left: 290px;
  margin-top: 20px;
  opacity: 50%;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 20px;
  margin-top: 60px;
`;
const TitleAbove = styled.div`
  font-size: 20px;
`;
const Image = styled.img`
  border-radius: 10px;
  display: block;
  margin: auto;
`;
export default SliderCarouselNearYou;
