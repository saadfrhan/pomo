import { useEffect, useRef, useState } from "react";
import { Button } from "./components/ui/button";
import { Icon } from "@iconify/react";
import StatusBadge from "./components/status-badge";
import { cn } from "@/lib/utils";
import { SettingsMenu } from "./components/settings-menu";
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
    extraBoldTime,
    showProgressbar
  } = useTimer((state) => state);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key === "F11") {
        event.preventDefault(); // Prevent the default F11 behavior
        try {
          if (!fullscreen) {
            await document.documentElement.requestFullscreen();
            isFullscreen(true);
          } else {
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
    const updateTitle = () => {
      document.title = `${pad(minutes)}:${pad(seconds)} - ${status === 'focus' ? 'Time to focus!' : 'Time for a break!'}`;
    };

    updateTitle();

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateTitle();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [minutes, seconds, status]);

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

  console.log(
    {
      // "bg-[#000]": focusMode && !stop,
      "bg-focus/15": status === "focus",
      "bg-short-break/15": status === "shortBreak",
      "bg-long-break/15": status === "longBreak",
    }
  )

  return (
    <div
      onMouseMove={() => setMouseMoved(true)}
      className={cn("h-dvh", {
        // "bg-[#000]": focusMode && !stop,
        "bg-focus": status === "focus",
        "bg-short-break": status === "shortBreak",
        "bg-long-break": status === "longBreak",
      })}
    >
      {/* progress bar of timer from start till end */}
      {showProgressbar &&<div className="relative w-full h-1 bg-secondary rounded-full md:mb-6">
        <div
          className={cn("absolute top-0 left-0 h-full rounded-full", {
            "bg-focus-primary": status === "focus",
            "bg-short-break-primary": status === "shortBreak",
            "bg-long-break-primary": status === "longBreak",

          })}
          style={{
            width: `${
              ((time[status] * 60 - minutes * 60 - seconds) /
                (time[status] * 60)) *
              100
            }%`,
          }}
        ></div>
      </div>}
      <div className="flex flex-col w-full max-w-xl mx-auto gap-y-4">
        <div className="flex flex-col justify-center items-center h-[94dvh] gap-y-6">
          <StatusBadge status={status} lap={intervals + 1} />
          <div className={cn("font-extralight flex flex-col items-center justify-center", {
            "font-extrabold": extraBoldTime,
            "text-focus-foreground": status === "focus",
            "text-short-break-foreground": status === "shortBreak",
            "text-long-break-foreground": status === "longBreak",
          })}>
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
            {(!focusMode || (focusMode && stop)) && <SettingsMenu status={status} />}
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
                "w-20 h-16 rounded-3xl transition-colors duration-300",
                {"bg-focus-primary hover:bg-focus-primary/90": status === "focus",
                "bg-short-break-primary hover:bg-short-break-primary/90": status === "shortBreak",
                "bg-long-break-primary hover:bg-long-break-primary/90": status === "longBreak",}
              )}
            >
              {stop ? (
                <Icon icon="bi:play-fill" className={cn("w-8 h-8", {
                  "text-focus-foreground": status === "focus",
                  "text-short-break-foreground": status === "shortBreak",
                  "text-long-break-foreground": status === "longBreak",
                })} />
              ) : (
                <Icon icon="bi:pause-fill" className={cn("w-8 h-8", {
                  "text-focus-foreground": status === "focus",
                  "text-short-break-foreground": status === "shortBreak",
                  "text-long-break-foreground": status === "longBreak",
                })} />
              )}
            </Button>
            <Button
              size="icon"
              className={cn("w-12 h-12 rounded-xl transition-colors duration-300", {"bg-focus-secondary hover:bg-focus-secondary/90": status === "focus",
                "bg-short-break-secondary hover:bg-short-break-secondary/90": status === "shortBreak",
                "bg-long-break-secondary hover:bg-long-break-secondary/90": status === "longBreak",})}
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
              <Icon icon="bi:fast-forward-fill" className={cn("w-4 h-4", {
                  "text-focus-foreground": status === "focus",
                  "text-short-break-foreground": status === "shortBreak",
                  "text-long-break-foreground": status === "longBreak",
                })} />
            </Button>
            {(!focusMode || (focusMode && stop)) && (
              <Button
                size="icon"
                className={cn(
                  "w-12 h-12 rounded-xl transition-colors duration-300", {
                    "text-focus-foreground hover:bg-focus-secondary/90 bg-focus-secondary": status === "focus",
                    "text-short-break-foreground hover:bg-short-break-secondary/90 bg-short-break-secondary": status === "shortBreak",
                    "text-long-break-foreground hover:bg-long-break-secondary/90 bg-long-break-secondary": status === "longBreak",

                  }
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
