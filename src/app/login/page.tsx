"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
    const [state, action, isPending] = useActionState(login, undefined);

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-3xl font-bold tracking-tight">Welcome back</CardTitle>
                    <CardDescription>
                        Enter your email and password to log in to your account
                    </CardDescription>
                </CardHeader>
                <form action={action}>
                    <CardContent className="space-y-4">
                        {state?.error && (
                            <div className="p-3 text-sm text-red-500 bg-red-100 rounded-md">
                                {state.error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 mt-6">
                        <Button className="w-full" type="submit" disabled={isPending}>
                            {isPending ? "Signing In..." : "Sign In"}
                        </Button>
                        <div className="text-sm text-center">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-primary hover:underline font-medium">
                                Sign Up
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
