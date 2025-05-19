import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Slick from "../utils/Slick";
import Skeleton from "../UI/Skeleton";
import Countdown from "../utils/Countdown";
import axios from "axios";


const NewItems = () => {
  const [newitems, setnewitems] = useState([]);
  
    const fetchnewitems = async () => {
    const response = await axios.get(
      'https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems'
    );
    setnewitems(response.data); 
  }    

    useEffect (() => {
    fetchnewitems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {newitems.length ? (
            <Slick>
              {newitems.map((items, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                      to={`/author/${items.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                      >
                        <img className="lazy" src={items.authorImage} alt="authorImage" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <Countdown expiryDate={items.expiryDate} />
                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${items.nftId}`}>
                        <img
                          src={items.nftImage}
                          className="lazy nft__item_preview"
                          alt="nft__item_preview"
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${items.nftId}`}>
                        <h4>{items.title}</h4>
                      </Link>
                      <div className="nft__item_price">{items.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{items.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slick>
          ) : ( 
            <div className="row">
              {Array(4).fill().map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="100%" />
                      <i className="fa fa-check"></i>
                    </div>
                      <div className="nft__item_preview">
                        <Skeleton width="100%" height="280px" />
                      </div>
                    <div className="nft__item_info">
                      <Skeleton width="69%" height="25px" borderRadius="4px" />
                    </div>
                    <div className="nft__item_price">
                      <Skeleton width="35%" height="20px" borderRadius="1px" />
                    </div>
                    <div className="nft__item_like">
                      <Skeleton width="35px" height="20px" borderRadius="1px" />
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

export default NewItems;
