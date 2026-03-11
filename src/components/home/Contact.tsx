"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { submitContactFormAction } from "@/actions/contact";
import { useState } from "react";

export function Contact() {
    const [pending, setPending] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            message: "",
        },
    });

    const onSubmit = async (values: ContactFormValues) => {
        setPending(true);
        setMessage(null);
        try {
            const res = await submitContactFormAction(values);
            if (res.error) {
                setMessage({ type: "error", text: res.error });
            } else {
                setMessage({ type: "success", text: res.success || "Message sent successfully!" });
                reset();
            }
        } catch (error) {
            setMessage({ type: "error", text: "Something went wrong. Please try again." });
        } finally {
            setPending(false);
        }
    };

    return (
        <div className={""}>
            <section id="contact" className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Get in Touch</h2>
                            <p className="text-muted-foreground text-lg mb-12">
                                Ready to start your next project? Contact us today to discuss your requirements and how we can help you achieve your goals.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <Mail className="size-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Email Us</h3>
                                        <p className="text-muted-foreground">skshiam129@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <Phone className="size-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Call Us</h3>
                                        <p className="text-muted-foreground">+880 1568235129</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <MapPin className="size-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Visit Us</h3>
                                        <p className="text-muted-foreground">Rupsha Khulna, Bangladesh</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <Label htmlFor="firstName">First name</Label>
                                        <Input
                                            id="firstName"
                                            placeholder="John"
                                            {...register("firstName")}
                                            disabled={pending}
                                        />
                                        {errors.firstName && (
                                            <p className="text-xs text-red-500">{errors.firstName.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="lastName">Last name</Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Doe"
                                            {...register("lastName")}
                                            disabled={pending}
                                        />
                                        {errors.lastName && (
                                            <p className="text-xs text-red-500">{errors.lastName.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        {...register("email")}
                                        disabled={pending}
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-500">{errors.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us about your project..."
                                        className="min-h-[120px]"
                                        {...register("message")}
                                        disabled={pending}
                                    />
                                    {errors.message && (
                                        <p className="text-xs text-red-500">{errors.message.message}</p>
                                    )}
                                </div>

                                {message && (
                                    <div className={`p-4 rounded-lg text-sm ${message.type === "success" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                                        {message.text}
                                    </div>
                                )}

                                <Button type="submit" className="w-full" disabled={pending}>
                                    {pending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        "Send Message"
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

