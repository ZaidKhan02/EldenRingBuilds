import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { Pickaxe, Book, ShieldCheck, MessageCircle } from 'lucide-react';
import { useAuth } from './AuthContext';

export default function Navbar() {
    const { isLoggedIn, user, logout } = useAuth();

    return (
        <div className='navbar'>
            <nav className='navbar-top'>
                <div className='nav-left'>
                    <Link to="/"><span className='gold-text header logo'>Elden Ring Builds</span></Link>
                </div>
                <div className='nav-right'>
                    {isLoggedIn ? (
                        <>
                            <Link to={`/profile/${user.id}`}><span className='gold-text'>Profile</span></Link>
                            <button className="gold-text logout-btn" onClick={logout}>
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login"><span className='gold-text'>Log In</span></Link>
                            <Link to="/createaccount"><span className='gold-text'>Create Account</span></Link>
                        </>
                    )}
                </div>
            </nav>
            <nav className='navbar-bottom'>
                <Link to="/builder" className='nav-link'><span className='gold-text nav-item'> <Pickaxe size={20} strokeWidth={2} />Builder</span></Link>
                <Link to="/builds" className='nav-link'><span className='gold-text nav-item'><ShieldCheck size={20} strokeWidth={2} />Completed Builds</span></Link>
                <Link to="/index" className='nav-link'><span className='gold-text nav-item'> <Book size={20} strokeWidth={2} />Index</span></Link>
                <Link to="/forums" className='nav-link'><span className='gold-text nav-item'><MessageCircle size={20} strokeWidth={2} />Forums</span></Link>
            </nav>
        </div>
    )
}
