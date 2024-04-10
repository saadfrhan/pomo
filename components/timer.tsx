"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PauseIcon, PlayIcon, RefreshCw as ResetIcon } from "lucide-react";

export default function Timer({
  minutes: _minutes = 25,
  seconds: _seconds = 0,
  breakMinutes = 5,
}: {
  minutes: number;
  seconds: number;
  breakMinutes: number;
}) {
  const [minutes, setMinutes] = useState(_minutes);
  const [seconds, setSeconds] = useState(_seconds);
  const [stop, setStop] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (stop) {
        clearInterval(intervalId);
        return;
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (breakMinutes === 0) {
            return;
          }
          setMinutes(breakMinutes);
          setSeconds(0);
          return;
        }
        setMinutes((minutes) => minutes - 1);
        setSeconds(59);
      } else {
        setSeconds((seconds) => seconds - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [breakMinutes, minutes, seconds, stop]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-2">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {pad(minutes)}:{pad(seconds)}
      </h1>
      <div className="flex gap-2">
        <Button onClick={() => setStop(!stop)} size="icon">
          {stop ? (
            <PlayIcon className="w-4 h-4" />
          ) : (
            <PauseIcon className="w-4 h-4" />
          )}
        </Button>
        <Button
          onClick={() => {
            setMinutes(_minutes);
            setSeconds(_seconds);
            setStop(true);
          }}
          size="icon"
        >
          <ResetIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function pad(num: number) {
  return num.toString().padStart(2, "0");
}
