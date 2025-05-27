import { useEffect, useState } from "react";
import { createClient } from "./mqtt/createClient";

function App() {
  const [percentage, setPercentage] = useState(0);
  const [time, setTime] = useState(0);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const client = createClient();
    console.log(client);
    client.on("message", (topic, message) => {
      const messageAsString = message.toString();
      setTime(+messageAsString);
    });

    return () => {
      client.end();
    };
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setPercentage((prevPercentage) => {
  //       console.log(prevPercentage);
  //       if (prevPercentage >= 100) {
  //         clearInterval(interval);
  //         return 0;
  //       }
  //       return prevPercentage + 1;
  //     });
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col max-w-[80%]">
        <h1 className="text-3xl">
          Hello Vite! {import.meta.env.VITE_BACKEND_URL}
        </h1>
        {formatTime(time)}

        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
