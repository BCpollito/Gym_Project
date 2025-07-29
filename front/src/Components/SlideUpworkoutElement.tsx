import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { X, LayoutList, CirclePause } from "lucide-react";
import React, { useState, useEffect } from "react";
import { PropsModal } from "../types/propsModal";

export default function SlideUpworkoutElement({
  open,
  onClose,
  idworkout,
  modo,
}: PropsModal) {
  useEffect(() => {
    console.log(idworkout);
  }, []);

  return (
    <>
      <Dialog
        open={open}
        handler={onClose}
        animate={{
          mount: { y: 0 },
          unmount: { y: 500 },
        }}
        className="fixed bottom-0 left-0 w-full max-w-full m-0 rounded-t-2xl bg-white"
        style={{ maxHeight: "80vh", height: "auto" }}
      >
        <DialogHeader className="flex justify-between items-center w-full">
          <div className="w-10" />
          <div className="flex gap-1">
             {modo === "Bloque" && <LayoutList />}
              {modo === "Descanso" && <CirclePause/>}
            <Typography variant="h6" className="text-center flex-1">
              {modo === "Bloque" && "Añadir Bloque"}
              {modo === "Descanso" && "Añadir Descanso"}
            </Typography>
          </div>
          <IconButton
            size="sm"
            color="white"
            variant="filled"
            className="shadow-sm shadow-secondary rounded-full"
            onClick={onClose}
          >
            <X />
          </IconButton>
        </DialogHeader>

        <DialogBody className="w-full p-0 pb-4">
          <Typography variant="h4">Contenido...</Typography>
        </DialogBody>
      </Dialog>
    </>
  );
}
