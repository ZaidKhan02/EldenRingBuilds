// Profile.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

export default function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:5001/api/user/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to fetch user");
            }
        };
        fetchUser();
    }, [id]);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5001/api/user/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            logout();
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Failed to delete account");
        }
    };

    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!user) return <p>Loading profile...</p>;

    return (
        <div className="profile gold-text">
            <h1>{user.username}</h1>
            <p>Member since: {new Date(user.created_at).toLocaleDateString()}</p>
            <button className="submit-button" onClick={handleDelete}>
                Delete Account
            </button>
        </div>
    );
}
