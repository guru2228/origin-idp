"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("platform_admin");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        role,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Authentication failed. Please check your credentials.");
        setIsLoading(false);
        return;
      }

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("An error occurred during login.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary"></div>
            <h1 className="text-2xl font-bold">Origin</h1>
          </div>
          <h2 className="text-3xl font-bold">Login to your account</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your credentials to access the platform
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Choose Your Role</CardTitle>
              <CardDescription>
                Select a role to access the AI-IDP dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={role}
                onValueChange={setRole}
                className="grid grid-cols-1 gap-4"
              >
                <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value="platform_admin" id="platform_admin" />
                  <Label htmlFor="platform_admin" className="flex flex-col cursor-pointer">
                    <span className="font-medium">Platform Admin</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Manage all subscriptions and platform settings
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value="tenant_admin" id="tenant_admin" />
                  <Label htmlFor="tenant_admin" className="flex flex-col cursor-pointer">
                    <span className="font-medium">Tenant Admin</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Manage workspaces and teams for your organization
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value="product_owner" id="product_owner" />
                  <Label htmlFor="product_owner" className="flex flex-col cursor-pointer">
                    <span className="font-medium">Product Owner</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Manage product features and documentation
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value="engineer" id="engineer" />
                  <Label htmlFor="engineer" className="flex flex-col cursor-pointer">
                    <span className="font-medium">Engineer</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Build and manage components and systems
                    </span>
                  </Label>
                </div>
              </RadioGroup>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="text-center text-sm">
          <p className="text-gray-500 dark:text-gray-400">
            For demo purposes, use any email with password: &quot;password&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
