import { toast } from "@/shadcn/hooks/use-toast";

export const hasAccess = (response: Response) => {
  if (response.status === 401) {
    toast({
      title: "Unauthorized",
      description: "Please check your permissions.",
    });
  }
  return response;
};
