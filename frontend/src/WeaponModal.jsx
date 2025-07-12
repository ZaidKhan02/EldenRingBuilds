import { useEffect, useState } from 'react';
import './Modal.css';

export default function WeaponModal({ onSelect, onClose }) {
    const [weapons, setWeapons] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`https://eldenring.fanapis.com/api/weapons?limit=100&page=${page}`)
            .then(res => res.json())
            .then(data => setWeapons(data.data))
            .catch(err => console.error(err));
    }, [page]);

    const handleNext = () => {
        setPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage(prev => prev - 1);
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Select a Weapon</h2>
                <button className="close-btn" onClick={onClose}>X</button>

                <div className="weapon-grid">
                    {weapons.map(weapon => (
                        <div
                            key={weapon.id}
                            className="weapon-card"
                            onClick={() => onSelect(weapon)}
                        >
                            <img src={weapon.image} alt={weapon.name} />
                            <p>{weapon.name}</p>
                        </div>
                    ))}
                </div>

                <div className="pagination-controls">
                    <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className={page === 1 ? "disabled" : ""}
                    >
                        Previous
                    </button>

                    <span style={{ margin: '0 1rem' }}>Page {page}</span>

                    <button
                        onClick={handleNext}
                        disabled={weapons.length < 100}
                        className={weapons.length < 100 ? "disabled" : ""}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

/*
import { useEffect, useState } from 'react';
import './Modal.css';

export default function WeaponModal({ onSelect, onClose }) {
    const [weapons, setWeapons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllWeapons = async () => {
            let allWeapons = [];
            let page = 1;
            let hasMore = true;

            while (hasMore) {
                const res = await fetch(`https://eldenring.fanapis.com/api/weapons?limit=100&page=${page}`);
                const data = await res.json();

                if (data.data && data.data.length > 0) {
                    allWeapons = [...allWeapons, ...data.data];
                    page++;
                } else {
                    hasMore = false;
                }
            }

            setWeapons(allWeapons);
            setLoading(false);
        };

        fetchAllWeapons();
    }, []);

    if (loading) return <div className="modal-backdrop"><div className="modal-content"><p>Loading weapons...</p></div></div>;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Select a Weapon</h2>
                <button className="close-btn" onClick={onClose}>X</button>

                <div className="weapon-grid">
                    {weapons.map(weapon => (
                        <div
                            key={weapon.id}
                            className="weapon-card"
                            onClick={() => onSelect(weapon)}
                        >
                            <img src={weapon.image} alt={weapon.name} />
                            <p>{weapon.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
*/