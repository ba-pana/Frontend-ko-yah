"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { apiClient } from "@/lib/api";
import { CONFIG } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, HelpCircleIcon, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (isChecking) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiClient("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      router.push(CONFIG.ROUTES.LOGIN);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      <nav className="border-b border-slate-200 bg-[#FFFFFF]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0071E3]">
                <Laptop className="h-6 w-6 text-white" />
              </div>

              <span className="flex text-xl font-bold tracking-tight text-slate-900 text-[#1D1D1F]">
                LAP<span className="text-[#0071E3]">TRIP</span>
              </span>
            </Link>

            <div className="border-l border-slate-300 pl-8 text-lg font-medium text-[#1D1D1F]">Register</div>
          </div>
          
          <Link href="/" className="hover:text-[#0071E3]">
            <div className="flex items-center gap-2 text-sm font-medium text-[#1D1D1F] hover:text-[#0071E3]">
              <HelpCircleIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Help</span>
            </div>
          </Link>

        </div>
      </nav>

      <section className="grid min-h-[calc(100vh-73px)] lg:grid-cols-2">

        <div className="relative hidden lg:block" style={{
            maskImage: "linear-gradient(to right, black 40%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, black 40%, transparent 100%)",
          }}>
            <Image
              src="/images/3.jpg"
              alt="Laptops on a desk"
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
        </div>

        <div className="flex items-center justify-center p-4 bg-[#F5F5F7]">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl">Register</CardTitle>
            </CardHeader>
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4">
                {error && (
                  <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-md border border-red-200 dark:border-red-900">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-10"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10 pr-10"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#0071E3]"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <Link href="/" className="text-xs font-medium text-[#0071E3] hover:underline">Forgot password?</Link>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 mt-3 bg-[#FFFFFF]" >
                <Button type="submit" className="h-10 w-full bg-[#0071E3] hover:bg-[#0062C4]" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </Button>

                <p className="text-center text-xs leading-relaxed text-[#86868B]">
                  By registering, you agree to LapTrip's{" "}
                  <Link href="/" className="text-[#0071E3] hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/" className="text-[#0071E3] hover:underline">Privacy Policy</Link>.
                </p>

                <div className="w-full border-t border-slate-200" />

                <p className="text-sm text-center text-muted-foreground">
                  Already have an account?{" "}
                  <Link href={CONFIG.ROUTES.LOGIN} className="font-medium text-[#0071E3] hover:underline">
                    Log In
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
            <div>
              <h4 className="mb-4 text-sm font-semibold text-[#1D1D1F]">Customer Service</h4>
              <ul className="space-y-2 text-sm text-[#86868B]">
                <li><Link href="/" className="hover:text-[#0071E3]">Help Centre</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-[#1D1D1F]">About LapTrip</h4>
              <ul className="space-y-2 text-sm text-[#86868B]">
                <li><Link href="/" className="hover:text-[#0071E3]">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-[#1D1D1F]">Payment</h4>
              <div className="flex flex-wrap gap-2">
                <span className="rounded border border-slate-200 px-2 py-1 text-xs text-[#86868B]">Soon...</span>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-[#1D1D1F]">Follow Us</h4>
              <ul className="space-y-2 text-sm text-[#86868B]">
                <li><a href="/" className="hover:text-[#0071E3]">Soon...</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold text-[#1D1D1F]">App Download</h4>
              <div className="flex flex-col gap-2 text-sm text-[#86868B]">
                <a href="/" className="hover:text-[#0071E3]">Soon...</a>
              </div>
            </div>
          </div>
          
          <p className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-[#86868B]">
            © 2026 LapTrip. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}