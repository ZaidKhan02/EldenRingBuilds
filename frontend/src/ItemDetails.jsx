import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ItemDetails.css';

export default function ItemDetails() {
    const { type, id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://eldenring.fanapis.com/api/${type}/${id}`);
                const data = res.data;
                setItem(data.data);
            } catch (err) {
                console.error(`Failed to fetch ${type} with id ${id}:`, err);
                setItem(null);
            }
            setLoading(false);
        };
        fetchItem();
    }, [type, id]);

    if (loading) {
        return <p className="loading-text">Loading item details...</p>;
    }

    if (!item) {
        return <p className="error-text">Item not found.</p>;
    }

    return (
        <div className="item-details-container">
            <div className='item-details-card'>
                <div className='item-details-header'>
                    <h1 className="gold-text">{item.name || 'Unknown Item'}</h1>
                    <img
                        src={item.image || 'https://placehold.co/150x150?text=No+Image'}
                        alt={item.name}
                        className="item-details-image"
                    />
                </div>

                {/* Optionally render item-specific properties */}
                <div className='item-details-properties'>
                    {Object.entries(item).map(([key, value]) => {
                        if (key === 'id' || key === 'image' || key === 'name') {
                            return null;  // Skip rendering for id and image
                        }

                        if (typeof value === 'string' || typeof value === 'number') {
                            return (
                                <div className='item-properties'>
                                    <h2>{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
                                    <p>{value}</p>
                                </div>
                            );
                        }

                        if (Array.isArray(value)) {
                            return (
                                <div key={key} className='item-properties'>
                                    <h2>{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
                                    {value.length > 0 && typeof value[0] === 'object' ? (
                                        <ul>
                                            {value.map((subItem, index) => (
                                                <li key={index}>
                                                    {Object.entries(subItem).map(([subKey, subValue]) => (
                                                        <span key={subKey}>
                                                            {subKey}: {subValue}{' '}
                                                        </span>
                                                    ))}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>{value.join(', ')}</p>
                                    )}
                                </div>
                            );
                        }

                        return null;
                    })}
                </div>
            </div>
        </div>
    );
}

