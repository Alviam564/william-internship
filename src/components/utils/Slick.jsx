import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

function Slick({ items }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 1,
      responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {items.map((collection, index) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
          <div className="nft_coll">
            <div className="nft_wrap">
            <Link to="/item-details">
              <img src={collection.nftImage} className="lazy img-fluid" alt="" />
            </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to="/author">
                <img className="lazy pp-coll" src={collection.authorImage} alt="" />
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to="/explore">
                <h4>{collection.title}</h4>
              </Link>
              <span>{collection.code}</span>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
export default Slick