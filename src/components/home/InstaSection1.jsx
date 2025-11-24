import React, { useEffect, useState } from "react";
import Loader from "../loader/loader";

export default function InstaSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type&access_token=${ACCESS_TOKEN}`
        );

        const data = await response.json();

        if (data.data) {
          setPosts(data.data.slice(0, 4)); // take only the latest 4 posts
          setLoading(false);
        } else {
          setPosts([]);
        }
      } catch (error) {
        setLoading(true);
        console.error("Error fetching Instagram posts:", error);
      }
    };

    fetchPosts();
  }, []);

  console.log("posts", posts);

  return (
    <>
      <section className="insta-wrapper container-fluid">
        {loading ? (
          <Loader />
        ) : (
          <div className=" row justify-content-center">
            <div className="col-11">
              {posts.length > 0 && (
                <div className="container-fluid">
                  <div className="insta-container">
                    <div className="insta-item">
                      <a
                        href={posts[0].permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {posts[0].media_type === "VIDEO" ? (
                          <video
                            src={posts[0].media_url}
                            className="insta-img"
                            controls
                          />
                        ) : (
                          <img
                            src={posts[0].media_url}
                            className="insta-img"
                            alt={posts[0].caption || "Instagram Post"}
                          />
                        )}
                      </a>
                    </div>
                    <div className="insta-item">
                      <a
                        href={posts[1].permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {posts[1].media_type === "VIDEO" ? (
                          <video
                            src={posts[1].media_url}
                            className="insta-img"
                            controls
                          />
                        ) : (
                          <img
                            src={posts[1].media_url}
                            className="insta-img"
                            alt={posts[1].caption || "Instagram Post"}
                          />
                        )}
                      </a>
                    </div>
                    <div className="insta-item">
                      <div className="insta-center">
                        <h4 class="feature-adipisicing main-ti">
                          Our Instagram
                        </h4>
                        <p className="insta-desc">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      </div>
                    </div>
                    <div className="insta-item">
                      <a
                        href={posts[2].permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {posts[2].media_type === "VIDEO" ? (
                          <video
                            src={posts[2].media_url}
                            className="insta-img"
                            controls
                          />
                        ) : (
                          <img
                            src={posts[2].media_url}
                            className="insta-img"
                            alt={posts[2].caption || "Instagram Post"}
                          />
                        )}
                      </a>
                    </div>
                    <div className="insta-item">
                      <a
                        href={posts[3].permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {posts[3].media_type === "VIDEO" ? (
                          <video
                            src={posts[3].media_url}
                            className="insta-img"
                            controls
                          />
                        ) : (
                          <img
                            src={posts[3].media_url}
                            className="insta-img"
                            alt={posts[3].caption || "Instagram Post"}
                          />
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
