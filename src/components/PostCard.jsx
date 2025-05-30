import { deletePost } from "./AllRequest";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";

function PostCard({ post, onDeleteSuccess }) {
  console.log("Post im Card:", post);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!post?.id) {
      console.warn("❌ No ID ");
      return;
    }

    console.log("🔍 delete Post with ID:", post.id);
    //DELTETE REQUEST
    try {
      await deletePost(post.id);
      if (onDeleteSuccess) {
        onDeleteSuccess(post.id); // Post ist weg
      }

      // Hier kommt Feedback

      Swal.fire({
        toast: true,
        position: "center",
        icon: "success",
        title: "Post was deleted",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (err) {
      console.error("❌ Error deleting:", err);
    }
  };

  const goToDetails = () => navigate(`/posts/${post.id}`);
  const goToEdit = () => navigate(`/posts/${post.id}/edit`);

  return (
    <div className="bg-orangehell p-4 rounded-lg">
      <div key={post.id}>
        <h3>{post.author}</h3>
        <h4>{post.title}</h4>
        <p>{post.content}</p>
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-40 object-cover rounded mb-3"
        />
      </div>

      <div className="flex gap-8 mt-4 justify-between">
        <button
          onClick={handleDelete}
          className=" flex gap-2 bg-red-500 text-white px-3 py-1 rounded"
        >
          <MdDeleteForever size={20} />
          Delete
        </button>

        {/* Button für einzelenn Sieten */}

        <button
          onClick={goToDetails}
          className="bg-accent text-white px-3 py-1 rounded"
        >
          Details
        </button>
        <button
          onClick={goToEdit}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
export default PostCard;
