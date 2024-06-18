import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import StatusBadge from "./status-badge";
import { cn } from "@/lib/utils";
import { SettingsMenu } from "./settings-menu";
import { Helmet } from "react-helmet-async";
import { RotateCcwIcon } from "lucide-react";
import { useTimer } from "@/store";
import tickSound from "./tick.mp3";
import startSound from "./start.mp3";
import endSound from "./end-alarm.mp3";

export default function Timer() {
  const {
    focusMinutes,
    longBreakInterval,
    longBreakMinutes,
    shortBreakMinutes,
    playTick,
    focusMode,
    fullscreen,
    isFullscreen,
    autoresume,
  } = useTimer((state) => state);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key === "F11") {
        event.preventDefault(); // Prevent the default F11 behavior
        try {
          if (!fullscreen) {
            console.log("Entering fullscreen mode");
            await document.documentElement.requestFullscreen();
            isFullscreen(true);
          } else {
            console.log("Exiting fullscreen mode");
            await document.exitFullscreen();
            isFullscreen(false);
          }
        } catch (error) {
          console.error("Failed to toggle fullscreen mode:", error);
        }
      }
    };

    const handleFullscreenChange = () => {
      isFullscreen(document.fullscreenElement != null);
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [fullscreen]);

  useEffect(() => {
    console.log({ isFullscreen: fullscreen });
  }, [fullscreen]);

  const [mouseMoved, setMouseMoved] = useState(false);

  useEffect(() => {
    if (fullscreen || focusMode) {
      const timer = setTimeout(() => setMouseMoved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [mouseMoved, fullscreen]);

  const [minutes, setMinutes] = useState(focusMinutes);
  const [seconds, setSeconds] = useState(0);
  const [intervals, setIntervals] = useState(0);
  const [stop, setStop] = useState(true);
  const [status, setStatus] = useState("focus");

  const endAlarm = new Audio(endSound)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (stop) {
        clearInterval(intervalId);
        return;
      }
      if (playTick) {
        tickAudioRef.current.play();
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
            if (!autoresume) {
              setStop(true);
              endAlarm.play();
              // stop endAlarm after 10 seconds
            }
            return;
          } else {
            setMinutes(shortBreakMinutes);
            setSeconds(0);
            setStatus("shortBreak");
            if (!autoresume) {
              setStop(true);
              const endAlarm = new Audio(endSound);
              endAlarm.play();
              if (!stop) {
                setTimeout(() => {
                  endAlarm.pause();
                  endAlarm.currentTime = 0;
                }, 10000);
              } else {
                endAlarm.pause();
                endAlarm.currentTime = 0;
              }
            }
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

  function handleReset() {
    setMinutes(focusMinutes);
    setSeconds(0);
    setStatus("focus");
    setIntervals(0);
    setStop(true);
  }

  const tickAudio = new Audio(tickSound);
  const startAudio = new Audio(startSound);
  const tickAudioRef = useRef(tickAudio);

  const time: {
    [x: string]: number;
  } = {
    focus: focusMinutes,
    shortBreak: shortBreakMinutes,
    longBreak: longBreakMinutes,
  };

  return (
    <div
      onMouseMove={() => setMouseMoved(true)}
      className={cn("h-dvh", {
        "bg-[#000]": focusMode && !stop,
      })}
    >
      <Helmet>
        <title>
          {pad(minutes)}:{pad(seconds)} -{" "}
          {status === "focus" ? "Time to focus!" : "Time for a break!"}
        </title>
      </Helmet>
      {/* progress bar of timer from start till end */}
      <div className="relative w-full h-1 bg-secondary rounded-full md:mb-6">
        <div
          className="absolute top-0 left-0 h-full bg-foreground rounded-full"
          style={{
            width: `${
              ((time[status] * 60 - minutes * 60 - seconds) /
                (time[status] * 60)) *
              100
            }%`,
          }}
        ></div>
      </div>
      <div className="flex flex-col w-full max-w-xl mx-auto gap-y-4">
        <div className="flex flex-col justify-center items-center h-[94dvh] gap-y-6">
          <StatusBadge status={status} lap={intervals + 1} />
          <div className="font-extrabold flex flex-col items-center justify-center">
            <p className="text-[15rem] leading-[0.8]">{pad(minutes)}</p>
            <p className="text-[15rem] leading-[0.8]">{pad(seconds)}</p>
          </div>
          <div
            className={`flex gap-3 items-center transition-opacity duration-500 ${
              (fullscreen || focusMode) && !mouseMoved && !stop
                ? "opacity-0"
                : "opacity-100"
            }`}
          >
            {(!focusMode || (focusMode && stop)) && <SettingsMenu />}
            <Button
              onClick={() => {
                startAudio.play();
                setStop(!stop);
                if (autoresume && !endAlarm.paused) {
                  endAlarm.pause();
                  endAlarm.currentTime = 0;
                }
              }}
              size="icon"
              className={cn(
                "w-20 h-16 rounded-3xl transition-colors duration-300"
              )}
            >
              {stop ? (
                <Icon icon="bi:play-fill" className="w-8 h-8" />
              ) : (
                <Icon icon="bi:pause-fill" className="w-8 h-8" />
              )}
            </Button>
            <Button
              size="icon"
              className="w-12 h-12 rounded-xl transition-colors duration-300"
              onClick={() => {
                if (status === "longBreak") {
                  setMinutes(focusMinutes);
                  setSeconds(0);
                  setStatus("focus");
                } else if (
                  status === "focus" &&
                  (intervals + 1) % longBreakInterval === 0
                ) {
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
                  setMinutes(focusMinutes);
                  setSeconds(0);
                  setStatus("focus");
                }
              }}
            >
              <Icon icon="bi:fast-forward-fill" className="w-4 h-4" />
            </Button>
            {(!focusMode || (focusMode && stop)) && (
              <Button
                size="icon"
                className={cn(
                  "w-12 h-12 rounded-xl transition-colors duration-300"
                )}
                onClick={handleReset}
              >
                <RotateCcwIcon className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function pad(num: number) {
  return num.toString().padStart(2, "0");
}
