import { useNavigate } from "react-router-dom";
import { Leaf, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-soft text-center px-4">
      <div className="flex flex-col items-center gap-4 animate-slide-up">
        <Leaf className="h-16 w-16 text-green-500" />
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-gray-600 text-lg">Oops! The page you’re looking for doesn’t exist.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:shadow-glow transition-all"
        >
          <ArrowLeft className="inline h-4 w-4 mr-1" /> Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
