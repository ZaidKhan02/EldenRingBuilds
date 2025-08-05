import './HomePage.css'
import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext'

//maybe later make another component called NavItem where all the navitems are and we call it here
//when logged in, the option in navbar will be profile (to view your builds) and logout
//and in homepage, just a logout button.


export default function HomePage() {
    const { isLoggedIn, logout } = useAuth();

    return (
        <>
            <div className="background-image gold-text">
                <div className='title'>
                    <h1>CREATE. SHARE. DISCOVER.</h1>
                </div>
                <div className='description'>
                    <p>Create your builds. Compare and share. Search the game's index. Discuss the game with others.</p>
                </div>
                <div className='buttons'>
                    {isLoggedIn ? (
                        <>
                            <button className="gold-text submit-button" onClick={logout}>
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login"><button className='submit-button'>Login</button></Link>
                            <Link to="/createaccount"><button className='submit-button'>Create Account</button></Link>
                        </>
                    )}
                </div>
            </div>
            {/*the about section will contain the latest 3 of each, latest 3 builds, latest 3 forum posts, 3 sections will be weapons, armors, bosses, builder will contain 3 pics of weapons armors and stuff*/}
            <div className='about-section '>
                <h1 className='gold-text'>BUILDER</h1>
                <Link to="/builder"><button className='submit-button'>Builder</button></Link>
                <div className='about-details'>
                    <div><p>This will contain information about builds</p></div>
                    <div><p>This will contain information about builds</p></div>
                    <div><p>This will contain information about builds</p></div>
                </div>
            </div>
            <div className='about-section '>
                <h1 className='gold-text'>COMPLETED BUILDS</h1>
                <Link to="/builds"><button className='submit-button'>Builds</button></Link>
                <div className='about-details'>
                    <div><p>This will contain information about completed builds</p></div>
                    <div><p>This will contain information about completed builds</p></div>
                    <div><p>This will contain information about complted builds</p></div>
                </div>
            </div>
            <div className='about-section '>
                <h1 className='gold-text'>INDEX</h1>
                <Link to="/index"><button className='submit-button'>Index</button></Link>
                <div className='about-details'>
                    <div><p>This will contain information about weapons</p></div>
                    <div><p>This will contain information about armors</p></div>
                    <div><p>This will contain information about bosses/skills</p></div>
                </div>
            </div>
            <div className='about-section '>
                <h1 className='gold-text'>FORUMS</h1>
                <Link to="/forums"><button className='submit-button'>Forums</button></Link>
                <div className='about-details'>
                    <div><p>This will contain information about builds</p></div>
                    <div><p>This will contain information about builds</p></div>
                    <div><p>This will contain information about builds</p></div>
                </div>
            </div>
        </>
    )
}