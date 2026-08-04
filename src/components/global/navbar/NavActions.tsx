"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { User } from "lucide-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { authService } from "@/services/auth.service";
import { auth } from "@/utils/firebaseConfig";
import { cn } from "@/utils/cn";

interface NavActionsProps {
  tone?: "default" | "glass";
}

export function NavActions({ tone = "default" }: NavActionsProps) {
  const router = useRouter();
  const { user, isAuthenticated, loginWithToken } = useAuth();
  const { badgeCount, openCartDrawer } = useCart();
  const isGlass = tone === "glass";

  async function googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const { uid, email, displayName, emailVerified } = firebaseUser;
      if (!email) {
        toast.error("Google account has no email");
        return;
      }
      try {
        const { token } = await authService.login({ email, password: uid });
        loginWithToken(token);
        toast.success("Logged in successfully");
      } catch {
        const { token } = await authService.signup({
          email,
          password: uid,
          passwordConfirm: uid,
          name: displayName ?? undefined,
          verified: emailVerified,
        });
        loginWithToken(token);
        toast.success("Account created successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
    }
  }

  return (
    <div className="flex items-center justify-center gap-3 px-2">
      <Button
        variant="ghost"
        size="icon"
        className={cn(isGlass && "text-white hover:bg-white/10 hover:text-white")}
        onClick={() => router.push("/profile/wishlist")}
        aria-label="Wishlist"
      >
        <FaRegHeart className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn("relative", isGlass && "text-white hover:bg-white/10 hover:text-white")}
        onClick={openCartDrawer}
        aria-label="Cart"
      >
        <FiShoppingCart className="h-5 w-5" />
        {badgeCount > 0 && (
          <Badge className="absolute -right-1 -top-1 h-5 min-w-5 px-1 text-[10px]">
            {badgeCount}
          </Badge>
        )}
      </Button>
      {isAuthenticated ? (
        <Link href="/profile" className="no-underline">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="text-sm font-bold text-primary-foreground">
              {user?.name?.[0]?.toUpperCase() ?? "U"}
            </span>
          </div>
        </Link>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className={cn(isGlass && "text-white hover:bg-white/10 hover:text-white")}
          onClick={googleLogin}
          aria-label="Login"
        >
          <User className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
