import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Eye } from "lucide-react";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [taskCount, setTaskCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (!savedUsername) {
      navigate("/");
    } else {
      setUsername(savedUsername);
    }
    
    // Load task count
    const updateTaskCount = () => {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        setTaskCount(JSON.parse(savedTasks).length);
      }
    };
    
    updateTaskCount();
    
    // Update task count when window regains focus
    const handleFocus = () => updateTaskCount();
    window.addEventListener("focus", handleFocus);
    
    return () => window.removeEventListener("focus", handleFocus);
  }, [navigate]);

  const handleAddTask = () => {
    navigate("/add-task");
  };

  const handleViewTasks = () => {
    navigate("/view-tasks");
  };

  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-gray-600 mb-4">welcome</h1>
          <h2 className="text-4xl font-bold bg-gradient-text bg-clip-text text-transparent mb-4 relative">
            {username}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-button rounded-full"></div>
          </h2>
          <p className="text-gray-600 text-lg">Ready to manage your tasks efficiently</p>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <div className="w-1 h-8 bg-gradient-button rounded-full mr-4"></div>
            Task Management
          </h3>

          <div className="flex gap-6 justify-center">
            <Button
              onClick={handleAddTask}
              variant="gradient"
              className="h-14 px-8 text-lg font-medium rounded-full"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add New Task
            </Button>

            <Button
              onClick={handleViewTasks}
              variant="gradient"
              className="h-14 px-8 text-lg font-medium rounded-full"
            >
              <Eye className="mr-2 h-5 w-5" />
              View Tasks
            </Button>
          </div>
        </div>

        <div className="border-t pt-8">
          <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
            TOTAL TASKS
          </h4>
           <div className="mt-2 h-16 bg-gray-50 rounded-lg flex items-center justify-center">
             <span className="text-2xl font-bold text-gray-600">{taskCount}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;