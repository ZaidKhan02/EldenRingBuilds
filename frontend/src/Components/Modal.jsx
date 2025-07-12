import { useEffect, useState } from 'react';


export default function Modal({ type, onSelect, onClose }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch(`https://eldenring.fanapis.com/api/${type}?limit=100`);
                const data = await res.json();
                setItems(data.data || []);
            } catch (err) {
                console.error('Failed to fetch', err);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, [type]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Select a {type}</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="modal-grid">
                        {items.map((item) => (
                            <div key={item.id} className="modal-item" onClick={() => onSelect(item)}>
                                {item.image ? <img src={item.image} alt={item.name} /> : <div className="placeholder" />}
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                )}
                <button className="modal-close" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
