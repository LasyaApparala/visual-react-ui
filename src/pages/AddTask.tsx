import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus } from "lucide-react";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      
      const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const updatedTasks = [...existingTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      
      console.log("Task added:", newTask);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-12">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <div className="w-1 h-8 bg-gradient-button rounded-full mr-4"></div>
            Add New Task
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

        <form onSubmit={handleAddTask} className="space-y-8">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Task Title
            </label>
            <Input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-14 px-4 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-0 text-gray-700 placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Description
            </label>
            <Textarea
              placeholder="Enter task description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-0 text-gray-700 placeholder:text-gray-400 resize-none"
              rows={5}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              variant="gradient"
              className="h-12 px-8 text-lg font-medium rounded-full"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;