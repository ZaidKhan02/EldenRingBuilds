import { useState } from 'react';
import axios from 'axios';
import './CommonStyles.css'

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/user/login", formData);

            // save token to localStorage
            localStorage.setItem("token", res.data.token);
            alert("Login successful!");
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <>
            <div className="background-image">
                <div className="card">
                    <h1 className="card-header gold-text">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="card-inputs">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
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
                            <button className="submit-button">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}