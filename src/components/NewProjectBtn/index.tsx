import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../ui/button";
import { BsPlusCircle } from "react-icons/bs";

const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    key: z.string().min(2, "Key must be 2-5 uppercase letters").max(5).regex(/^[A-Z]+$/),
    description: z.string().optional(),
});

const NewProjectBtn = ({ userId }: { userId: string }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            key: "",
            description: "",
        },
    });

    const handleCreateProject = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch("/api/graphql", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `
            mutation CreateProject($input: CreateProjectInput!) {
              createProject(input: $input) {
                _id
                name
                key
              }
            }
          `,
                    variables: {
                        input: values
                    }
                }),
            });

            const { data, errors } = await response.json();

            if (errors) throw new Error(errors[0].message);

            if (data?.createProject) {
                setOpen(false);
                form.reset();
                router.push(`/dashboard/${userId}/project/${data.createProject._id}`);
            }
        } catch (error) {
            console.error("Project creation failed:", error);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button className="flex items-center gap-2">
                    <BsPlusCircle className="mr-1" /> New Project
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleCreateProject)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="My Awesome Project" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="key"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Key</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="AWESOME"
                                            {...field}
                                            onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Project description..."
                                            {...field}
                                            className="min-h-[100px]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">Create Project</Button>
                        </div>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    );
};

export default NewProjectBtn;
