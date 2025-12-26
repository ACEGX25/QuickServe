
import React, { useState } from "react";
import "./UpdateProfile.css";

export default function UpdateProfile() {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    location: "",
    phone: "",
    email: "",
    image: null,
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setProfile({
      ...profile,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully 💙");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="avatar-box">
          <img
            src={
              profile.image ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="profile"
          />
          <label className="upload-btn">
            Upload Photo
            <input type="file" accept="image/*" onChange={handleImage} />
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={profile.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="bio"
            placeholder="Short bio about you"
            value={profile.bio}
            onChange={handleChange}
            rows="3"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={profile.location}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={profile.phone}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={profile.email}
            onChange={handleChange}
          />

          <button type="submit">Save Profile</button>
        </form>
      </div>
    </div>
  );
}
