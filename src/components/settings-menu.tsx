import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
  } = useTimer((state) => state);
  const [focus, setFocus] = React.useState(focusMinutes);
  const [shortBreak, setShortBreak] = React.useState(shortBreakMinutes);
  const [longBreak, setLongBreak] = React.useState(longBreakMinutes);
  const [longBreakIntervl, setLongBreakIntervl] =
    React.useState(longBreakInterval);
  return (
    <div className="space-y-3 py-2">
      <div className="space-y-2">
        <CardHeader className="md:p-0 p-3">
          <CardTitle>Session Length</CardTitle>
          <CardDescription>
            The length of each session type in minutes. Changes apply to the
            next session of each type.
          </CardDescription>
        </CardHeader>
        <div className="md:space-y-4">
          <div>
            <SettingsInput
              label="Focus Length"
              max={60}
              className=" max-md:rounded-none rounded-t-lg border-t border"
              id="focus"
              defaultValue={focus}
              onChange={(val) => {
                console.log(val)

                setFocus(val);
                adjustFocusMinutes(val);
              }}
            />
            <SettingsInput
              label="Short Break Length"
              max={15}
              className=" max-md:rounded-none border-x border-b"
              id="short-break"
              defaultValue={shortBreak}
              onChange={(val) => {
                console.log(val)

                setShortBreak(val);
                adjustShortBreakMinutes(val);
              }}
            />
            <SettingsInput
              label="Long Break Length"
              max={60}
              className=" max-md:rounded-none rounded-b-lg border-x border-b"
              id="long-break"
              defaultValue={longBreak}
              onChange={(val) => {
                console.log(val)
                setLongBreak(val);
                adjustLongBreakMinutes(val);
              }}
            />
          </div>
          <SettingsInput
            label="Sessions Until Long Break"
            max={8}
            className="max-md:rounded-none border rounded-md"
            id="long-break-interval"
            defaultValue={longBreakIntervl}
            onChange={(val) => {
              console.log(val)

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

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-12 h-12 rounded-xl transition-colors duration-300">
            <Icon icon="bi:three-dots" className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[575px]">
          <DialogHeader>
            <DialogTitle className="text-center">Preferences</DialogTitle>
          </DialogHeader>
          <SettingsForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-12 h-12 rounded-xl transition-colors duration-300">
          <Icon icon="bi:three-dots" className="w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="h-[94vh] overflow-auto flex flex-col">

          <DrawerHeader className="text-left relative flex w-full justify-between">
            <DrawerTitle className="text-center">Preferences</DrawerTitle>
          <X
            onClick={() => setOpen(false)}
            className="w-10 h-10 absolute right-3 top-3"
          />
          </DrawerHeader>
          <SettingsForm />
          <DrawerFooter className="p-0">
            <DrawerClose asChild>
              <Button variant="ghost">Close</Button>
            </DrawerClose>
          </DrawerFooter>
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
}: {
  label: string;
  id: string;
  defaultValue: number;
  onChange: (val: number) => void;
  className?: string;
  max: number;
}) {
  return (
    <div
      className={cn(
        "flex md:justify-between justify-center md:items-center w-full p-3 max-md:flex-col max-md:space-y-1.5",
        className
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
            const val = Number(e.target.value)
            if (val > max) {
              onChange(max)
            } else {
              onChange(val)
            }
          }}
        />
        <Button
          size="icon-sm"
          className="rounded-none"
          disabled={defaultValue >= max}
          onClick={() => {
            onChange(defaultValue + 1);
          }}
        >
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          size="icon-sm"
          className="rounded-l-none"
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
