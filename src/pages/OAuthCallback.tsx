import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await handleRedirectCallback();
        // Redirect to dashboard after successful authentication
        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error("OAuth callback error:", error);
        // Redirect back to sign-in on error
        navigate("/sign-in", { replace: true });
      }
    };

    handleCallback();
  }, [handleRedirectCallback, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
