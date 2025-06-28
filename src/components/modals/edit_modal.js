import { useState, useEffect } from "react";
import { getCurrentDate } from "../../data/cardsData";
import './edit_modal.css';

function EditModal({ isactive, onSave, onClose, task }) {
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');

    // Update input fields when a new task is selected
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return; // Don't submit if title is empty
        
        onSave({ ...task, title: title.trim(), description: description.trim() });
    };

    const handleClose = () => {
        onClose();
    };

    if (!isactive || !task) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Edit Task</h2>
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

                    <div className="form-group">
                        <label>Date:</label>
                        <p className="date-display">{task.date}</p>
                    </div>
                    
                    <div className="form-actions">
                        <button type="button" onClick={handleClose} className="cancel-button">
                            Cancel
                        </button>
                        <button type="submit" className="save-button">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditModal;
