import React, { useEffect, useState } from "react";
import { spinner6 } from "react-icons-kit/icomoon/spinner6";
import { Icon } from "react-icons-kit";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";

const Carousel = () => {
  const [data, setData] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const url1 = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+montreal+canada&key=${process.env.REACT_APP_GOOGLE_KEY}`;
    fetch(url1)
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        getImages(response.results);
        // console.log("responseCarousel", response.results);
        // console.log(
        //   "working image",
        //   "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=ATtYBwI8zo5zmDlfMKwRx5j3QPY5jb4Z1EJjc8wh9eGzLEAxgbwnfIT6laMg00hNGP3VQ7q1XZnPAe77e4W-LhOp2fqBZZHT0TzFuzToTGeWogvsJsCzpWco5ZXKC0hAXrLrBzSCwBHWkBlvVD6koL4MX0TC-qGjibPp2Ej1yegFml1sZGF2&key=AIzaSyAOpR5UnFj7S7J4COvVnKg4OaPOhNWF92g"
        // );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getImages = (responseResults) => {
    const firstPartUrl =
      "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=";

    responseResults.map((item) => {
      const photoUrl =
        firstPartUrl +
        item["photos"][0]["photo_reference"] +
        "&key=AIzaSyAOpR5UnFj7S7J4COvVnKg4OaPOhNWF92g";
      setImages((images) => [...images, photoUrl]);
    });

    // console.log("images", images);
  };

  const [currentImageIdx, setCurrentImagIdx] = useState(0);

  const prevSlide = () => {
    // find out whether currentImageIdx eqals 0 and thus user reached beginning of carousel
    const resetToVeryBack = currentImageIdx === 0;

    const index = resetToVeryBack ? images.length - 1 : currentImageIdx - 1;

    // assign the logical index to current image index that will be used in render method
    setCurrentImagIdx(index);
  };

  const nextSlide = () => {
    // check if we need to start over from the first index
    const resetIndex = currentImageIdx === images.length - 1;

    const index = resetIndex ? 0 : currentImageIdx + 1;

    // assign the logical index to current image index that will be used in render method
    setCurrentImagIdx(index);
  };

  // create a new array with 5 elements from the source images
  const activeImageSourcesFromState = images.slice(
    currentImageIdx,
    currentImageIdx + 6
  );

  // check the length of the new array (it’s less than 5 when index is at the end of the imagge sources array)
  const imageSourcesToDisplay =
    activeImageSourcesFromState.length < 6
      ? // if the imageSourcesToDisplay's length is lower than 5 images than append missing images from the beginning of the original array
        [
          ...activeImageSourcesFromState,
          ...images.slice(0, 6 - activeImageSourcesFromState.length),
        ]
      : activeImageSourcesFromState;

  if (!data) {
    return (
      <SpinnerWrapper>
        <StyledIcon size={50} icon={spinner6} />
      </SpinnerWrapper>
    );
  }

  // console.log("dataresultslength", data.results.length);

  return (
    <Wrapper>
      <Button onClick={prevSlide}>
        <RiArrowLeftSFill size="25" />
      </Button>
      {/* render images */}

      {data.results.map((items, index) => {
        const image = imageSourcesToDisplay[index];
        console.log("imageSourcesToDisplay", imageSourcesToDisplay[index]);
        const names = items.name;
        // console.log("names", names);
        return (
          <Link to={`restaurant/${items.reference}`}>
            {" "}
            {names[0]}
            {imageSourcesToDisplay.length > index && (
              <Image key={index} src={image || ""} alt="" />
            )}
          </Link>
        );
      })}

      <Button onClick={nextSlide}>
        <RiArrowRightSFill size="25" />
      </Button>
    </Wrapper>
  );
};

export default Carousel;

const Wrapper = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;
const Button = styled.button`
  color: grey;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  margin: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: gray;
  height: 175px;
  width: 200px;
  opacity: 70%;
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
