import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../components/AllRequest";

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [form, setForm] = useState({
    title: "",
    author: "",
    cover: "",
    content: "",
    category: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostById(id);
        setPost(res.data.data);
        setForm({
          title: res.data.title,
          author: res.data.author,
          cover: res.data.cover,
          content: res.data.content,
          category: res.data.category,
          status: res.data.status,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error loading post:", err);
        setError("Post not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, form);
    } catch (err) {
      setError("Error updating post");
    }
  };

  if (loading) return <p>Load post...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return null;

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          placeholder={post.title}
          className="placeholder:text-black text-2xl font-bold text-black w-full"
          onChange={handleChange}
        />

        <input
          name="author"
          value={form.author}
          placeholder={post.author}
          className="placeholder:text-gray-600 text-sm text-gray-600 mb-2 w-full"
          onChange={handleChange}
        />

        <img
          src={post.cover}
          alt={post.title}
          className="w-full max-h-80 object-cover rounded mb-4"
        />

        <textarea
          name="content"
          value={form.content}
          placeholder={post.content}
          className="placeholder:text-black w-full mb-2"
          onChange={handleChange}
        />

        <div className="text-sm text-gray-500 mb-2 flex gap-1">
          <label>Category:</label>
          <input
            name="category"
            value={form.category}
            placeholder={post.category}
            className="placeholder:text-gray-500 placeholder:text-sm w-full"
            onChange={handleChange}
          />
        </div>

        <div className="text-sm text-gray-500 mb-2 flex gap-1">
          <label>Status:</label>
          <input
            name="status"
            value={form.status}
            placeholder={post.status}
            className="placeholder:text-gray-500 placeholder:text-sm w-full"
            onChange={handleChange}
          />
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Go Back
          </button>
          <button type="submit" className="bg-gray-300 px-3 py-1 rounded">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
