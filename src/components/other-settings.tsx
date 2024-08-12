import { useTheme } from "@/components/theme-provider";
import { Switch } from "./ui/switch";
import { useTimer } from "@/store";
import { useMediaQuery } from "usehooks-ts";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

export default function OtherSettings({ status }: { status: string }) {
  const { setTheme, theme } = useTheme();
  const {
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
      <div className="flex justify-between  w-full pb-3 items-center max-md:space-y-1.5">
        <p>Dark mode</p>
        <Switch
          className={cn("cursor-pointer", {
            "data-[state=checked]:bg-focus-primary data-[state=unchecked]:bg-checkbox-focus-off":
              status === "focus",
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
      <div className="flex justify-between  w-full pb-3 items-center max-md:space-y-1.5">
        <p>Show progressbar</p>
        <Switch
          className={cn("cursor-pointer", {
            "data-[state=checked]:bg-focus-primary data-[state=unchecked]:bg-checkbox-focus-off":
              status === "focus",
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
      <div className="flex justify-between  w-full pb-3 items-center max-md:space-y-1.5">
        <p>Focus mode</p>
        <Switch
          className={cn("cursor-pointer", {
            "data-[state=checked]:bg-focus-primary data-[state=unchecked]:bg-checkbox-focus-off":
              status === "focus",
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
      <div className="flex justify-between  w-full pb-3 items-center max-md:space-y-1.5">
        <p>Extrabold time weight</p>
        <Switch
          className={cn("cursor-pointer", {
            "data-[state=checked]:bg-focus-primary data-[state=unchecked]:bg-checkbox-focus-off":
              status === "focus",
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
      <div className="flex justify-between  w-full pb-3 items-center max-md:space-y-1.5">
        <p>Autoresume</p>
        <Switch
          className={cn("cursor-pointer", {
            "data-[state=checked]:bg-focus-primary data-[state=unchecked]:bg-checkbox-focus-off":
              status === "focus",
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
        <div className="flex justify-between w-full pb-3 items-center max-md:space-y-1.5">
          <p>Fullscreen</p>
          <Checkbox
            className={cn("cursor-pointer data-[state=checked]:border-none", {
              "data-[state=checked]:bg-focus-primary data-[state=checked]:text-white data-[state=unchecked]:border-checkbox-focus-off":
                status === "focus",
              "data-[state=checked]:bg-short-break-primary data-[state=checked]:text-white data-[state=unchecked]:border-checkbox-short-break-off":
                status === "shortBreak",
              "data-[state=checked]:bg-long-break-primary data-[state=checked]:text-white data-[state=unchecked]:border-checkbox-long-break-off":
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
