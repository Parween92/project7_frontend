import { useEffect, useState } from "react";
import { getAllPosts } from "../components/AllRequest";
import PostCard from "../components/PostCard";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Posts, setPosts] = useState([]);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const response = await getAllPosts();
      setPosts(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div className="p-8 ">
      <h2 className="text-3xl font-black text-secondary mb-4">
        Travel Stories & Adventures from Around the World
      </h2>
      {error && <p>{error}</p>}
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDeleteSuccess={fetchAllPosts}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
