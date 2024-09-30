import { FormalLayout } from "$layouts/FormalLayout";
import { VehicleModel } from "$types/models/vehicle";
import { EditRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { FileEntry } from "@tauri-apps/api/fs";
import { FC, useState } from "react";
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

  const infoItems = [
    {
      label: "เลขที่รถรับส่ง",
      value: vehicle.id,
    },
    {
      label: "เลขทะเบียน",
      value: vehicle.license_plate,
    },
    {
      label: "จังหวัดที่จดทะเบียน",
      value: vehicle.registered_city,
    },
    {
      label: "ประเภทรถ",
      value: vehicle.vehicle_class,
    },
    {
      label: "หจก.",
      value: vehicle.vendor,
    },
  ].map((item) => ({
    label: item.label,
    value: <Typography>{item.value}</Typography>,
  }));

  infoItems.push({
    label: "คลังภาพ",
    value: (
      <BaseGallery
        dirPath={slotProps.gallery.dirPath}
        fileEntries={slotProps.gallery.fileEntries}
      />
    ),
  });

  return (
    <Stack spacing={1}>
      <Button
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
          vendorComboBox: {
            options: slotProps.form.vendorComboBox.options,
          },
        }}
      />
    </Stack>
  );
};
