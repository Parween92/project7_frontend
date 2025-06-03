import { useState } from "react";
import { createPost } from "../components/AllRequest";
import { MdSave } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// window.createPost = createPost;
export default function PostForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    content: "",
    cover: "",
    status: "",
    category: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  //success für Save Button status
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const categoryIcons = {
    Adventure: "🧗‍♂️",
    Relaxation: "🌴",
    Culture: "🏛️",
    Nature: "🌲",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.author ||
      !formData.title ||
      !formData.content ||
      !formData.cover ||
      !formData.status
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await createPost(formData);
      // Falls response.data alle Felder enthält:
      setFormData((prev) => ({ ...prev, ...response.data }));

      setError(null);
      setSuccess(true); // damit Feedback angezeigt wird
      if (onSuccess) onSuccess();

      setTimeout(() => setSuccess(false), 3000); // Feedback nach 3 Sekunden ausblenden
    } catch (error) {
      console.error("❌ Error creating:", error);
      setError("Creation failed.");
    }
    Swal.fire({
      toast: true,
      position: "center",
      icon: "success",
      title: "your Form has been submitten",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
  };

  return (
    <form className="m-10" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-xl font-bold text-primary">Create new post</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Autor*in"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Titel"
        required
        className="mt-4  w-full border px-3 py-2 rounded"
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Inhalt"
        required
        rows={4}
        className="mt-4 w-full border px-3 py-2 rounded"
      />
      <input
        name="cover"
        value={formData.cover}
        onChange={handleChange}
        placeholder="Bild-URL"
        required
        className="mt-4 w-full border px-3 py-2 rounded"
      />

      {/* <input
        name="status"
        value={formData.status}
        onChange={handleChange}
        placeholder="Status"
        required
        className="w-full border px-3 py-2 rounded"
      /> */}
      <div className="flex gap-2 items-center mt-5 ">
        <label htmlFor="category" className="text-primary block font-bold mb-1">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="text-primary w-full border px-3 py-2 rounded"
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
          className="ml-4 block font-bold text-primary  mb-1"
        >
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="text-primary w-full border px-3 py-2 rounded"
        >
          <option value="">-- Select Status --</option>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
      </div>
      <button
        onClick={() => navigate(-1)}
        type="submit"
        className="flex gap-1 items-center bg-primary mt-5 mb-5 px-2 py-2  hover:bg-accent text-white rounded"
      >
        {" "}
        <MdSave size={20} />
        Save
      </button>
      {/* Feedback zeigen lassen */}
      {success && (
        <p className="text-accent text-xl font-semibold mb-2">
          Post saved successfully!
        </p>
      )}
    </form>
  );
}
