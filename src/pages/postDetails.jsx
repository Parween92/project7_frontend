import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../components/AllRequest";
import { BiArrowBack } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

//category wie bei Form/////
const categoryIcons = {
  Adventure: "🧗‍♂️",
  Relaxation: "🌴",
  Culture: "🏛️",
  Nature: "🌲",
};

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostById(id);
        setPost(res.data.data);
      } catch (err) {
        console.error("Error loading post:", err);
        setError("Post not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  //  wenn sich id ändert, wird fetchPost() mit [] nicht nochmal ausgeführt!  deswgegn Immer wenn sich id ändert, wird fetchPost() erneut aufgerufen.

  if (loading) return <p>Load post...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return null;

  return (
    <div className="p-4 mx-auto w-[70%] flex flex-col bg-primary m-8">
      <h2 className="text-white text-2xl font-bold">{post.title}</h2>
      <p className="ml-2 mb-4 text-l font-bold text-white flex items-center gap-1">
        von {post.author}
      </p>
      <img
        src={post.cover}
        alt={post.title}
        className="w-full max-h-80 object-cover rounded mb-4"
      />
      <p className="mb-2 text-white ">{post.content}</p>
      <p className="text-sm text-white">
        Category:{" "}
        {post.category ? (
          <>
            {categoryIcons[post.category] || "❓"} {post.category}
          </>
        ) : (
          "No category"
        )}
      </p>
      <p className="text-sm text-white">Status: {post.status}</p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate(-1)}
          // navigate(-1): schickt mich eine Seite im Verlauf zurück.
          className="flex items-center gap-2 bg-white font-bold hover:bg-accent
           hover:text-white text-text px-3 py-1 rounded"
        >
          {" "}
          <BiArrowBack size={20} />
          Go back
        </button>
        <button
          onClick={() => navigate(`/posts/${id}/edit`)}
          className="flex items-center gap-2 hover:bg-accent hover:text-white
           bg-white font-bold text-primary px-3 py-1 rounded"
        >
          {" "}
          <FiEdit size={18} />
          Edit
        </button>
      </div>
    </div>
  );
}
