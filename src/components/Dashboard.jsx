import React, { useState, useEffect } from "react";
import { useAuth } from "../authContext/AuthContext";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "", phone: "", location: "", bio: "" });
  const [stats, setStats] = useState({ orders: 0, spent: 0, reviews: 0 });
  const [activities, setActivities] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const mock = {
      id: "u_01",
      name: "Md Shohag Mia",
      email: "mdshohagmia53200@gmail.com",
      role: "Customer",
      phone: "01731378743",
      location: "Jamalpur Sadar, Mymensingh, Bangladesh",
      bio: "Frontend developer who loves clean UI and Tailwind.",
      avatar: "https://i.pravatar.cc/150?img=12",
    };
    setUser(mock);
    setForm(mock);
    setStats({ orders: 124, spent: 89320, reviews: 18 });
    setActivities([
      { id: 1, text: "Ordered ‘Wireless Headphones’", time: "2 days ago" },
      { id: 2, text: "Left a review on ‘Bluetooth Speaker’", time: "5 days ago" },
      { id: 3, text: "Updated profile picture", time: "2 weeks ago" },
    ]);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setUser(prev => ({ ...prev, ...form }));
    setSaving(false);
    setEditing(false);
  }

  function handleAvatar(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUser(prev => ({ ...prev, avatar: url }));
  }

  let {logout} = useAuth()
  let handleLogout = ()=>{
    logout();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl p-6 border border-indigo-100">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden shadow-md border-4 border-indigo-500">
                <img src={user?.avatar} alt="avatar" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-indigo-700">{user?.name}</h3>
                <p className="text-sm text-gray-500">{user?.role}</p>
                <p className="mt-1 text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="file" accept="image/*" onChange={handleAvatar} className="hidden" id="avatarUpload" />
                <label htmlFor="avatarUpload" className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-md text-sm shadow">Change Avatar</label>
              </label>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-indigo-50 border border-indigo-100 rounded-md p-3 text-center">
                  <div className="text-xs text-indigo-600">Orders</div>
                  <div className="mt-1 text-lg font-semibold text-indigo-700">{stats.orders}</div>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 rounded-md p-3 text-center">
                  <div className="text-xs text-indigo-600">Spent</div>
                  <div className="mt-1 text-lg font-semibold text-indigo-700">৳{stats.spent.toLocaleString()}</div>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 rounded-md p-3 text-center">
                  <div className="text-xs text-indigo-600">Reviews</div>
                  <div className="mt-1 text-lg font-semibold text-indigo-700">{stats.reviews}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-indigo-100">
                <h4 className="text-sm font-medium text-indigo-700">Contact</h4>
                <p className="mt-2 text-sm text-gray-700">{user?.phone}</p>
                <p className="mt-1 text-sm text-gray-700">{user?.location}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => setEditing(true)} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md shadow">Edit Profile</button>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow cursor-pointer">Logout</button>
            </div>
          </div>

          <div className="mt-6 bg-white/90 backdrop-blur-xl shadow-xl border border-indigo-100 rounded-2xl p-6">
            <h4 className="text-sm font-semibold text-indigo-700">Account Settings</h4>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-700">Receive newsletter</div>
                  <div className="text-xs text-gray-500">Weekly updates and offers</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-checked:bg-indigo-600 rounded-full shadow-inner"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-700">Two-factor authentication</div>
                  <div className="text-xs text-gray-500">Extra account protection</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-checked:bg-indigo-600 rounded-full shadow-inner"></div>
                </label>
              </div>

              <div className="pt-2">
                <button onClick={() => setShowPassword(v => !v)} className="w-full px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md shadow">{showPassword ? 'Hide Password' : 'Change Password'}</button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/90 backdrop-blur-xl border border-indigo-100 shadow-xl rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-indigo-700">Profile</h2>
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500">Member since 2020</div>
                <div className="h-8 w-px bg-gray-200" />
                <button onClick={() => { setEditing(e => !e); setForm(user); }} className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-md shadow">{editing ? 'Cancel' : 'Edit'}</button>
              </div>
            </div>

            {editing ? (
              <form onSubmit={handleSave} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" value={form.name} onChange={handleChange} className="p-3 border rounded-md" placeholder="Name" />
                <input name="email" value={form.email} onChange={handleChange} className="p-3 border rounded-md" placeholder="Email" />
                <input name="phone" value={form.phone} onChange={handleChange} className="p-3 border rounded-md" placeholder="Phone" />
                <input name="location" value={form.location} onChange={handleChange} className="p-3 border rounded-md" placeholder="Location" />
                <textarea name="bio" value={form.bio} onChange={handleChange} className="p-3 border rounded-md md:col-span-2" placeholder="Bio" />
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow md:col-span-2">{saving ? 'Saving...' : 'Save Changes'}</button>
              </form>
            ) : (
              <div className="mt-6 text-gray-700 space-y-2">
                <p><span className="font-medium">Name:</span> {user?.name}</p>
                <p><span className="font-medium">Email:</span> {user?.email}</p>
                <p><span className="font-medium">Phone:</span> {user?.phone}</p>
                <p><span className="font-medium">Location:</span> {user?.location}</p>
                <p><span className="font-medium">Bio:</span> {user?.bio}</p>
              </div>
            )}
          </div>

          <div className="bg-white/90 backdrop-blur-xl border border-indigo-100 shadow-xl rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-indigo-700">Recent Activity</h2>
            <ul className="mt-4 space-y-3">
              {activities.map(a => (
                <li key={a.id} className="p-3 bg-indigo-50 border border-indigo-100 rounded-md">
                  <div className="text-gray-700">{a.text}</div>
                  <div className="text-xs text-gray-500">{a.time}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}