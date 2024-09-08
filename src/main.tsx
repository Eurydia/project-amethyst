import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/sarabun/100.css";
import "@fontsource/sarabun/200.css";
import "@fontsource/sarabun/300.css";
import "@fontsource/sarabun/400.css";
import "@fontsource/sarabun/500.css";
import "@fontsource/sarabun/600.css";
import "@fontsource/sarabun/700.css";
import "@fontsource/sarabun/800.css";
import dayjs from "dayjs";
import dayjsBuddistEra from "dayjs/plugin/buddhistEra";
import dayjsRelativeTime from "dayjs/plugin/relativeTime";
import "main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { injectStyle } from "react-toastify/dist/inject-style";
import { App } from "./app/App";

dayjs.extend(dayjsRelativeTime);
dayjs.extend(dayjsBuddistEra);

// Inject style, otherwise toast styling will break
injectStyle();

ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
