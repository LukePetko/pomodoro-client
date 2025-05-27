import mqtt from "mqtt";

export const createClient = () => {
  console.log("createClient");
  const client = mqtt.connect(
    `ws://${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_MQTT_PORT}`,
  );

  client.on("connect", () => {
    client.subscribe("pomodoro/timer/#");
    console.log("connected");
  });

  return client;
};
