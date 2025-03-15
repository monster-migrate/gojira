import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const showToast = () => {
    toast.success("Succulent Success", {
      className: "text-red-500",
    });
  };
  return (
    <div>
      <Button variant="outline" className="bg-rose-500" onClick={showToast}>
        Hello World
      </Button>
    </div>
  );
}
