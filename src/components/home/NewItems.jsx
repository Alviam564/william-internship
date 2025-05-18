import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/fetchfromApiItems"
import Slick from "../utils/Slick";
import Skeleton from "../UI/Skeleton";


const NewItems = () => {

  const [newitems, setnewitems] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [now, setNow] = useState(Date.now())
  
    useEffect(() => {
      const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        setnewitems(data);     
        } catch (error) {
          console.error("Failed to fetch data:", error);
        } finally {
          setLoading(false)
        }
      }
  
      fetchData();
    }, []);


    function countdown(expiryTime, now){
      const timeLeft = expiryTime - now;

      if (timeLeft <= 0) return "Expired"
      
      let hours = Math.floor(timeLeft / (1000 * 60 * 60))
      let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
      let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

      const pad = (n) => n.toString().padStart(2)
      return `${pad(hours)}h ${pad(minutes)}m ${(seconds)}s`
    }

    useEffect(() => {
      const interval = setInterval(() => {
        setNow(Date.now());
      }, 1000)

      return () => clearInterval(interval)
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
          {isLoading ? (
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
          ) : ( 
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
                    <div className="de_countdown">{countdown(items.expiryDate, now)}</div>
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
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
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
