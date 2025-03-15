import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function About() {
  const showToast = () => {
    toast.success("Succulent Success", {
      className: "text-red-500",
    });
  };
  return (
    <div>
      <Button variant="outline" className="bg-rose-500" onClick={showToast}>
        Hello World. This is about page.
      </Button>
    </div>
  );
}
