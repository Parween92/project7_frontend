import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost, deletePost } from "../components/AllRequest";
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

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

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deletePost(id);         
      navigate("/");              
    } catch (err) {
      setError("Error deleting post");
      console.error("Error deleting post:", err);
    }
  };

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
    <div className="p-8 min-h-screen">
      <form onSubmit={handleSubmit} className="bg-orangehell p-4 rounded-lg w-[35%]">
        <input
          name="title"
          value={form.title}
          placeholder={post.title}
          className="placeholder:text-black text-2xl font-bold text-black w-full border-white rounded-lg p-2 mb-2"
          onChange={handleChange}
        />

        <input
          name="author"
          value={form.author}
          placeholder={post.author}
          className="placeholder:text-gray-600 text-sm text-gray-600 mb-2 border-white rounded-lg p-1"
          onChange={handleChange}
        />

        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-40 object-cover rounded mb-3"
        />

        <textarea
          name="content"
          value={form.content}
          placeholder={post.content}
          className="placeholder:text-black w-full border-white rounded-lg p-2 mb-2"
          onChange={handleChange}
        />

        <div className="text-sm text-gray-500 mb-2 flex gap-1 items-baseline">
          <label>Category:</label>
          <input
            name="category"
            value={form.category}
            placeholder={post.category}
            className="placeholder:text-gray-500 placeholder:text-sm border-white rounded-lg p-1 mb-2"
            onChange={handleChange}
          />
        </div>

        <div className="text-sm text-gray-500 mb-2 flex gap-1 items-baseline">
          <label>Status:</label>
          <input
            name="status"
            value={form.status}
            placeholder={post.status}
            className="placeholder:text-gray-500 placeholder:text-sm border-white rounded-lg p-1 mb-2"
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-8 mt-4 justify-between">
        <button
          onClick={handleDelete}
          className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded"
        >
          <MdDeleteForever size={20} />
          Delete
        </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-accent text-white px-3 py-1 rounded flex items-center gap-1"
          ><IoMdArrowRoundBack />
            Go Back
          </button>
          <button type="submit" className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-1">
          <MdEditSquare />
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
