import { putDriver } from "$backend/database/put";
import { FormalLayout } from "$layouts/FormalLayout";
import { InfoGroupItemDefinition } from "$types/generics";
import { DriverModel } from "$types/models/driver";
import {
  EditRounded,
  SaveRounded,
} from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { FileEntry } from "@tauri-apps/api/fs";
import { FC, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseGallery } from "./BaseGallery";
import { DriverForm } from "./DriverForm";

type DriverInfoGroupProps = {
  driver: DriverModel;
  slotProps: {
    gallery: {
      dirPath: string;
      fileEntries: FileEntry[];
    };
  };
};
export const DriverInfoGroup: FC<DriverInfoGroupProps> = (
  props,
) => {
  const { driver, slotProps } = props;

  const [dialogOpen, setDialogOpen] = useState(false);
  const { revalidate } = useRevalidator();

  const infoItems: InfoGroupItemDefinition[] = [
    {
      label: "ชื่อสกุล",
      value: (
        <Typography>{`${driver.name} ${driver.surname}`}</Typography>
      ),
    },
    {
      label: "เบอร์ติดต่อ",
      value:
        driver.contact.trim().length === 0 ? (
          <Typography fontStyle="italic">ไม่มี</Typography>
        ) : (
          <Typography>{driver.contact}</Typography>
        ),
    },
    {
      label: "ประเภทใบขับขี่",
      value: driver.license_type,
    },
    {
      label: "รูปภาพ",
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
        onClick={() => setDialogOpen(true)}
        startIcon={<EditRounded />}
      >
        แก้ไขข้อมูล
      </Button>
      <FormalLayout>{infoItems}</FormalLayout>

      <DriverForm
        initFormData={{
          name: driver.name,
          surname: driver.surname,
          contact: driver.contact,
          licenseType: driver.license_type,
        }}
        title="แก้ไขข้อมูลคนขับรถ"
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        slotProps={{
          submitButton: {
            startIcon: <SaveRounded />,
            label: "บันทึกการเปลี่ยนแปลง",
            onClick: (formData) =>
              putDriver(driver.id, formData)
                .then(
                  () => {
                    toast.success("บันทึกสำเร็จ");
                    revalidate();
                  },
                  () => toast.error("บันทึกล้มเหลว"),
                )
                .finally(() => setDialogOpen(false)),
          },
        }}
      />
    </Stack>
  );
};
