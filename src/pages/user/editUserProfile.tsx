import React, { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../../action/userApis";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [form, setForm] = useState<any>({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getUserProfile(token)
        .then((data) => {
          setForm({
            name: data.name,
            email: data.email,
            phone: data.phone || "",
            avatar: data.avatar || "",
            password: "",
            address: data.address || {
              street: "",
              city: "",
              state: "",
              zip: "",
            },
          });
        })
        .catch(() => setMessage("Failed to load profile"));
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setForm((prev: any) => ({
        ...prev,
        address: {
          ...(prev.address || {}),
          [field]: value,
        },
      }));
    } else {
      setForm((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      await updateUserProfile(token, form);
      setMessage("Profile updated successfully!");
      setTimeout(() => navigate("/profile"), 1000);
    } catch {
      setMessage("Update failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          value={form.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          name="phone"
          value={form.phone || ""}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border p-2 rounded"
        />
        <input
          name="avatar"
          value={form.avatar || ""}
          onChange={handleChange}
          placeholder="Avatar URL"
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          value={form.password || ""}
          onChange={handleChange}
          placeholder="New Password"
          className="w-full border p-2 rounded"
        />

        <div>
          <h3 className="font-semibold">Address</h3>
          <input
            name="address.street"
            value={form.address?.street || ""}
            onChange={handleChange}
            placeholder="Street"
            className="w-full border p-2 rounded mt-1"
          />
          <input
            name="address.city"
            value={form.address?.city || ""}
            onChange={handleChange}
            placeholder="City"
            className="w-full border p-2 rounded mt-1"
          />
          <input
            name="address.state"
            value={form.address?.state || ""}
            onChange={handleChange}
            placeholder="State"
            className="w-full border p-2 rounded mt-1"
          />
          <input
            name="address.zip"
            value={form.address?.zip || ""}
            onChange={handleChange}
            placeholder="ZIP"
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-rose-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
