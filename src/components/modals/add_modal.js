import { useState } from 'react';
import './add_modal.css';
import { getCurrentDate } from '../../data/cardsData';

function AddModal({ isOpen, onClose, onAddTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [id  , setId] = useState(8);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return; // Don't submit if title is empty
        
        const newTask = {
            id: id,
            title: title.trim(),
            description: description.trim(),
            date: getCurrentDate(),
            status: 'todo'
        };
        
        onAddTask(newTask);
        setTitle('');
        setDescription('');
        setId(id + 1);
    };

    const handleClose = () => {
        setTitle('');
        setDescription('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add New Task</h2>
                    <button className="close-button" onClick={handleClose}>×</button>
                </div>
                
                <form onSubmit={handleSubmit} className="task-form">
                    <div className="form-group">
                        <label htmlFor="title">Task Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter task title..."
                            className="form-input"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter task description..."
                            className="form-textarea"
                            rows="3"
                        />
                    </div>
                    
                    <div className="form-actions">
                        <button type="button" onClick={handleClose} className="cancel-button">
                            Cancel
                        </button>
                        <button type="submit" className="add-button">
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddModal;