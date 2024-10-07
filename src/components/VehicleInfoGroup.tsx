import { FormalLayout } from "$layouts/FormalLayout";
import { VehicleModel } from "$types/models/vehicle";
import { EditRounded } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { FileEntry } from "@tauri-apps/api/fs";
import { FC, ReactNode, useState } from "react";
import { BaseGallery } from "./BaseGallery";
import { VehicleForm } from "./VehicleForm";

type VehicleInfoGroupProps = {
  vehicle: VehicleModel;
  slotProps: {
    form: {
      vendorComboBox: { options: string[] };
    };
    gallery: {
      fileEntries: FileEntry[];
      dirPath: string;
    };
  };
};
export const VehicleInfoGroup: FC<VehicleInfoGroupProps> = (
  props
) => {
  const { vehicle, slotProps } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const infoItems: { label: string; value: ReactNode }[] = [
    {
      label: "เลขทะเบียน",
      value: vehicle.license_plate,
    },
    {
      label: "ประเภท",
      value: vehicle.vehicle_class,
    },
    {
      label: "หจก.",
      value: vehicle.vendor,
    },
    {
      label: "จังหวัดที่จดทะเบียน",
      value: vehicle.registered_city,
    },
    {
      label: "คลังภาพ",
      value: (
        <BaseGallery
          dirPath={slotProps.gallery.dirPath}
          fileEntries={slotProps.gallery.fileEntries}
        />
      ),
    },
  ];

  return (
    <Stack spacing={1}>
      <Button
        variant="contained"
        startIcon={<EditRounded />}
        onClick={() => setDialogOpen(true)}
      >
        แก้ไขข้อมูล
      </Button>
      <FormalLayout>{infoItems}</FormalLayout>
      <VehicleForm
        editing
        vehicle={vehicle}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        slotProps={{
          vendorComboBox: slotProps.form.vendorComboBox,
        }}
      />
    </Stack>
  );
};
