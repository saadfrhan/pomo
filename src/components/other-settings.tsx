import { useTheme } from "@/components/theme-provider";
import { Switch } from "./ui/switch";
import { useTimer } from "@/store";
import { useMediaQuery } from "usehooks-ts";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

export default function OtherSettings({ status }: { status: string }) {
  const { setTheme, theme } = useTheme();
  const {
    playTick,
    isPlayTick,
    focusMode,
    isFocusMode,
    showProgressbar,
    isShowProgressbar,
    isFullscreen,
    autoresume,
    isAutoresume,
    extraBoldTime,
    isExtraBoldTime,
  } = useTimer((state) => state);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // is user presses f11

  const handleEnterFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
      isFullscreen(true);
    } else {
      console.log("An error occurred");
    }
  };

  const handleExitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      isFullscreen(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between  w-full p-3 items-center md:rounded-t-md md:border max-md:space-y-1.5">
        <p>Dark mode</p>
        <Switch
          className={cn("cursor-pointer", {
            "data-[state=checked]:bg-focus-primary data-[state=unchecked]:bg-checkbox-focus-off": status === "focus",
            "data-[state=checked]:bg-short-break-primary data-[state=unchecked]:bg-checkbox-short-break-off":
              status === "shortBreak",
            "data-[state=checked]:bg-long-break-primary data-[state=unchecked]:bg-checkbox-long-break-off":
              status === "longBreak",
          })}
          thumbClassName={cn({
            "bg-focus": status === "focus",
            "bg-short-break": status === "shortBreak",
            "bg-long-break": status === "longBreak",
          })}
          checked={theme === "dark"}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
      </div>
      <div className="flex justify-between  w-full p-3 items-center md:border-b md:border-x max-md:space-y-1.5">
        <p>Play ticking sound</p>
        <Switch
          className={cn("cursor-pointer", {
            "data-[state=checked]:bg-focus-primary data-[state=unchecked]:bg-checkbox-focus-off": status === "focus",
            "data-[state=checked]:bg-short-break-primary data-[state=unchecked]:bg-checkbox-short-break-off":
              status === "shortBreak",
            "data-[state=checked]:bg-long-break-primary data-[state=unchecked]:bg-checkbox-long-break-off":
              status === "longBreak",
          })}
          thumbClassName={cn({
            "bg-focus": status === "focus",
            "bg-short-break": status === "shortBreak",
            "bg-long-break": status === "longBreak",
          })}
          checked={playTick}
          onCheckedChange={() => isPlayTick(!playTick)}
        />
      </div>
      <div className="flex justify-between  w-full p-3 items-center md:border-b md:border-x max-md:space-y-1.5">
        <p>Show progressbar</p>
        <Switch
          className={cn("cursor-pointer", {
            "data-[state=checked]:bg-focus-primary data-[state=unchecked]:bg-checkbox-focus-off": status === "focus",
            "data-[state=checked]:bg-short-break-primary data-[state=unchecked]:bg-checkbox-short-break-off":
              status === "shortBreak",
            "data-[state=checked]:bg-long-break-primary data-[state=unchecked]:bg-checkbox-long-break-off":
              status === "longBreak",
          })}
          thumbClassName={cn({
            "bg-focus": status === "focus",
            "bg-short-break": status === "shortBreak",
            "bg-long-break": status === "longBreak",
          })}
          checked={showProgressbar}
          onCheckedChange={() => isShowProgressbar(!showProgressbar)}
        />
      </div>
      <div className="flex justify-between  w-full p-3 items-center md:rounded-b-md md:border-x md:border-b max-md:space-y-1.5">
        <p>Focus mode</p>
        <Switch
          className={cn("cursor-pointer", {
            "data-[state=checked]:bg-focus-primary data-[state=unchecked]:bg-checkbox-focus-off": status === "focus",
            "data-[state=checked]:bg-short-break-primary data-[state=unchecked]:bg-checkbox-short-break-off":
              status === "shortBreak",
            "data-[state=checked]:bg-long-break-primary data-[state=unchecked]:bg-checkbox-long-break-off":
              status === "longBreak",
          })}
          thumbClassName={cn({
            "bg-focus": status === "focus",
            "bg-short-break": status === "shortBreak",
            "bg-long-break": status === "longBreak",
          })}
          checked={focusMode}
          onCheckedChange={() => isFocusMode(!focusMode)}
        />
      </div>
      <div className="flex justify-between  w-full p-3 items-center md:rounded-b-md md:border-x md:border-b max-md:space-y-1.5">
        <p>Extrabold time weight</p>
        <Switch
          className={cn("cursor-pointer", {
            "data-[state=checked]:bg-focus-primary data-[state=unchecked]:bg-checkbox-focus-off": status === "focus",
            "data-[state=checked]:bg-short-break-primary data-[state=unchecked]:bg-checkbox-short-break-off":
              status === "shortBreak",
            "data-[state=checked]:bg-long-break-primary data-[state=unchecked]:bg-checkbox-long-break-off":
              status === "longBreak",
          })}
          thumbClassName={cn({
            "bg-focus": status === "focus",
            "bg-short-break": status === "shortBreak",
            "bg-long-break": status === "longBreak",
          })}
          checked={extraBoldTime}
          onCheckedChange={() => isExtraBoldTime(!extraBoldTime)}
        />
      </div>
      <div className="flex justify-between  w-full p-3 items-center md:rounded-b-md md:border-x md:border-b max-md:space-y-1.5">
        <p>Autoresume</p>
        <Switch
          className={cn("cursor-pointer", {
            "data-[state=checked]:bg-focus-primary data-[state=unchecked]:bg-checkbox-focus-off": status === "focus",
            "data-[state=checked]:bg-short-break-primary data-[state=unchecked]:bg-checkbox-short-break-off":
              status === "shortBreak",
            "data-[state=checked]:bg-long-break-primary data-[state=unchecked]:bg-checkbox-long-break-off":
              status === "longBreak",
          })}
          thumbClassName={cn({
            "bg-focus": status === "focus",
            "bg-short-break": status === "shortBreak",
            "bg-long-break": status === "longBreak",
          })}
          checked={autoresume}
          onCheckedChange={() => isAutoresume(!autoresume)}
        />
      </div>
      {isDesktop && (
        <div className="flex justify-between mt-3 w-full p-3 items-center md:rounded-md md:border max-md:space-y-1.5">
          <p>Fullscreen</p>
          <Checkbox
            className={cn("cursor-pointer", {
              "data-[state=checked]:bg-focus-primary": status === "focus",
              "data-[state=checked]:bg-short-break-primary":
                status === "shortBreak",
              "data-[state=checked]:bg-long-break-primary":
                status === "longBreak",
            })}
            checked={document.fullscreenElement !== null}
            onCheckedChange={
              document.fullscreenElement !== null
                ? handleExitFullscreen
                : handleEnterFullscreen
            }
          />
        </div>
      )}
    </div>
  );
}
