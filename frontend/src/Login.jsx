import './CommonStyles.css'

export default function Login() {
    return (
        <>
            <div className="background-image">
                <div className="card">
                    <h1 className="card-header gold-text">Login</h1>
                    <form /*onSubmit={handleSubmit}*/>
                        <div className="card-inputs">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="card-input"
                                required
                            /*onChange={handleChange}*/
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="card-input"
                                required
                            /*onChange={handleChange}*/
                            />
                        </div>
                        <div className="card-submission">
                            <button className="submit-button">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}