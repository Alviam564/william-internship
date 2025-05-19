import React, {useEffect, useState} from "react";
import Slick from "../utils/Slick"
import Skeleton from "../UI/Skeleton";
import { Link } from "react-router-dom";
import axios from "axios";


const HotCollections = () => {
  const [hotcollection, sethotcollection] = useState([]);

    const fetchhotcollection = async () => {
      const response = await axios.get(
      'https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections'
    );
    sethotcollection(response.data);
  }
    useEffect (() => {
    fetchhotcollection();
  }, []);

  

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-right">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {hotcollection.length ? (
            <Slick>
              {hotcollection.map((collection, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                    <Link to={`/item-details/${collection.nftId}`}>
                      <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                    </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
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
            </Slick>
          ) : ( 
            <div className="row">
              {Array(4).fill().map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft_coll">
                    <Skeleton width="100%" height="180px" borderRadius="10px" />
                    <div className="nft_coll_pp">
                      <Skeleton width="60px" height="50px" borderRadius="100%" />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                    <Skeleton width="40%" height="20px" borderRadius="4px" />
                    <div>
                    <Skeleton width="20%" height="20px" borderRadius="4px" />
                    </div>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;