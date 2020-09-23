import React, { useMemo } from "react";
import PropTypes from "prop-types";

import Indicator from "./Indicator";

import styles from "./Carousel.module.css";

function ajustInRange(nb, maxLen) {
  let res = nb % maxLen;
  if (res < 0) res += maxLen;
  return res;
}

const getSlides = function (children) {
  let res = [];
  React.Children.forEach(children, (child) => {
    if (child.type.name === "Slide") res.push(child);
  });
  return res;
};

function Carousel(props) {
  const slides = useMemo(() => getSlides(props.children), [props.children]);
  const slideSize = useMemo(() => 100 / props.slidePerPage, [
    props.slidePerPage,
  ]);
  const nbSlide = useMemo(() => slides.length - props.slidePerPage + 1, [props.slidePerPage, slides.length]);

  const indicators = useMemo(() => {
    let res = [];
    for (let i = 0; i < nbSlide; i++) {
      res.push(
        <Indicator
          active={props.activeSlide === i}
          onClick={() => props.setActiveSlide(i)}
          key={`indicator-${i}`}
        />
      );
    }
    return res;
  }, [nbSlide, props]);

  return (
    <div className={`${props.className} ${styles.carousel}`}>
      <div
        className={styles.slider}
        style={{ left: `-${props.activeSlide * slideSize}%` }}
      >
        {slides.map((slide, index) => (
          <div
            key={`slide-${index}`}
            className={styles["slide-container"]}
            style={{
              minWidth: `${slideSize}%`,
              width: `${slideSize}%`,
              maxWidth: `${slideSize}%`,
            }}
          >
            {slide}
          </div>
        ))}
      </div>
      <div
        className={`${styles.button} ${styles.previous}`}
        dangerouslySetInnerHTML={{ __html: "&lt;" }}
        onClick={() =>
          props.setActiveSlide(
            ajustInRange(props.activeSlide - 1, nbSlide)
          )
        }
      ></div>
      <div
        className={`${styles.button} ${styles.next}`}
        dangerouslySetInnerHTML={{ __html: "&gt;" }}
        onClick={() =>
          props.setActiveSlide(
            ajustInRange(props.activeSlide + 1, nbSlide)
          )
        }
      ></div>
      <div className={styles.indicators}>{indicators}</div>
    </div>
  );
}

Carousel.propTypes = {
  slidePerPage: PropTypes.number,
  activeSlide: PropTypes.number.isRequired,
  setActiveSlide: PropTypes.func.isRequired,
};

Carousel.defaultProps = {
  slidePerPage: 1,
};

export default Carousel;
