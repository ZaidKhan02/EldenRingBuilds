import { useState } from "react";
import axios from "axios";
import './CommonStyles.css';

export default function CreateAccount() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/user/register", formData);
            alert("Account created successfully!");
            console.log("User:", res.data);
        } catch (err) {
            alert(err.response?.data?.error || "Error creating account");

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
                    <div className="card-submission">
                        <button type="submit" className="submit-button">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
