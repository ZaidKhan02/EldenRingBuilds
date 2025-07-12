// EquipmentSlot.jsx
import { useState } from 'react';
import Modal from './Modal';


export default function EquipmentSlot({ type, onSelect }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleSelect = (item) => {
        setSelectedItem(item);
        setShowModal(false);
        if (onSelect) onSelect(item);
    };

    const handleClear = () => {
        setSelectedItem(null);
        if (onSelect) onSelect(null);
    };

    return (
        <button
            className="builder-button"
            onClick={() => (selectedItem ? handleClear() : setShowModal(true))}
        >
            {selectedItem ? (
                <img src={selectedItem.image} alt={selectedItem.name} className="item-image" />
            ) : null}

            {showModal && (
                <Modal type={type} onClose={() => setShowModal(false)} onSelect={handleSelect} />
            )}
        </button>
    );
}
