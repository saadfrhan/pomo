import { Icon } from "@iconify/react";
import { Badge } from "./ui/badge";

export default function StatusBadge({ status, lap = 1 }: { status: string, lap: number }) {
  if (status === "focus") {
    return focus(lap);
  }
  if (status === "shortBreak") {
    return shortBreak
  }
  if (status === "longBreak") {
    return longBreak
  }
  return null;
}

const focus = ( lap = 1) => (
  <Badge variant="outline" className="flex gap-1 items-center text-base w-fit border-focus-foreground font-medium bg-focus-secondary text-focus-foreground">
    <Icon icon="ph:brain" className="w-5 h-5" />
    Focus #{lap}
  </Badge>
);

const shortBreak = (
  <Badge
    variant="outline"
    className="flex gap-1 items-center text-base w-fit border-short-break-foreground bg-short-break-secondary font-medium text-short-break-foreground"
  >
    <Icon icon="ph:coffee" className="w-5 h-5" />
    Short Break
  </Badge>
);

const longBreak = (
  <Badge
    variant="outline"
    className="flex gap-1 items-center text-base w-fit border-long-break-foreground bg-long-break-secondary font-medium text-long-break-foreground"
  >
    <Icon icon="ph:coffee" className="w-5 h-5" />
    Long Break
  </Badge>
);
