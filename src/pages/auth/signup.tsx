"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    role: z
      .enum(["USER", "MANAGER", "ADMIN", "DEVELOPER", "VIEWER"])
      .default("USER"),
    name: z.string().nonempty({ message: "Full name is required." }),
    email: z
      .string()
      .email({ message: "Invalid email address." })
      .nonempty({ message: "Email address is required." }),
    password: z
      .string()
      .nonempty({ message: "Password is required." })
      .min(6, { message: "Password must be at least 6 characters." })
      .regex(/[a-z]/, {
        message: "Password must include at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must include at least one uppercase letter.",
      })
      .regex(/\d/, { message: "Password must include at least one number." }),
    rePassword: z
      .string()
      .nonempty({ message: "Retype password is required." }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords must match.",
    path: ["rePassword"],
  });

const SignUpPage: React.FC = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [message, setMessage] = useState("");
  const router = useRouter();
  const submitFormData = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data }),
      });

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      const result = await response.json();
      console.log(result);

      toast.success(
        "Account Created Successfully, redirecting to login in 5s."
      );
      setTimeout(() => router.push("/auth/signin"), 5000);
    } catch (error) {
      console.error("Error submitting form data:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-sky-600">
              Join Our Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitFormData)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a position" />
                          </SelectTrigger>
                        </FormControl>
                        <FormDescription>
                          This is your role in the company.
                        </FormDescription>
                        <SelectContent>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                          <SelectItem value="MANAGER">Manager</SelectItem>
                          <SelectItem value="DEVELOPER">Developer</SelectItem>
                          <SelectItem value="USER">User</SelectItem>
                          <SelectItem value="VIEWER">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="name"
                          {...field}
                          placeholder="Enter your full name"
                          className="mt-1 w-full"
                        />
                      </FormControl>
                      <FormDescription>
                        Please use your full legal name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          id="email"
                          {...field}
                          placeholder="Enter your email address"
                          className="mt-1 w-full"
                        />
                      </FormControl>
                      <FormDescription>
                        Please use your company email address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          id="password"
                          {...field}
                          placeholder="Enter password"
                          className="mt-1 w-full"
                        />
                      </FormControl>
                      <FormDescription>
                        The Password should be:
                        <br />
                        - At least 8 characters long
                        <br />- Include at least one lowercase, one uppercase,
                        and one number
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rePassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Retype Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          id="repassword"
                          {...field}
                          placeholder="Enter password"
                          className="mt-1 w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CardFooter className="flex justify-center">
                  <Button type="submit" className="bg-sky-500 w-full md:w-auto">
                    Sign Up
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
