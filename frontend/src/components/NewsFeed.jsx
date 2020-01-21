import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/NewsFeed.scss";
import Postcard from "./Postcard";
import LiveContainer from "./LiveContainer";
import PostField from "./PostField";
import { backend } from "../conf.js";
import { useSelector, useDispatch } from "react-redux";
import Filter from "./Filter";

function NewsFeed() {
  const filters = useSelector(state => state.filters);
  const [posts, setPosts] = useState([]);
  const offsetPosts = useSelector(state => state.offsetPosts);
  const reload = useSelector(state => state.reload);
  const dispatch = useDispatch();

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.scrollHeight
    ) {
      dispatch({ type: "PLUS_TEN" });
    }
  };

  useEffect(() => {
    console.log(filters);
    if (offsetPosts === 0) {
      axios.get(`${backend}/api/posts/${offsetPosts}`).then(({ data }) => {
        setPosts(data);
      });
    } else {
      axios.get(`${backend}/api/posts/${offsetPosts}`).then(({ data }) => {
        setPosts(posts.concat(data));
      });
    }
  }, [offsetPosts, reload]);

  return (
    <div className="main-NewsFeed">
      <PostField />
      <Filter />
      {filters.length > 0
        ? posts
            .filter(post => filters.includes(post.game_id))
            .map(post => (
              <Postcard
                message={post.message}
                date={post.date}
                image_url={post.image_url}
                game_id={post.game_id}
                user_avatar={post.user_avatar}
                id={post.id}
              />
            ))
        : posts.map(post => (
            <Postcard
              message={post.message}
              date={post.date}
              image_url={post.image_url}
              game_id={post.game_id}
              user_avatar={post.user_avatar}
              id={post.id}
            />
          ))}

      <LiveContainer />
    </div>
  );
}

export default NewsFeed;
