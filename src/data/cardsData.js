const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

let id = 7 ;
export const initialCards = {
    todo: [
        { id: 1, title: 'Task 1', description: 'Description 1', status: 'todo' },
        { id: 4, title: 'Learn React Hooks', description: 'Study useState and useEffect', status: 'todo' },
        { id: 5, title: 'Build Components', description: 'Create reusable components', status: 'todo' }
    ],
    inprogress: [
        { id: 2, title: 'Task 2', description: 'Description 2', status: 'inprogress' },
        { id: 6, title: 'Style CSS', description: 'Add beautiful styling', status: 'inprogress' }
    ],
    done: [
        { id: 3, title: 'Task 3', description: 'Description 3', status: 'done' },
        { id: 7, title: 'Setup Project', description: 'Initialize React app', status: 'done' }
    ]
};

export { getCurrentDate , id}; 