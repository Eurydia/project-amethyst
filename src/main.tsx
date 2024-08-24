import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "main.css";
import { injectStyle } from "react-toastify/dist/inject-style";

// Inject style, otherwise toast styling will break
injectStyle();

ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
