import { useEffect, useState } from 'react';
import './Modal.css';

export default function ItemModal({ type, onSelect, onClose }) {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const limit = 50;

    useEffect(() => {
        setPage(1);
        setSearchQuery('');
    }, [type]);

    useEffect(() => {
        const fetchItems = async () => {
            console.log('Fetching type:', type);
            try {
                const res = await fetch(
                    `https://eldenring.fanapis.com/api/${type}?limit=${limit}&page=${page}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'User-Agent': 'Mozilla/5.0 (compatible; EldenBuilder/1.0)',
                        }
                    }
                );
                const data = await res.json();
                console.log('Fetched data:', data);
                setItems(data.data || []);
                setTotalPages(Math.ceil((data.total || 0) / limit));
            } catch (err) {
                console.error(`Error fetching ${type}:`, err);
                setItems([]);
                setTotalPages(1);
            }
        };

        fetchItems();
    }, [type, page]);

    const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
    const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

    const formattedType = type.charAt(0).toUpperCase() + type.slice(1);

    const filteredItems = items.filter(item =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Select a {formattedType}</h2>
                <button className="close-btn" onClick={onClose}>X</button>

                <input
                    type="text"
                    placeholder={`Search ${formattedType}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />

                <div className="weapon-grid">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="weapon-card"
                                onClick={() => onSelect(item)}
                            >
                                <img
                                    src={item.image || 'https://placehold.co/64x64?text=No+Image'}
                                    alt={item.name}
                                    className="weapon-image"
                                />
                                <p>{item.name}</p>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', color: '#ccc' }}>
                            No results found.
                        </p>
                    )}
                </div>

                <div className="pagination-controls">
                    <button onClick={handlePrev} disabled={page === 1}>
                        Previous
                    </button>
                    <span style={{ margin: '0 1rem' }}>
                        Page {page} of {totalPages}
                    </span>
                    <button onClick={handleNext} disabled={page === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
