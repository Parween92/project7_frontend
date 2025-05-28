import { useEffect, useState } from "react";
import axios from "axios";
import { getAllPosts } from "../components/AllRequest";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setLoading(true);

        const response = await axios.get(getAllPosts);
        setPostData(response.data.results);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllPosts();
  }, []);

  console.log(getAllPosts);

  return (
    <div className="">
      {postData.title}
      {postData.author}
      {/* <h2 className="text-3xl font-bold text-white text-center mb-6">EVENTS</h2>

      {error && <p className="text-red-200 text-center font-medium">{error}</p>}

      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {postData.map(() => (
            <div
              key={postData.id}
              className="bg-gray-900 rounded-2xl shadow-lg p-4 flex flex-col 
              justify-between hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-center text-white bg-indigo-600 px-4 py-2 rounded-xl mb-4 shadow">
                {postData.author}
              </h3>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Home;
