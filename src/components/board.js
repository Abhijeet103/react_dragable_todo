import { useState } from 'react';
import './board.css';
import Card from './card';
import { initialCards, getCurrentDate } from '../data/cardsData';
import AddModal from './modals/add_modal';
import EditModal from './modals/edit_modal';

function Board() {
    const [cards, setCards] = useState(initialCards);
    const [toggle, setToggle] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const startDragging = (e, card) => {
        e.dataTransfer.setData('task', JSON.stringify(card));
    };

    const dragOver = (e) => e.preventDefault();

    const drop = (e, targetColumn) => {
        e.preventDefault();
        const taskData = e.dataTransfer.getData('task');
        if (!taskData) return;

        const task = JSON.parse(taskData);
        const sourceColumn = task.status;

        if (sourceColumn === targetColumn) return;

        setCards(prev => {
            const updated = { ...prev };

            updated[sourceColumn] = updated[sourceColumn].filter(c => c.id !== task.id);
            const updatedTask = { ...task, status: targetColumn };
            updated[targetColumn] = [...updated[targetColumn], updatedTask];

            return updated;
        });
    };

    const handleAddTask = (newTask) => {
        setCards(prev => ({
            ...prev,
            todo: [...prev.todo, newTask]
        }));
        setToggle(false);
    };

    const handleCardClick = (task) => {
        setSelectedTask(task);
        setEditModal(true);
    };

    const handleUpdate = (task) => {
        setCards(prev => {
            const updatedCards = { ...prev };

            // If status has changed, move task to new column
            for (const column in updatedCards) {
                const cardIndex = updatedCards[column].findIndex(card => card.id === task.id);

                if (cardIndex !== -1) {
                    // If status is same, update in-place
                    if (task.status === column) {
                        const updatedCard = {
                            ...updatedCards[column][cardIndex],
                            title: task.title,
                            description: task.description,
                            date: task.date
                        };

                        updatedCards[column] = [
                            ...updatedCards[column].slice(0, cardIndex),
                            updatedCard,
                            ...updatedCards[column].slice(cardIndex + 1)
                        ];
                    } else {
                        // Move to new column
                        const cardToMove = updatedCards[column][cardIndex];
                        updatedCards[column] = updatedCards[column].filter(c => c.id !== task.id);
                        updatedCards[task.status] = [...updatedCards[task.status], {
                            ...cardToMove,
                            ...task
                        }];
                    }
                    break;
                }
            }

            return updatedCards;
        });

        setEditModal(false);
    };

    return (
        <div className="board">
            <div className="header">
                <h1>Todo List</h1>
                <p>What's on your mind today?</p>
            </div>

            <AddModal 
                isOpen={toggle} 
                onClose={() => setToggle(false)}
                onAddTask={handleAddTask}
            />

            <EditModal
                isactive={editModal}
                onSave={handleUpdate}
                onClose={() => setEditModal(false)}
                task={selectedTask}
            />

            <div className="todoList">
                <div className="buttonContainer">
                    <button onClick={() => setToggle(true)}>+</button>
                </div>

                <div className="columns">
                    {['todo', 'inprogress', 'done'].map((columnKey) => (
                        <div 
                            key={columnKey}
                            className="column"
                            id={columnKey}
                            onDragOver={dragOver}
                            onDrop={(e) => drop(e, columnKey)}
                        >
                            <div className="columnHeader">
                                <h3>{columnKey === 'todo' ? 'To Do' : columnKey === 'inprogress' ? 'In Progress' : 'Done'}</h3>
                            </div>
                            <hr />
                            <div className="todoCard">
                                {cards[columnKey].map(card => (
                                    <div
                                        key={card.id}
                                        draggable
                                        onDragStart={(e) => startDragging(e, card)}
                                        onClick={() => handleCardClick(card)}
                                        style={{ marginBottom: '5px', cursor: 'pointer' }}
                                    >
                                        <Card title={card.title} date={card.date || getCurrentDate()} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Board;
