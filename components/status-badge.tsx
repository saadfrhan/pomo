import { Icon } from "@iconify/react";
import { Badge } from "./ui/badge";

export default function StatusBadge({ status }: { status: string }) {
  if (status === "focus") {
    return focus;
  }
  if (status === "shortBreak") {
    return shortBreak;
  }
  if (status === "longBreak") {
    return longBreak;
  }
  return null;
}

const focus = (
  <Badge variant="outline" className="flex gap-1 items-center text-base">
    <Icon icon="ph:brain" className="w-5 h-5" />
    Focus
  </Badge>
);

const shortBreak = (
  <Badge
    variant="outline"
    className="flex gap-1 items-center text-base
	"
  >
    <Icon icon="ph:coffee" className="w-5 h-5" />
    Short Break
  </Badge>
);

const longBreak = (
  <Badge
    variant="outline"
    className="flex gap-1 items-center text-base
	"
  >
    <Icon icon="ph:coffee" className="w-5 h-5" />
    Long Break
  </Badge>
);
