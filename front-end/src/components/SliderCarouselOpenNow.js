import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";

function SliderCarousel() {
  const [isLoading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [images, setImages] = useState([]);
  const [currentlyDisplayed, setCurrentlyDisplayed] = useState("");
  const [query, setQuery] = useState("");
  const [allRestosOpenNow, setAllRestosOpenNow] = useState([]);
  const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
  const url = `https://api.unsplash.com/search/photos?query=restaurant&client_id=${accessKey}`;

  useEffect(() => {
    const handleClick = () => {
      setLoading(true);
      axios
        .get(url, {
          params: { page: 3, per_page: 20 },
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
    const url1 = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+montreal+canada&opennow="true"&key=${process.env.REACT_APP_GOOGLE_KEY}`;
    fetch(url1)
      .then((response) => response.json())
      .then((response) => {
        setAllRestosOpenNow(response.results);
        console.log("responseCarouselSlider", response.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let settings = {
    infinite: false,
    speed: 1000,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 4,
    className: "slides",

    // responsive: [
    //   {
    //     breakpoint: 960,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 2,
    //     },
    //   },
    // ],
  };
  return (
    <Wrapper>
      <Container>
        <TitleAbove>Restaurants open now</TitleAbove>
        {allRestosOpenNow.length === 0 ? (
          <div role="status">
            <span>Loading...</span>
          </div>
        ) : (
          <Slider {...settings}>
            {allRestosOpenNow.map((restaurant, index) => {
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
        )}
      </Container>
    </Wrapper>
  );
}
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
  margin-bottom: 100px;
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
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  font-size: 20px;
  margin-top: 60px;
`;
const Card = styled.div`
  text-align: center;
  padding-top: 10px;
  opacity: 1;
  width: 200px;
  margin-top: 20px;
  color: white;
`;
const WrapperNameButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TitleAbove = styled.div`
  font-size: 20px;
`;
const Image = styled.img`
  border-radius: 10px;
  display: block;
  margin: auto;
`;
export default SliderCarousel;
