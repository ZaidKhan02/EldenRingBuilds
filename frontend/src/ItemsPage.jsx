import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ItemsPage.css';

export default function ItemsPage() {
    const { type } = useParams();
    const [items, setItems] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const limit = 20;

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://eldenring.fanapis.com/api/${type}?limit=${limit}&page=${page}`);
                const data = res.data;
                setItems(data.data || []);
                setTotalPages(Math.ceil((data.total || 0) / limit));
            }
            catch (err) {
                console.error(`Failed to fetch ${type}:`, err);
                setItems([]);
                setTotalPages(1);
            }
            setLoading(false);
        }
        fetchItems()
    }, [type, page])


    const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
    const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

    const navigate = useNavigate();
    const handleClick = (type, id) => {
        navigate(`/index/${type}/${id}`)
    }

    if (loading) {
        return <p className="loading-text">Loading item details...</p>;
    }

    return (
        <div className='item-container'>
            <h1 className='gold-text page-header'>{type.replace(/-/g, ' ').toUpperCase()}</h1>
            <div className='item-grid'>
                {items.map(item => (
                    <div
                        key={item.id}
                        className='item-card'
                        onClick={() => handleClick(type, item.id)}
                    >
                        <img
                            src={item.image || 'https://placehold.co/100x100?text=No+Image'}
                            alt={item.name}
                            className='item-image'
                        />
                        {item.name}
                    </div>
                ))}
            </div>
            <div className='pagination-controls'>
                <button onClick={handlePrev} disabled={page === 1}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={handleNext} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    );
}