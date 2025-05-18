import React, {useEffect, useState} from "react";
import { BASE_URL } from "../utils/fetchfromApi";
import Slick from "../utils/Slick"
import Skeleton from "../UI/Skeleton";


const HotCollections = () => {

  const [hotcollection, sethotcollection] = useState([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      sethotcollection(data);     
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false)
      }
    }

    fetchData();
  }, []);

  

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoading ? (
            <div className="row">
              {Array(4).fill().map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft_coll">
                    <Skeleton width="100%" height="180px" borderRadius="10px" />
                    <div className="nft_coll_pp">
                      <Skeleton width="60px" height="50px" borderRadius="100%" />
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
          ) : ( 
            <Slick items={ hotcollection }> </Slick>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;