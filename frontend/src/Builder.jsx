import { useState } from 'react';
import ItemModal from './ItemModal';
import './Builder.css';

export default function Builder() {
    const stats = ["arc", "dex", "end", "fai", "int", "min", "str", "vig"];
    const [equipmentSlots, setEquipmentSlots] = useState({
        mainHand: Array(3).fill(null), //i could do [null, null, null] instead, same thing
        offHand: Array(3).fill(null),
        gear: Array(4).fill(null),
        talismans: Array(4).fill(null),
        items: Array(4).fill(null),
        spells: Array(10).fill(null)
    });

    const [showModal, setShowModal] = useState(false);
    const [activeSlot, setActiveSlot] = useState({ type: '', index: null }); //for example type is mainHand index is 1 (meaning 2nd box)
    const [activeType, setActiveType] = useState('weapons');

    const handleOpenModal = (type, index) => {
        const itemType =
            type === 'gear' ? 'armors' :
                type === 'talismans' ? 'talismans' :
                    type === 'items' ? 'items' :
                        type === 'spells' ? 'incantations' :
                            ((type === 'mainHand' || type === 'offHand') && index === 2) ? 'ammos' :
                                'weapons';
        setActiveSlot({ type, index }); //this is needed because if i click 2nd or 3rd box, it updates only the 1st one. so this is needed to know what type it is and most importantly it sindex so it updates that one
        setActiveType(itemType); //this is needed because if we didnt have it, then if we selected the gear slots, it will show weapons, since we have that as default above and here we set it as itemtype which works 
        setShowModal(true);
    };

    const handleItemSelect = (item) => {
        setEquipmentSlots((prev) => {
            const updated = [...prev[activeSlot.type]]; //reason we use active slot and not in clear is because in item select, we have to select a slot inorder to select an item. for clearing, we just clikc the button, hence no active slot needed
            updated[activeSlot.index] = item;
            return { ...prev, [activeSlot.type]: updated };
        });
        setShowModal(false);
    };

    const handleClearSlot = (type, index) => { //we call type and index since we want to clear a specific slot
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
                        item ? handleClearSlot(type, index) : handleOpenModal(type, index) //when clicked, if item exists, then it removes it, else it open the modal 
                    }
                >
                    {item ? (
                        <img src={item.image} alt={item.name} className="item-image" />
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
                        {stats.map((stat) => (
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


