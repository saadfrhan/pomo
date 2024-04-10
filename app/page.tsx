import Timer from "@/components/timer";

export default function Home({
  searchParams: { minutes = 25, seconds = 0, breakMinutes = 5 },
}: {
  searchParams: {
    minutes: number;
    seconds: number;
    breakMinutes: number;
  };
}) {
  return (
    <Timer minutes={minutes} seconds={seconds} breakMinutes={breakMinutes} />
  );
}
