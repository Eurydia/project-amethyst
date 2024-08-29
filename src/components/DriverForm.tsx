import { DriverFormData } from "$types/form-data";
import { AddRounded } from "@mui/icons-material";
import {
	alpha,
	Grid,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { DriverLicenseSelect } from "./DriverLicenseSelect";
import { TypographyButton } from "./TypographyButton";

type DriverFormProps = {
	initFormData: DriverFormData;
	onSubmit: (formData: DriverFormData) => void;
	onCancel: () => void;
};
export const DriverForm: FC<DriverFormProps> = (
	props,
) => {
	const { initFormData, onCancel, onSubmit } =
		props;

	const [fieldName, setFieldName] = useState(
		initFormData.name,
	);
	const [fieldSurname, setFielSurname] = useState(
		initFormData.surname,
	);
	const [fieldContact, setFieldContact] =
		useState(initFormData.contact);
	const [fieldLicenseType, setFieldLicenseType] =
		useState(initFormData.license_type);

	const handleSubmit = () => {
		if (isFormIncomplete) {
			return;
		}
		const formData: DriverFormData = {
			name: fieldName.trim().normalize(),
			surname: fieldSurname.trim().normalize(),
			contact: fieldContact.trim().normalize(),
			license_type: fieldLicenseType,
		};
		onSubmit(formData);
	};

	const handleCancel = () => onCancel();

	const missingFieldName =
		fieldName.trim().normalize() === "";
	const missingFieldLastName =
		fieldSurname.trim().normalize() === "";

	const isFormIncomplete =
		missingFieldName || missingFieldLastName;

	const formItems: {
		label: string;
		value: ReactNode;
	}[] = [
		{
			label: "ชื่อ",
			value: (
				<TextField
					fullWidth
					autoFocus
					error={missingFieldName}
					value={fieldName}
					onChange={(e) =>
						setFieldName(e.target.value)
					}
					placeholder={initFormData.name}
				/>
			),
		},
		{
			label: "นามสกุล",
			value: (
				<TextField
					fullWidth
					error={missingFieldLastName}
					value={fieldSurname}
					onChange={(e) =>
						setFielSurname(e.target.value)
					}
					placeholder={initFormData.surname}
				/>
			),
		},
		{
			label: "เบอร์ติดต่อ",
			value: (
				<TextField
					fullWidth
					placeholder={initFormData.contact}
					value={fieldContact}
					onChange={(e) =>
						setFieldContact(e.target.value)
					}
				/>
			),
		},
		{
			label: "ประเภทใบขับขี่",
			value: (
				<DriverLicenseSelect
					value={fieldLicenseType}
					onChange={setFieldLicenseType}
				/>
			),
		},
	];
	const renderedFormItems = formItems.map(
		(item, index) => (
			<Grid
				key={"form-item" + index}
				container
				item
				paddingY={1}
				sx={{
					backgroundColor: ({ palette }) =>
						alpha(
							index % 2 === 1
								? palette.primary.light
								: palette.common.white,
							0.05,
						),
				}}
			>
				<Grid
					item
					xs={12}
					sm={3}
					display="flex"
					alignItems="center"
				>
					<Typography
						fontWeight="bold"
						width={200}
					>
						{item.label}
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					sm={8}
				>
					{item.value}
				</Grid>
			</Grid>
		),
	);

	return (
		<Grid container>
			{renderedFormItems}
			<Grid
				item
				xs={12}
				paddingY={1}
			>
				<Stack
					spacing={1}
					flexDirection="row"
					flexWrap="wrap"
					useFlexGap
				>
					<TypographyButton
						disabled={isFormIncomplete}
						startIcon={<AddRounded />}
						variant="contained"
						onClick={handleSubmit}
					>
						ลงทะเบียน
					</TypographyButton>
					<TypographyButton
						variant="outlined"
						onClick={handleCancel}
					>
						ยกเลิก
					</TypographyButton>
				</Stack>
			</Grid>
		</Grid>
	);
};
