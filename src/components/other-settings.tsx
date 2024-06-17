import { useTheme } from "@/components/theme-provider";
import { Switch } from "./ui/switch";
import { useTimer } from "@/store";
import { useMediaQuery } from "usehooks-ts";
import { Checkbox } from "./ui/checkbox";

export default function OtherSettings() {
  const { setTheme, theme } = useTheme();
  const {playTick,isPlayTick,focusMode,isFocusMode, showProgressbar, isShowProgressbar, isFullscreen} = useTimer((state) => state);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // is user presses f11



  const handleEnterFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
      isFullscreen(true);
    } else {
      console.log('An error occurred');
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
      <div className="flex justify-between  w-full p-3 items-center md:rounded-t-lg border-b border-x max-md:space-y-1.5">
      <p>Dark mode</p>
      <Switch
        className="cursor-pointer"
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </div>
    <div className="flex justify-between  w-full p-3 items-center border-b border-x max-md:space-y-1.5">
      <p>Play ticking sound</p>
      <Switch
        className="cursor-pointer"
        checked={playTick}
        onCheckedChange={() => isPlayTick(!playTick)}
      />
    </div>
    <div className="flex justify-between  w-full p-3 items-center border-b border-x max-md:space-y-1.5">
      <p>Show progressbar</p>
      <Switch
        className="cursor-pointer"
        checked={showProgressbar}
        onCheckedChange={() => isShowProgressbar(!showProgressbar)}
      />
    </div>
    <div className="flex justify-between  w-full p-3 items-center md:rounded-b-lg border-x border-b max-md:space-y-1.5">
      <p>Focus mode</p>
      <Switch
        className="cursor-pointer"
        checked={focusMode}
        onCheckedChange={() => isFocusMode(!focusMode)}
      />
      </div>
      {isDesktop && <div className="flex justify-between mt-3 w-full p-3 items-center md:rounded-lg border max-md:space-y-1.5">
      <p>Fullscreen</p>
      <Checkbox
        className="cursor-pointer"
        checked={
          document.fullscreenElement !== null
        }
        onCheckedChange={
          document.fullscreenElement !== null
            ? handleExitFullscreen
            : handleEnterFullscreen
        }
      />
      </div>}
    </div>
  );
}