import '../styles/Task.css';

const Task = ({ task, updateTaskStatus, deleteTask }) => {
  return (
    <div className={`task ${task.status}`}>
      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <div className="task-meta">
          <span className="task-date">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
          <span className="task-status">{task.status}</span>
        </div>
      </div>
      <div className="task-actions">
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={(e) => 
            updateTaskStatus(task._id, e.target.checked ? 'completed' : 'pending')
          }
        />
        <button onClick={() => deleteTask(task._id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;