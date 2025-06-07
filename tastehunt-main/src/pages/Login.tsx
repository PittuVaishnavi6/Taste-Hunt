
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, LogIn, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "signup") {
      // Create new user account
      const userData = {
        id: Date.now().toString(),
        name: name,
        username: name.toLowerCase().replace(/\s+/g, '_'),
        email: email,
        phone: phone,
        address: '',
        bio: 'New TasteHunt member! 🌱',
        joined: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        sustainabilityScore: 75,
        totalOrders: 0,
        wasteReduced: '0 kg',
        emissionsSaved: '0 kg CO₂',
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        rating: 5.0,
        reviewsCount: 0
      };
      
      // Save user data and credentials
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('userCredentials', JSON.stringify({ email: email.toLowerCase().trim(), password }));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Trigger custom event to update navbar
      window.dispatchEvent(new Event('loginStatusChanged'));
      
      toast({
        title: "Account Created Successfully!",
        description: "Welcome to TasteHunt! Your profile has been created.",
      });
      
      navigate("/profile");
      
    } else {
      // Login existing user
      const savedCredentials = localStorage.getItem('userCredentials');
      
      if (savedCredentials) {
        try {
          const credentials = JSON.parse(savedCredentials);
          const inputEmail = email.toLowerCase().trim();
          const savedEmail = credentials.email.toLowerCase().trim();
          
          console.log('Login attempt:', { inputEmail, savedEmail, passwordMatch: credentials.password === password });
          
          if (savedEmail === inputEmail && credentials.password === password) {
            localStorage.setItem('isLoggedIn', 'true');
            
            // Trigger custom event to update navbar
            window.dispatchEvent(new Event('loginStatusChanged'));
            
            toast({
              title: "Welcome Back!",
              description: "You have successfully logged in.",
            });
            
            navigate("/profile");
          } else {
            toast({
              title: "Login Failed",
              description: "Invalid email or password. Please try again.",
              variant: "destructive"
            });
          }
        } catch (error) {
          console.error('Error parsing credentials:', error);
          toast({
            title: "Login Error",
            description: "There was an error with your login. Please try again.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Account Not Found",
          description: "No account found with this email. Please sign up first.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-light via-orange-light to-orange-dark">
      <div className="bg-white/95 rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in">
        {/* Back button */}
        <button
          type="button"
          className="absolute left-4 top-4 flex items-center text-muted-foreground hover:text-primary transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <div className="flex flex-col gap-2 items-center py-2">
          <span className="text-3xl font-extrabold text-orange-dark flex items-center gap-2 mb-2">
            <User className="h-7 w-7 text-green-dark" /> TasteHunt
          </span>
          <h2 className="text-2xl font-semibold text-green-dark mb-1">
            {mode === "login" ? "Log In" : "Sign Up"}
          </h2>
          <p className="text-muted-foreground mb-4 text-sm">
            {mode === "login"
              ? "Welcome back! Sign in to your account."
              : "Create a new account to join TasteHunt."}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {mode === "signup" && (
            <>
              <div>
                <Label htmlFor="name" className="text-green-dark">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="mt-1"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-green-dark">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  placeholder="(555) 123-4567"
                  className="mt-1"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            </>
          )}
          <div>
            <Label htmlFor="email" className="text-green-dark">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="mt-1"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-green-dark">Password</Label>
            <Input
              id="password"
              type="password"
              required
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              placeholder="********"
              className="mt-1"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="bg-green-dark text-white hover:bg-green mt-2"
            type="submit"
            size="lg"
          >
            {mode === "login" ? (
              <>
                <LogIn className="h-5 w-5 mr-1" />
                Log In
              </>
            ) : (
              <>
                <User className="h-5 w-5 mr-1" />
                Sign Up
              </>
            )}
          </Button>
        </form>
        <div className="flex justify-center mt-6">
          <span className="text-sm text-muted-foreground">
            {mode === "login" ? (
              <>
                New to TasteHunt?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="underline text-orange-dark hover:text-green-dark font-medium transition-colors"
                  type="button"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="underline text-orange-dark hover:text-green-dark font-medium transition-colors"
                  type="button"
                >
                  Log in
                </button>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
