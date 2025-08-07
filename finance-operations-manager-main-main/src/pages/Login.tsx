import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // toggle
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // TODO: call login API
        await new Promise((r) => setTimeout(r, 1000));
        navigate("/dashboard");
      } else {
        // TODO: call register API
        await new Promise((r) => setTimeout(r, 1000));
        toast({
          title: "Compte créé",
          description: "Inscription réussie, connectez-vous maintenant.",
        });
        setIsLogin(true);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: isLogin
          ? "Identifiants invalides, veuillez réessayer."
          : "Erreur lors de l'inscription, veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <Card className="w-full max-w-md p-8 space-y-6 animate-fadeIn glass">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">
            {isLogin ? "Bienvenue de retour" : "Créer un compte"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin
              ? "Entrez vos identifiants pour continuer"
              : "Créez votre compte pour commencer"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? isLogin
                ? "Connexion..."
                : "Inscription..."
              : isLogin
              ? "Se connecter"
              : "S'inscrire"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          {isLogin ? (
            <>
              Pas encore de compte ?{" "}
              <button
                className="text-primary underline hover:text-primary/80"
                onClick={() => setIsLogin(false)}
              >
                S'inscrire
              </button>
            </>
          ) : (
            <>
              Déjà un compte ?{" "}
              <button
                className="text-primary underline hover:text-primary/80"
                onClick={() => setIsLogin(true)}
              >
                Se connecter
              </button>
            </>
          )}
        </p>
      </Card>
    </div>
  );
}
