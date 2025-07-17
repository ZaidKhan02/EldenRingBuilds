import { useNavigate } from 'react-router-dom';
import './IndexStyles.css';

const slotTypes = [
    'ammos', 'armors', 'ashes', 'bosses', 'classes',
    'creatures', 'incantations', 'items', 'locations', 'npcs',
    'shields', 'sorceries', 'spirits', 'talismans', 'weapons'
];

const slotImages = {
    ammos: 'https://eldenring.fanapis.com/images/ammos/17f69448ceel0i0a57bokoqz409yb.png',
    armors: 'https://eldenring.fanapis.com/images/armors/17f69515b49l0i0nbno079cqzlskebf.png',
    ashes: 'https://eldenring.fanapis.com/images/ashes/17f69494c37l0hznhbbgk88jc3uz5o.png',
    bosses: 'https://eldenring.fanapis.com/images/bosses/17f69dc74fdl0i1v1wz3qrzn19aps8.png',
    classes: 'https://eldenring.fanapis.com/images/classes/17f69d71826l0i32gkm3ndn3kywxqj.png',
    creatures: 'https://eldenring.fanapis.com/images/creatures/17f6a23208cl0i6ywofpwtfyw4q8jl.png',
    incantations: 'https://eldenring.fanapis.com/images/incantations/17f6988869dl0hyo4qsblr2lchs3q7.png',
    items: 'https://eldenring.fanapis.com/images/items/17f69e47912l0i1z0lip3kamll88h.png',
    locations: 'https://eldenring.fanapis.com/images/locations/17f6967f4a6l0i2mcivef17883vmx4.png',
    npcs: 'https://eldenring.fanapis.com/images/npcs/17f6974b8aal0i2oq6qbzsegb120iw.png',
    shields: 'https://eldenring.fanapis.com/images/shields/17f695ae9edl0i12glt4xotvobrl0m.png',
    sorceries: 'https://eldenring.fanapis.com/images/sorceries/17f6985da4cl0hykzwl2ly1lk18kxg.png',
    spirits: 'https://eldenring.fanapis.com/images/spirits/17f69ac4bd0l0i2rc618tsrggfp3kh.png',
    talismans: 'https://eldenring.fanapis.com/images/talismans/17f69c74ab1l0i2sp8u8ehul0cxenh.png',
    weapons: 'https://eldenring.fanapis.com/images/weapons/17f6961c7efl0i1p5tbamvedpnmzx4.png',
};

export default function Index() {
    const navigate = useNavigate();

    const handleClick = (type) => {
        navigate(`/index/${type}`);
    };


    return (
        <div className="index-container">
            <h1 className='gold-text page-header'>Index</h1>
            <div className='index-grid'>
                {slotTypes.map(type => (
                    <div
                        key={type}
                        className="slot"
                        onClick={() => handleClick(type)}
                    >
                        <img src={slotImages[type]} alt={type} className="slot-image" />
                        <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
