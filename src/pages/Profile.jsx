import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, fetchUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.image || "");

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  const initials = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("address", address);
    if (image) formData.append("image", image);

    try {
      await api.put(`/user/${user._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      fetchUser();
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow border border-gray-200">
      <div className="flex items-center gap-4 mb-6">
        {preview ? (
          <img
            src={preview}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold border-2 border-gray-300">
            {initials}
          </div>
        )}
        <div>
          {editMode ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-1 rounded w-40"
            />
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-500">
                {user.role === "admin" ? "Admin" : "User"}
              </p>
            </>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between items-center border border-[#00000029] rounded py-2 px-4">
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="text-gray-600">{user.email}</span>
        </div>

        <div
          className={`flex justify-between items-center ${
            editMode ? "" : "border border-[#00000029] rounded py-2 px-4"
          }`}
        >
          <span className="font-semibold text-gray-700">Phone:</span>
          {editMode ? (
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-1 rounded w-40"
            />
          ) : (
            <span className="text-gray-600">
              {user.phone || "Not provided"}
            </span>
          )}
        </div>

        <div
          className={`flex justify-between items-center ${
            editMode ? "" : "border border-[#00000029] rounded py-2 px-4"
          }`}
        >
          <span className="font-semibold text-gray-700">Address:</span>
          {editMode ? (
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-1 rounded w-40"
            />
          ) : (
            <span className="text-gray-600">
              {user.address || "Not provided"}
            </span>
          )}
        </div>

        {editMode && (
          <div>
            <label className="font-semibold text-gray-700 pr-2">
              Profile Image:
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="bg-blue-100 py-2 rounded pl-4"
            />
          </div>
        )}

        <div className="flex justify-center gap-4 mt-8">
          {editMode ? (
            <>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;