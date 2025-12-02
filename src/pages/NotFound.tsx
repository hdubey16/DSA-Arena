import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import StudentNavBar from "@/components/StudentNavBar";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <StudentNavBar />
      
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="mb-4 text-8xl font-bold neon-text">404</h1>
          <p className="mb-8 text-2xl text-muted-foreground">Oops! Page not found</p>
          <Button 
            onClick={() => navigate("/")}
            className="bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(0,255,0,0.3)]"
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
