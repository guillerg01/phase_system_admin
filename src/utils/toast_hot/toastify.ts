import { toast } from "react-hot-toast";

export function notify(
  type: "success" | "error" | "loading" | "info",
  message: string,
  duration?: number | undefined
) {
  switch (type) {
    case "success":
      toast.success(message, { duration: duration ?? 3000 });
      break;
    case "error":
      toast.error(message, { duration: duration ?? 3000 });
      break;
    case "loading":
      toast.loading(message, { duration: duration ?? 3000 });
      break;
    case "info":
      toast.success(message, {
        duration: duration ?? 3000,
        style: { background: "#6E6B6B", color: "white" },
        icon: "",
      });
      break;

    default:
      toast(message);
  }
}
