import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCallback } from "react";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [authordata, setauthordata] = useState("");
  const [isFollowing, setFollowing] = useState(false)
  const id = useParams().id
  
  const fetchauthordata = useCallback(async () => {
  const response = await axios.get(
    `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
  );

  
  setauthordata(response.data); 
}, [id])

useEffect (() => {
  fetchauthordata();
}, [fetchauthordata]);


  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              {authordata ? (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authordata.authorImage} alt="authorImage" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authordata.authorName}
                            <span className="profile_username">@{authordata.tag}</span>
                            <span id="wallet" className="profile_wallet">
                              {authordata.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {authordata.followers + (isFollowing ? 1 : 0)}{""}
                          followers
                        </div>
                        {isFollowing ? (
                          <Link to="#" className="btn-main" onClick={() => setFollowing(!isFollowing)}>
                            UnFollow
                          </Link>
                        ) : (
                          <Link to="#" className="btn-main" onClick={() => setFollowing(!isFollowing)}>
                            Follow
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <Skeleton width="100%" height="200px"/>
                  </div>
                </div>
              
              )}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authordata={authordata}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
