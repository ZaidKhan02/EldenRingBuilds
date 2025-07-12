import { useState } from 'react';
import ItemModal from './ItemModal';
import './Builder.css';

export default function Builder() {
    const [equipmentSlots, setEquipmentSlots] = useState({
        mainHand: [null, null, null],
        offHand: [null, null, null],
        gear: [null, null, null, null],
        talismans: [null, null, null, null],
        items: [null, null, null, null],
        spells: Array(10).fill(null)
    });

    const [showModal, setShowModal] = useState(false);
    const [activeSlot, setActiveSlot] = useState({ type: '', index: null });
    const [activeType, setActiveType] = useState('weapons');

    const handleOpenModal = (type, index) => {
        setActiveSlot({ type, index });
        const itemType =
            type === 'gear' ? 'armors' :
                type === 'talismans' ? 'talismans' :
                    type === 'items' ? 'items' :
                        type === 'spells' ? 'incantations' :
                            ((type === 'mainHand' || type === 'offHand') && index === 2) ? 'ammos' :
                                'weapons';
        setActiveType(itemType);
        setShowModal(true);
    };

    const handleItemSelect = (item) => {
        setEquipmentSlots((prev) => {
            const updated = [...prev[activeSlot.type]];
            updated[activeSlot.index] = item;
            return { ...prev, [activeSlot.type]: updated };
        });
        setShowModal(false);
    };

    const handleClearSlot = (type, index) => {
        setEquipmentSlots((prev) => {
            const updated = [...prev[type]];
            updated[index] = null;
            return { ...prev, [type]: updated };
        });
    };

    const renderSlotButtons = (type) => (
        <div className="builder-buttons">
            {equipmentSlots[type].map((item, index) => (
                <button
                    key={index}
                    className="builder-button"
                    onClick={() =>
                        item ? handleClearSlot(type, index) : handleOpenModal(type, index)
                    }
                >
                    {item ? (
                        <img src={item.image} alt={item.name} className="weapon-image" />
                    ) : (
                        <div className="empty-slot"></div>
                    )}
                </button>
            ))}
        </div>
    );

    return (
        <div className="builder-container">
            <h1 className="gold-text page-header">BUILDER</h1>

            <div className="builder-content">
                <div className="builder-left">
                    <h2>Build Name</h2>
                    <input type="text" placeholder="Enter a build name" required />

                    <h2>Class</h2>
                    <button className="builder-button"><div className="empty-slot"></div></button>

                    <h2>Equipment</h2>

                    <h3 className="gold-text">Main Hand</h3>
                    {renderSlotButtons('mainHand')}

                    <h3 className="gold-text">Off Hand</h3>
                    {renderSlotButtons('offHand')}

                    <h3 className="gold-text">Gear</h3>
                    {renderSlotButtons('gear')}

                    <h3 className="gold-text">Talismans</h3>
                    {renderSlotButtons('talismans')}
                </div>

                <div className="builder-right">
                    <h2>Stats</h2>
                    <h3 className="gold-text">Level 1</h3>
                    <div className="stats-buttons">
                        {["arc", "dex", "end", "fai", "int", "min", "str", "vig"].map((stat) => (
                            <div className="stat" key={stat}>
                                <label className="gold-text" htmlFor={stat}>{stat.toUpperCase()}</label>
                                <input type="text" id={stat} name={stat} />
                            </div>
                        ))}
                    </div>

                    <h2>Items</h2>
                    {renderSlotButtons('items')}

                    <h2>Spells</h2>
                    {renderSlotButtons('spells')}

                    <h2>Description</h2>
                    <textarea className="builder-description" rows={10} cols={60}></textarea>

                    <button className="submit-button">Save</button>
                </div>
            </div>

            {showModal && (
                <ItemModal
                    type={activeType}
                    onSelect={handleItemSelect}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}

