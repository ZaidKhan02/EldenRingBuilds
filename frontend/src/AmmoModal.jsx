import { useEffect, useState } from 'react';
import './Modal.css';

export default function AmmoModal({ onSelect, onClose }) {
    const [ammos, setAmmos] = useState([]);

    useEffect(() => {
        fetch('https://eldenring.fanapis.com/api/ammos?limit=50')
            .then(res => res.json())
            .then(data => setAmmos(data.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Select Ammo</h2>
                <div className="modal-grid">
                    {ammos.map(ammo => (
                        <div
                            key={ammo.id}
                            className="modal-item"
                            onClick={() => onSelect(ammo)}
                        >
                            <img src={ammo.image} alt={ammo.name} />
                            <p>{ammo.name}</p>
                        </div>
                    ))}
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
