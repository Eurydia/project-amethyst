import {
	CssBaseline,
	ThemeProvider,
} from "@mui/material";
import {
	AdapterOptions,
	FieldFormatTokenMap,
	LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/th";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { routes } from "./routes";
import { theme } from "./theme";

const tokenMapping: FieldFormatTokenMap = {
	// Year
	BB: "year",
	BBBB: {
		sectionType: "year",
		contentType: "digit",
		maxLength: 4,
	},

	// Month
	M: {
		sectionType: "month",
		contentType: "digit",
		maxLength: 2,
	},
	MM: "month",
	MMM: {
		sectionType: "month",
		contentType: "letter",
	},
	MMMM: {
		sectionType: "month",
		contentType: "letter",
	},

	// Day of the month
	D: {
		sectionType: "day",
		contentType: "digit",
		maxLength: 2,
	},
	DD: "day",
	Do: {
		sectionType: "day",
		contentType: "digit-with-letter",
	},

	// Day of the week
	d: {
		sectionType: "weekDay",
		contentType: "digit",
		maxLength: 2,
	},
	dd: {
		sectionType: "weekDay",
		contentType: "letter",
	},
	ddd: {
		sectionType: "weekDay",
		contentType: "letter",
	},
	dddd: {
		sectionType: "weekDay",
		contentType: "letter",
	},

	// Meridiem
	A: "meridiem",
	a: "meridiem",

	// Hours
	H: {
		sectionType: "hours",
		contentType: "digit",
		maxLength: 2,
	},
	HH: "hours",
	h: {
		sectionType: "hours",
		contentType: "digit",
		maxLength: 2,
	},
	hh: "hours",

	// Minutes
	m: {
		sectionType: "minutes",
		contentType: "digit",
		maxLength: 2,
	},
	mm: "minutes",

	// Seconds
	s: {
		sectionType: "seconds",
		contentType: "digit",
		maxLength: 2,
	},
	ss: "seconds",
};

class CustomAdapter extends AdapterDayjs {
	formatTokenMap = tokenMapping;
	constructor(
		init: AdapterOptions<string, never>,
	) {
		super(init);
	}
}

export const App = () => {
	return (
		<LocalizationProvider
			dateAdapter={CustomAdapter}
			adapterLocale="th"
		>
			<ToastContainer
				icon={false}
				autoClose={2750}
			/>
			<ThemeProvider theme={theme}>
				<CssBaseline enableColorScheme />
				<RouterProvider router={routes} />
			</ThemeProvider>
		</LocalizationProvider>
	);
};
