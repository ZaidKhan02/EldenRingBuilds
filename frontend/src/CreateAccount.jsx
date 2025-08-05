import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import './CommonStyles.css';

export default function CreateAccount() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/user/register", formData);
            navigate("/login");
            console.log("User:", res.data);
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong, please try again.");
        }
    };

    return (
        <div className="background-image">
            <div className="card">
                <h1 className="card-header gold-text">Create Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="card-inputs">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="card-input"
                            required
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            className="card-input"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="card-input"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <div className="card-submission">
                        <button type="submit" className="submit-button">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
}