import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import axios from "axios";

const TopSellers = () => {
  const [topSelling, setTopSelling] = useState([]);

  const fetchtopsellerdata = async () => {
    const response = await axios.get (
    'https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers'
    )

    setTopSelling (response.data);
  };

  useEffect(() => {
    fetchtopsellerdata();
  }, []);


  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row" data-aos="fade-down">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {topSelling.length ? (
            <div className="col-md-12">
              <ol className="author_list">
                {topSelling.map((top, index) =>(
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={`/author/${top.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={top.authorImage}
                          alt="authorImage"
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${top.authorId}`}>{top.authorName}</Link>
                      <span>{top.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : ( 
            <div className="col-md-12">
              <ol className="author_list">
                {new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="100%" />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info">
                      <Skeleton width="49%" height="20px" borderRadius="1px" />
                      <div>
                        <Skeleton width="49px" height="20px" borderRadius="1px" />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
