import Timer from "@/components/timer";

export default function Home() {
  return (
    <Timer
      longBreakInterval={4}
      longBreakMinutes={15}
      minutes={25}
      seconds={0}
      shortBreakMinutes={5}
    />
  );
}
