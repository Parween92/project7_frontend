import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost, deletePost } from "../components/AllRequest";
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdSave } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import Swal from "sweetalert2";

//category wie bei Form/////
const categoryIcons = {
  Adventure: "🧗‍♂️",
  Relaxation: "🌴",
  Culture: "🏛️",
  Nature: "🌲",
};

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
          title: res.data.data.title,
          author: res.data.data.author,
          cover: res.data.data.cover,
          content: res.data.data.content,
          category: res.data.data.category,
          status: res.data.data.status,
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

  // const handleDelete = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await deletePost(id);
  //     navigate("/");
  //   } catch (err) {
  //     setError("Error deleting post");
  //     console.error("Error deleting post:", err);
  //   }
  // };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePost(id, form);

      // Hier kommt Feedback
      await Swal.fire({
        toast: true,
        position: "center",
        icon: "success",
        title: "Post is done",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });

      navigate("/");
      // Hier soll dann zur Startseite, wenn gespeichert ist
    } catch (err) {
      setError("Error updating post");
    }
  };

  if (loading) return <p>Load post...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return null;

  return (
    <div className="p-8 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-orangehell p-4 rounded-lg m-auto w-[70%]"
      >
        <input
          name="title"
          value={form.title}
          placeholder={post.title}
          className="placeholder:pl-2 mb-4 w-full bg-transparent border-2 rounded-lg border-text  text-accent  text-2xl "
          onChange={handleChange}
        />

        <input
          name="author"
          value={form.author}
          placeholder={post.author}
          className="pl-2 mb-4 bg-transparent border-2 rounded-lg border-text  text-accent "
          // className="placeholder:text-gray-600 text-sm text-gray-600 mb-2 border-white rounded-lg p-1"
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
          className="pl-2 mb-4 bg-transparent border-2 rounded-lg border-text  text-accent w-full"
          onChange={handleChange}
        />

        <label htmlFor="category" className="text-text block font-bold mb-1">
          Category
        </label>
        <select
          name="category"
          value={form.category}
          // placeholder={post.category}
          onChange={handleChange}
          required
          className="text-text w-full border px-3 py-2 rounded mb-5"
        >
          <option value="">-- Select Category --</option>
          {Object.entries(categoryIcons).map(([cat, icon]) => (
            <option key={cat} value={cat}>
              {icon} {cat}
            </option>
          ))}
        </select>

        <label
          htmlFor="status"
          className="ml-4 block font-bold text-text  mb-1"
        >
          Status
        </label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
          className="text-text mb-5 w-full border px-3 py-2 rounded"
        >
          <option value="">-- Select Status --</option>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>

        <div className="flex gap-8 mt-4 justify-between">
          <button
            type="button"
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
            // onClick={() => navigate(-1)}
            type="submit"
            className="flex gap-1 items-center bg-primary px-2 py-2  hover:bg-accent text-white rounded"
          >
            {" "}
            <MdSave size={20} />
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
