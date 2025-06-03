import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../components/AllRequest";
import { MdEditSquare } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

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
    <div className="p-8 min-h-screen">
      <div className="bg-orangehell p-4 rounded-lg w-[50%]">
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

        <div className="mt-6 flex justify-end gap-8">
          <button
            onClick={() => navigate(-1)}
            // navigate(-1): schickt mich eine Seite im Verlauf zurück.
            className="bg-accent text-white px-3 py-1 rounded flex items-center gap-1"
          >
            <IoMdArrowRoundBack />
            Go Back
          </button>
          <button
            onClick={() => navigate(`/posts/${id}/edit`)}
            className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-1"
          >
            <MdEditSquare />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
