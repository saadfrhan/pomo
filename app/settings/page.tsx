import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-2">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Configure your PomoProdigy experience!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="font-semibold">Adjust work session</div>
          <div className="font-semibold">Adjust break session</div>
          <div className="font-semibold">Adjust long break session</div>
          <hr />
          <div className="font-semibold">Auto-start breaks</div>
          <div className="font-semibold">Auto-start next session</div>
          <div className="font-semibold">Long break interval</div>
        </CardContent>
      </Card>
    </div>
  );
}
