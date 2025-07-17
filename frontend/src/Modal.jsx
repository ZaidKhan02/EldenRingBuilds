import { useEffect, useState } from 'react';
import axios from 'axios';
import './Modal.css';

export default function Modal({ type, onSelect, onClose }) {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const limit = 20;

    useEffect(() => {
        const fetchItems = async () => {
            try {
                let url;

                if (type === 'classes') {
                    url = 'https://eldenring.fanapis.com/api/classes';
                } else {
                    url = `https://eldenring.fanapis.com/api/${type}?limit=${limit}&page=${page}`;
                }

                const res = await axios.get(url);

                const data = res.data;
                console.log('Fetched data:', data);

                setItems(data.data || []);

                if (type === 'classes') {
                    setTotalPages(1);
                } else {
                    setTotalPages(Math.ceil((data.total || 0) / limit));
                }

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
                <h2>Select {formattedType}</h2>
                <button className="close-btn" onClick={onClose}>X</button>

                <input
                    type="text"
                    placeholder={`Search ${formattedType}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />

                <div className="modal-grid">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="modal-card"
                                onClick={() => onSelect(item)}
                            >
                                <img
                                    src={item.image || 'https://placehold.co/64x64?text=No+Image'}
                                    alt={item.name}
                                    className="modal-image"
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

                {type !== 'classes' && (
                    <div className="pagination-controls">
                        <button onClick={handlePrev} disabled={page === 1}>
                            Previous
                        </button>
                        <span className='pagination-detail'>
                            Page {page} of {totalPages}
                        </span>
                        <button onClick={handleNext} disabled={page === totalPages}>
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
