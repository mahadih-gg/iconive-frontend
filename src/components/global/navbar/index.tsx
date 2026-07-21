"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  ShoppingCart,
  Twitter,
  User,
  Youtube,
} from "lucide-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { authService } from "@/services/auth.service";
import { auth } from "@/utils/firebaseConfig";

import { CurrencyToggle } from "./CurrencyToggle";
import { NavDesktop } from "./NavDesktop";
import { NavMobile } from "./NavMobile";
import { ShopDropdown } from "./ShopDropdown";

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/profile.php?id=100087712010768", Icon: Facebook },
  { href: "https://wa.me/message/PIZLMGBXCLUUN1", Icon: MessageCircle },
  { href: "https://www.instagram.com/iconivewigs/", Icon: Instagram },
  { href: "https://twitter.com/Iconivewigs", Icon: Twitter },
  { href: "https://youtube.com/@IconiveWigs?si=m5ojSW2u4XrFVUCE", Icon: Youtube },
  {
    href: "https://www.linkedin.com/company/99836837/admin/feed/posts/?feedType=following",
    Icon: Linkedin,
  },
] as const;

export function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, loginWithToken } = useAuth();
  const { badgeCount, openCartDrawer } = useCart();
  const [shopOpen, setShopOpen] = useState(false);

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
    <>
      <div className="flex bg-[#1a1a1a]">
        <p className="mx-auto animate-pulse py-1 text-center text-xs text-white md:text-sm">
          FREE INTERNATIONAL SHIPPING ON ORDER OVER $250!
        </p>
      </div>

      <div className="hidden w-full flex-col items-center justify-between border-b bg-muted px-4 py-2 md:flex md:flex-row lg:px-28">
        <div className="flex items-center text-muted-foreground">
          <Mail className="mr-1 h-4 w-4" />
          <p className="text-sm font-semibold">info@iconivewigs.com</p>
        </div>
        <div className="flex gap-2 text-muted-foreground">
          {SOCIAL_LINKS.map(({ href, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="mx-1 hover:text-foreground"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="bg-white">
        <div className="flex justify-center px-4 lg:px-28">
          <Link href="/" className="mx-auto text-black no-underline">
            <h1 className="ps-1 text-3xl font-bold md:text-4xl">ICONIVE WIGS</h1>
          </Link>
        </div>
      </div>

      <div className="sticky top-0 z-50 bg-white shadow">
        <div className="relative">
          <div className="mx-auto flex items-center justify-between px-4 py-2 lg:px-28">
            <div className="flex w-auto items-center gap-2">
              <NavMobile onShopClick={() => setShopOpen((v) => !v)} />
              <CurrencyToggle className="hidden sm:flex" />
            </div>

            <NavDesktop
              shopOpen={shopOpen}
              onShopClick={() => setShopOpen((v) => !v)}
            />

            <div className="flex items-center justify-center gap-3 px-2">
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push("/profile?sidebar=4")}
                  aria-label="Wishlist"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={openCartDrawer}
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
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
                <Button variant="ghost" size="icon" onClick={googleLogin} aria-label="Login">
                  <User className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
          <ShopDropdown open={shopOpen} onNavigate={() => setShopOpen(false)} />
        </div>
      </div>
    </>
  );
}

export { NavDesktop } from "./NavDesktop";
export { NavMobile } from "./NavMobile";
export { CurrencyToggle } from "./CurrencyToggle";
