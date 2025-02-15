import { toast } from "@/shadcn/hooks/use-toast";
import { Button } from "@/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/ui/form";
import { Input } from "@/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { Switch } from "@/shadcn/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  provider: z.enum(["local", "s3"]),
  bucket: z.string().optional(),
  endpoint: z.string().optional(),
  region: z.string().optional(),
  accessKey: z.string().optional(),
  secretKey: z.string().optional(),
  basePath: z.string(),
  active: z.boolean(),
});

export default function StorageSettings() {
  const [loading, setLoading] = useState(true);
  const token = getCookie("session");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provider: "local",
      basePath: "uploads",
      active: true,
    },
  });

  async function fetchConfig() {
    try {
      const response = await fetch("/api/v1/storage/config", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch config");

      const data = await response.json();
      if (data.config) {
        form.reset(data.config);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load storage configuration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/v1/storage/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to save config");

      toast({
        title: "Success",
        description: "Storage configuration updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save storage configuration",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    fetchConfig();
  }, []);

  const watchProvider = form.watch("provider");

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Storage Settings</CardTitle>
          <CardDescription>
            Configure how files are stored in your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="provider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Storage Provider</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a storage provider" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="local">Local Storage</SelectItem>
                        <SelectItem value="s3">S3 Compatible</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose where to store uploaded files
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="basePath"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Path</FormLabel>
                    <FormControl>
                      <Input placeholder="uploads" {...field} />
                    </FormControl>
                    <FormDescription>
                      Base directory for storing files
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchProvider === "s3" && (
                <>
                  <FormField
                    control={form.control}
                    name="bucket"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bucket Name</FormLabel>
                        <FormControl>
                          <Input placeholder="my-bucket" {...field} />
                        </FormControl>
                        <FormDescription>
                          The name of your S3 bucket
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endpoint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endpoint URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://s3.amazonaws.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The endpoint URL for your S3-compatible storage
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <FormControl>
                          <Input placeholder="us-east-1" {...field} />
                        </FormControl>
                        <FormDescription>
                          The region where your bucket is located
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="accessKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Access Key</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Access Key ID"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Your S3 access key ID</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="secretKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret Key</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Secret Access Key"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your S3 secret access key
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Activate Storage Provider
                      </FormLabel>
                      <FormDescription>
                        Enable or disable this storage configuration
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading}>
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
} 