"use client";

import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Icon } from "@iconify/react";
import StatusBadge from "./status-badge";
import { cn } from "@/lib/utils";
import { SettingsMenu } from "./settings-menu";

export default function Timer({
  minutes: _minutes = 25,
  seconds: _seconds = 0,
  shortBreakMinutes = 5,
  longBreakMinutes = 15,
  longBreakInterval = 4,
}: {
  minutes: number;
  seconds: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  longBreakInterval: number;
}) {
  const [minutes, setMinutes] = useState(_minutes);
  const [seconds, setSeconds] = useState(_seconds);
  // intervals completed
  const [intervals, setIntervals] = useState(0);
  const [stop, setStop] = useState(true);
  const [status, setStatus] = useState("focus");

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (stop) {
        clearInterval(intervalId);
        return;
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (shortBreakMinutes === 0) {
            return;
          }
          const newIntervals = intervals + 1;
          setIntervals(newIntervals);
          if (newIntervals % longBreakInterval === 0) {
            setMinutes(longBreakMinutes);
            setSeconds(0);
            setStatus("longBreak");
            return;
          } else {
            setMinutes(shortBreakMinutes);
            setSeconds(0);
            setStatus("shortBreak");
            return;
          }
        }
        setMinutes((minutes) => minutes - 1);
        setSeconds(59);
      } else {
        setSeconds((seconds) => seconds - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [
    shortBreakMinutes,
    minutes,
    seconds,
    stop,
    intervals,
    longBreakInterval,
    longBreakMinutes,
  ]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center h-screen gap-y-4"
      )}
    >
      <StatusBadge status={status} lap={intervals + 1} />
      <h1
        className={cn(
          "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
        )}
      >
        <p className="text-9xl leading-[0.8]">{pad(minutes)}</p>
        <p className="text-9xl leading-[0.8]">{pad(seconds)}</p>
      </h1>
      <div className="flex gap-3 items-center">
        <SettingsMenu />
        <Button
          onClick={() => setStop(!stop)}
          size="icon"
          className={cn("w-20 h-16 rounded-3xl transition-colors duration-300")}
        >
          {stop ? (
            <Icon icon="bi:play-fill" className="w-8 h-8" />
          ) : (
            <Icon icon="bi:pause-fill" className="w-8 h-8" />
          )}
        </Button>
        <Button
          size="icon"
          className={cn("w-12 h-12 rounded-xl transition-colors duration-300")}
          onClick={() => {
            if (status === "longBreak") {
              setMinutes(_minutes);
              setSeconds(0);
              setStatus("focus");
            } else if (status === "focus" && (intervals + 1) % 4 === 0) {
              // Check if it's the 4th focus session
              setMinutes(longBreakMinutes);
              setSeconds(0);
              setStatus("longBreak");
              setIntervals((prev) => prev + 1); // Increment intervals here
            } else if (status === "focus") {
              setMinutes(shortBreakMinutes);
              setSeconds(0);
              setStatus("shortBreak");
              setIntervals((prev) => prev + 1); // Increment intervals here
            } else {
              setMinutes(_minutes);
              setSeconds(0);
              setStatus("focus");
            }
          }}
        >
          <Icon icon="bi:fast-forward-fill" className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function pad(num: number) {
  return num.toString().padStart(2, "0");
}
