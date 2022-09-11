import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

// Init VK  Mini App
bridge.send("VKWebAppInit").then(r => r);
//const storage = await bridge.send("VKWebAppStorageGet").then(r => r).catch(e => console.log(e))
ReactDOM.render(<App />, document.getElementById("root"));

