import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Icon } from "@iconify/react";
import { useTimer } from "@/store";
import { Minus, Plus, X } from "lucide-react";
import { CardDescription, CardHeader, CardTitle } from "./ui/card";
import OtherSettings from "./other-settings";
import { Input } from "./ui/input";

function SettingsForm() {
  const {
    adjustFocusMinutes,
    adjustLongBreakInterval,
    adjustLongBreakMinutes,
    adjustShortBreakMinutes,
    focusMinutes,
    longBreakInterval,
    longBreakMinutes,
    shortBreakMinutes,
    status,
  } = useTimer((state) => state);
  const [focus, setFocus] = React.useState(focusMinutes);
  const [shortBreak, setShortBreak] = React.useState(shortBreakMinutes);
  const [longBreak, setLongBreak] = React.useState(longBreakMinutes);
  const [longBreakIntervl, setLongBreakIntervl] =
    React.useState(longBreakInterval);
  return (
    <div
      className={cn("space-y-3 py-2", {
        "text-focus-foreground": status === "focus",
        "text-short-break-foreground": status === "shortBreak",
        "text-long-break-foreground": status === "longBreak",
      })}
    >
      <div className="space-y-2">
        <CardHeader className="md:p-0 p-3">
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Length change applies at next session
          </CardDescription>
        </CardHeader>
        <div className="max-md:px-3 space-y-2">
          <SettingsInput
            label="Focus Length"
            max={60}
            status={status}
            id="focus"
            defaultValue={focus}
            onChange={(val) => {
              setFocus(val);
              adjustFocusMinutes(val);
            }}
          />
          <SettingsInput
            label="Short Break Length"
            max={15}
            status={status}
            id="short-break"
            defaultValue={shortBreak}
            onChange={(val) => {
              setShortBreak(val);
              adjustShortBreakMinutes(val);
            }}
          />
          <SettingsInput
            label="Long Break Length"
            max={60}
            id="long-break"
            status={status}
            defaultValue={longBreak}
            onChange={(val) => {
              setLongBreak(val);
              adjustLongBreakMinutes(val);
            }}
          />
          <SettingsInput
            label="Sessions Until Long Break"
            max={8}
            id="long-break-interval"
            status={status}
            defaultValue={longBreakIntervl}
            onChange={(val) => {
              setLongBreakIntervl(val);
              adjustLongBreakInterval(val);
            }}
          />
          <OtherSettings />
        </div>
      </div>
    </div>
  );
}

export function SettingsMenu() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { status } = useTimer((state) => state);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={cn(
              "w-12 h-12 rounded-xl transition-colors duration-300",
              {
                "bg-focus-secondary hover:bg-focus-secondary/90":
                  status === "focus",
                "bg-short-break-secondary hover:bg-short-break-secondary/90":
                  status === "shortBreak",
                "bg-long-break-secondary hover:bg-long-break-secondary/90":
                  status === "longBreak",
              },
            )}
          >
            <Icon
              icon="bi:three-dots"
              className={cn("w-4 h-4", {
                "text-focus-foreground": status === "focus",
                "text-short-break-foreground": status === "shortBreak",
                "text-long-break-foreground": status === "longBreak",
              })}
            />
          </Button>
        </DialogTrigger>
        <DialogContent
          className={cn("sm:max-w-[575px]", {
            "bg-focus": status === "focus",
            "bg-short-break": status === "shortBreak",
            "bg-long-break": status === "longBreak",
          })}
        >
          <SettingsForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className={cn("w-12 h-12 rounded-xl transition-colors duration-300", {
            "bg-focus-secondary hover:bg-focus-secondary/90":
              status === "focus",
            "bg-short-break-secondary hover:bg-short-break-secondary/90":
              status === "shortBreak",
            "bg-long-break-secondary hover:bg-long-break-secondary/90":
              status === "longBreak",
          })}
        >
          <Icon
            icon="bi:three-dots"
            className={cn("w-4 h-4", {
              "text-focus-foreground": status === "focus",
              "text-short-break-foreground": status === "shortBreak",
              "text-long-break-foreground": status === "longBreak",
            })}
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className={cn("border-none", {
          "bg-focus": status === "focus",
          "bg-short-break": status === "shortBreak",
          "bg-long-break": status === "longBreak",
        })}
      >
        <div className="h-[90vh] overflow-auto flex flex-col">
          <div
            className={cn(
              "rounded-md w-8 h-8 flex items-center justify-center cursor-pointer absolute right-3 top-3",
              {
                "bg-focus-secondary": status === "focus",
                "bg-short-secondary": status === "shortBreak",
                "bg-long-secondary": status === "longBreak",
              },
            )}
          >
            <X
              onClick={() => setOpen(false)}
              className={cn("w-5 h-5", {
                "text-focus-foreground": status === "focus",
                "text-short-break-foreground": status === "shortBreak",
                "text-long-break-foreground": status === "longBreak",
              })}
            />
          </div>
          <SettingsForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function SettingsInput({
  label,
  id,
  defaultValue,
  onChange,
  className,
  max,
  status,
}: {
  label: string;
  id: string;
  defaultValue: number;
  onChange: (val: number) => void;
  className?: string;
  max: number;
  status: string;
}) {
  return (
    <div
      className={cn(
        "flex md:justify-between justify-center md:items-center w-full max-md:flex-col max-md:space-y-1.5",
        className,
      )}
    >
      <label htmlFor={id}>{label}</label>
      <div className="flex max-md:w-full">
        <Input
          max={max}
          className="h-8 text-base max-md:w-full border-border w-max focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none"
          id={id}
          value={defaultValue}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val > max) {
              onChange(max);
            } else {
              onChange(val);
            }
          }}
        />
        <Button
          size="icon-sm"
          className={cn("rounded-none border-x-[0px]", {
            "text-focus-foreground hover:bg-focus-primary/90":
              status === "focus",
            "text-short-break-foreground hover:bg-short-break-primary/90":
              status === "shortBreak",
            "text-long-break-foreground hover:bg-long-break-primary/90":
              status === "longBreak",
          })}
          variant="outline"
          disabled={defaultValue >= max}
          onClick={() => {
            onChange(defaultValue + 1);
          }}
        >
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          size="icon-sm"
          className={cn("rounded-l-none", {
            "text-focus-foreground hover:bg-focus-primary/90":
              status === "focus",
            "text-short-break-foreground hover:bg-short-break-primary/90":
              status === "shortBreak",
            "text-long-break-foreground hover:bg-long-break-primary/90":
              status === "longBreak",
          })}
          variant="outline"
          disabled={defaultValue <= 1}
          onClick={() => {
            onChange(defaultValue - 1);
          }}
        >
          <Minus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
