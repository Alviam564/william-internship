import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import Countdown from "../utils/Countdown";
import axios from "axios";

const Explore = () => {

  const [explore, setExplore] = useState(8)
  const [exploreItems, setExploreItems] = useState([])
  const [IsLoading, setLoading] = useState (true)

  const fetchexploredata = async () => {
    const response = await axios.get(
      'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore'
    )
    setExploreItems(response.data)
  }

  async function ExploreFilter(filter) {
    setLoading(false)
    const response = await axios.get (
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    )
    setExploreItems(response.data)
    setLoading(true)
  }

  useEffect(() => {
    fetchexploredata()
  },[]);


  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => ExploreFilter(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems.length && IsLoading ? (
        exploreItems.slice(0, explore).map((exploration, index) => (
          <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ display: "block", backgroundSize: "cover" }}>
            <div className="nft__item">
              <div className="author_list_pp">
                <Link to={`/author/${exploration.authorId}`} data-bs-toggle="tooltip" data-bs-placement="top">
                  <img className="lazy" src={exploration.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <Countdown expiryDate={exploration.expiryDate} />
              <div className="nft__item_wrap">
                <Link to={`/item-details/${exploration.nftId}`}>
                  <img src={exploration.nftImage} className="lazy nft__item_preview" alt="nftImage" />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${exploration.nftId}`}>
                  <h4>{exploration.title}</h4>
                </Link>
                <div className="nft__item_price">{exploration.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{exploration.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : ( 
      <>
        {new Array(8).fill(0).map((_, index) => (
          <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ display: "block", backgroundSize: "cover" }}>
            <div className="nft__item">
              <Skeleton />
              <div className="author_list_pp">
                <Skeleton width="50px" height="50px" borderRadius="100%" />
                <i className="fa fa-check"></i>
              </div>
              <div className="nft__item_wrap">
                <Skeleton width="100%" height="280px" />
              </div>
              <div className="nft__item_info">
                <Skeleton width="35%" height="25px" borderRadius="4px" />
                <div className="nft__item_price">
                  <Skeleton width="25%" height="20px" borderRadius="1px" />
                </div>
                <div className="nft__item_like">
                  <Skeleton width="35px" height="20px" borderRadius="1px" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
      )}
      <div className="col-md-12 text-center">
        {explore !== 16 && (
          <Link onClick={() => setExplore(explore + 4)} to="" id="loadmore" data-aos="fade-up" className="btn-main lead">
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default Explore;