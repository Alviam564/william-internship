import React, { useCallback, useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton"
import axios from "axios";



const ItemDetails = () => {

  const [itemDetails, setItemDetails] = useState("");
  const id = useParams().id
  
  const fetchitemdetaildata = useCallback(async () => {
  const response = await axios.get(
    `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
  );


   setItemDetails(response.data); 
  }, [id])



  useEffect(() => {
    window.scrollTo(0, 0);
    fetchitemdetaildata()
  }, [fetchitemdetaildata]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content" data-aos="flip-up">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {itemDetails ?  (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img src={itemDetails.nftImage} className="img-fluid img-rounded mb-sm-30 nft-image" alt="nftImage" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{itemDetails.title} #{itemDetails.tag}</h2>
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {itemDetails.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {itemDetails.likes}
                      </div>
                    </div>
                    <p>
                      {itemDetails.description}
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${itemDetails.ownerId}`}>
                              <img className="lazy" src={itemDetails.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemDetails.ownerId}`}>{itemDetails.ownerName}</Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${itemDetails.creatorId}`}>
                              <img className="lazy" src={itemDetails.creatorImage} alt="creatorImage" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemDetails.creatorId}`}>{itemDetails.creatorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{itemDetails.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton width="100%" height="500px" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      <Skeleton width="70%" height="40px" borderRadius="1px" />
                    </h2>
                    <div className="item_info_counts">
                      <Skeleton width="35px" height="35px" borderRadius="1px" />
                      <Skeleton width="35px" height="35px" borderRadius="1px" />
                    </div>
                    <p>
                      <Skeleton width="69%" height="69px" borderRadius="4px" />
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton width="50px" height="50px" borderRadius="100%" />
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="author_list_info">
                            <Skeleton width="185px" height="20px" borderRadius="1px" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton width="50px" height="50px" borderRadius="100%" />
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="author_list_info">
                            <Skeleton width="35%" height="20px" borderRadius="1px" />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <div className="nft-item-price">
                        <Skeleton width="80px" height="50px" borderRadius="1px" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;