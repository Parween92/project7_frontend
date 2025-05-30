import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../components/AllRequest";

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
    <div className="p-4">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-sm text-gray-600 mb-2">von {post.author}</p>
      <img
        src={post.cover}
        alt={post.title}
        className="w-full max-h-80 object-cover rounded mb-4"
      />
      <p className="mb-2">{post.content}</p>
      <p className="text-sm text-gray-500">Category: {post.category}</p>
      <p className="text-sm text-gray-500">Status: {post.status}</p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate(-1)}
          // navigate(-1): schickt mich eine Seite im Verlauf zurück.
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Zurück
        </button>
        <button
          onClick={() => navigate(`/posts/${id}/edit`)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Bearbeiten
        </button>
      </div>
    </div>
  );
}
