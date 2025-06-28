import './card.css';
import { useState, useEffect } from 'react';

function Card({title , date}) {
    // const [isDragging, setIsDragging] = useState(false);
    // const [position, setPosition] = useState({ x: 0, y: 0 });
    // const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

    // const startDragging = (e) => {
    //     setIsDragging(true);
    //     setInitialPosition({
    //         x: e.clientX - position.x,
    //         y: e.clientY - position.y,
    //     });
    // };

    // const drag = (e) => {
    //     if (!isDragging) return;
    //     e.preventDefault(); // Prevent text selection
    //     const currentx = e.clientX - initialPosition.x;
    //     const currenty = e.clientY - initialPosition.y;
    //     setPosition({ x: currentx, y: currenty });
    // };

    // const endDragging = () => {
    //     setIsDragging(false);
    // };

    // useEffect(() => {
    //     if (isDragging) {
    //         document.addEventListener('mousemove', drag);
    //         document.addEventListener('mouseup', endDragging);
    //     } else {
    //         document.removeEventListener('mousemove', drag);
    //         document.removeEventListener('mouseup', endDragging);
    //     }
    //     return () => {
    //         document.removeEventListener('mousemove', drag);
    //         document.removeEventListener('mouseup', endDragging);
    //     };
    // }, [isDragging]);

    return (
        <div
            className="card"
            id="draggableCard"
            // style={{
            //     transform: `translate(${position.x}px, ${position.y}px)`,
            //     position: 'absolute',
            //     cursor: isDragging ? 'grabbing' : 'grab',
            // }}
            
        >
            <h3 className="title">{title}</h3>
            <p className="date">{date}</p>
        </div>
    );
}

export default Card;
