import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import womanLaptopIllustration from "@/assets/woman-laptop-illustration.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("username", username);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[600px]">
          {/* Left side - Login Form */}
          <div className="p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-pink-400 mb-4">Logo Here</h1>
              <p className="text-gray-600 mb-2">Welcome back !!!</p>
              <h2 className="text-5xl font-bold text-gray-800 mb-8">Log In</h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
                  USER NAME
                </label>
                <Input
                  type="text"
                  placeholder="ENTER YOUR USER NAME"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:ring-0 text-gray-400 placeholder:text-gray-400 placeholder:uppercase"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="gradient"
                className="w-full h-12 text-lg font-medium rounded-full mt-8"
              >
                LOGIN
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>

          {/* Right side - Illustration */}
          <div className="bg-gradient-to-br from-blue-200 to-purple-200 p-12 flex items-center justify-center">
            <div className="relative">
              <img
                src={womanLaptopIllustration}
                alt="Woman working on laptop"
                className="w-full h-auto max-w-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;