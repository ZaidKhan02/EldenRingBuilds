import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './CommonStyles.css'

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/user/login", formData);
            //update AuthContext + localStorage
            login(res.data.token, res.data.user);
            navigate("/builder");
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

