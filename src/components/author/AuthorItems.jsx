import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";


const AuthorItems = ({ authordata }) => {

  const isLoading = new Array(8).fill(0).map((_, index) => (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
      <div className="nft__item">
        <div className="author_list_pp">
          <Skeleton width="50px" height="50px" borderRadius="100%" />
          <i className="fa fa-check"></i>
        </div>
        <div className="nft__item_wrap">
          <Skeleton width="100%" height="280px" />
        </div>
        <div className="nft__item_info">
          <Skeleton width="69%" height="25px" borderRadius="4px" />
          <div className="nft__item_price">
            <Skeleton width="35%" height="20px" borderRadius="1px" />
          </div>
          <div className="nft__item_like">
            <Skeleton width="35px" height="20px" borderRadius="1px" />
          </div>
        </div>
      </div>
    </div>
  ))
      
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {!authordata || !authordata.nftCollection
          ? isLoading 
          : authordata.nftCollection.map ((author2, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${authordata.authorId}`}>
                    <img className="lazy" src={authordata.authorImage} alt="authorImage" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <Link to={`/item-details/${author2.nftId}`}>
                    <img
                      src={author2.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${author2.nftId}`}>
                    <h4>{author2.title}</h4>
                  </Link>
                  <div className="nft__item_price">{author2.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{author2.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))} 
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;