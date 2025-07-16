import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Calendar, FileText } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

const ViewTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleToggleTask = (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-12">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <div className="w-1 h-8 bg-gradient-button rounded-full mr-4"></div>
            View Tasks
          </h1>
          
          <Button
            onClick={handleBack}
            variant="outline"
            className="h-10 px-6 rounded-full border-2 border-gray-200 hover:border-gray-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex gap-4 text-sm text-gray-600">
            <span>Total Tasks: {tasks.length}</span>
            <span>Completed: {completedCount}</span>
            <span>Pending: {tasks.length - completedCount}</span>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No tasks yet</h3>
            <p className="text-gray-500">Start by adding your first task!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-6 border-2 rounded-lg transition-all duration-200 ${
                  task.completed
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center h-6">
                    <Checkbox
                      id={task.id}
                      checked={task.completed}
                      onCheckedChange={() => handleToggleTask(task.id)}
                      className="w-5 h-5"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-lg font-medium mb-2 ${
                        task.completed
                          ? "text-green-700 line-through"
                          : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </h3>
                    
                    {task.description && (
                      <p
                        className={`text-sm mb-3 ${
                          task.completed
                            ? "text-green-600 line-through"
                            : "text-gray-600"
                        }`}
                      >
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(task.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTasks;