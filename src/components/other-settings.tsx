import { useTheme } from "@/components/theme-provider";
import { Switch } from "./ui/switch";
import { useTimer } from "@/store";
import { useMediaQuery } from "usehooks-ts";

export default function OtherSettings() {
  const { setTheme, theme } = useTheme();
  const {playTick,isPlayTick,focusMode,isFocusMode, fullscreen, isFullscreen} = useTimer((state) => state);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div>
      <div className="flex justify-between  w-full p-3 items-center rounded-t-lg border max-md:flex-col max-md:space-y-1.5">
      <p>Dark mode</p>
      <Switch
        className="cursor-pointer"
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </div>
    <div className="flex justify-between  w-full p-3 items-center border-b border-x max-md:flex-col max-md:space-y-1.5">
      <p>Play ticking sound</p>
      <Switch
        className="cursor-pointer"
        checked={playTick}
        onCheckedChange={() => isPlayTick(!playTick)}
      />
    </div>
    <div className="flex justify-between  w-full p-3 items-center rounded-b-lg border-x border-b max-md:flex-col max-md:space-y-1.5">
      <p>Focus mode</p>
      <Switch
        className="cursor-pointer"
        checked={focusMode}
        onCheckedChange={() => isFocusMode(!focusMode)}
      />
      </div>
      {isDesktop && <div className="flex justify-between mt-3 w-full p-3 items-center rounded-lg border max-md:flex-col max-md:space-y-1.5">
      <p>Fullscreen</p>
      <Switch
        className="cursor-pointer"
        checked={fullscreen}
        onCheckedChange={() => {
          isFullscreen(!fullscreen);
          if (!fullscreen) {
            requestFullScreen(document.documentElement);
          } else {
            document.exitFullscreen();
          }

        }}
      />
      </div>}
    </div>
  );
}


function requestFullScreen(element: HTMLElement) {
  // Supports most browsers and their versions.
  const requestMethod = element.requestFullscreen;

  if (requestMethod) { // Native full screen.
      requestMethod.call(element);
  }
}