import eldenringicon from '../images/eldenringicon.png';
import './Footer.css'
import { Link } from 'react-router-dom';
import { Copyright } from 'lucide-react';


export default function Footer() {
    return (
        <>
            <div className='footer'>
                <div className='footer-left'>
                    <Link to="/"><span className='header gold-text logo'>elden ring builds</span></Link>
                    <img src={eldenringicon} alt="" className='icon' />
                </div>
                <div className='footer-right'>
                    <div>
                        <header className='gold-text'>Elden Ring Builds</header>
                        <ul>
                            <Link to="/builder"><li>Builder</li></Link>
                            <Link to="/builds"><li>Builds</li></Link>
                            <Link to="/index"><li>Index</li></Link>
                            <Link to="/forums"><li>Forums</li></Link>
                        </ul>
                    </div>
                    <div>
                        <header className='gold-text'>Account</header>
                        <ul>
                            <Link to="/login"><li>Login</li></Link>
                            <Link to="/createaccount"><li>Create Account</li></Link>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='copyright'>
                <p><Copyright size={12} strokeWidth={2} /> 2025 Elden Ring Builds. All rights reserved.</p>
            </div>
        </>
    )
}



