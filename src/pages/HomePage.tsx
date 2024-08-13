import {
	Button,
	Checkbox,
	FormControlLabel,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Toolbar,
	Tooltip,
	Typography,
	useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, ReactNode, useState } from "react";
import {
	Link,
	useSubmit,
} from "react-router-dom";
import { fakerTH } from "@faker-js/faker";
import { AttendanceChecklistWidget } from "../components/AttendanceChecklistWidget";
import { DailyRecordTableWidget } from "../components/DailyRecordTableWidget";

export const HomePage: FC = () => {
	return (
		<Stack spacing={2}>
			<DailyRecordTableWidget />
			<AttendanceChecklistWidget />
		</Stack>
	);
};
