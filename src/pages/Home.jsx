import { useEffect, useState } from "react";
import { getAllPosts } from "../components/AllRequest";
import PostCard from "../components/PostCard";

import PostForm from "./PostForm";


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Posts, setPosts] = useState([]);
  //showForm-State anlegen: Form sichtbar sein soll oder nicht.
  const [showForm, setShowForm] = useState(false);

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

  // Callback handleSuccess an PostForm übergeben:
  // --> um nach erfolgreichem Post neue Posts zu laden & Formular zu schließen
  const handleSuccess = () => {
    setShowForm(false);
    fetchAllPosts();
  };
  // setShowForm(false): Form wird aus dem UI entfernt.

  return (
    <div className="p-8 ">
      <h2 className="mb-8 text-3xl font-black text-accent ">
        Travel Stories & Adventures from Around the World
      </h2>

      {/* FORM_BUTTON */}

      {/*Wenn showForm true ist, wird <PostForm /> angezeigt. */}
      {showForm && <PostForm onSuccess={handleSuccess} />}

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
