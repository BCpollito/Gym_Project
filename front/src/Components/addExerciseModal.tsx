import {
  Input,
  Button,
  Dialog,
  Textarea,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { PropsModal } from "../types/propsModal";
import convertirLink from "../services/ConvertLink";
import React, { useState, useEffect } from "react";

export default function AddexerciseModal({ open, onClose }: PropsModal) {
  const [link, setlink] = useState<string | null>(null);
  const [convertedLink, setConvertedLink] = useState<string | null>(null);

  useEffect(() => {
    if (link) {
      const result = convertirLink(link);
      setConvertedLink(result);
    } else {
      setConvertedLink(null);
    }
  }, [link]);

  useEffect(() => {
    if (!open) {
      setlink(null);
    }
  }, [open])
  

  return (
    <>
      <Dialog size="sm" open={open} handler={onClose} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Añadir Ejercicio
          </Typography>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6 overflow-scroll">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Nombre
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="ej. Pull over"
              name="name"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Link (imagen o video)
            </Typography>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setlink(e.target.value)}
              color="gray"
              size="lg"
              placeholder="https://www.youtube.com/watch?v=example"
              name="name"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Descripcion (Opcional)
            </Typography>
            <Textarea
              rows={7}
              placeholder="ej. Ejercicio para espalda enfocado en dorsales..."
              className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
    {convertedLink === null && link ? (
      <Typography color="red" variant="h6">URL no válida</Typography>
    ) : convertedLink && convertedLink.includes("youtube.com/embed") ? (
      <iframe
        className="max-w-sm aspect-video"
        src={convertedLink}
        title="YouTube video"
        allowFullScreen
        controls
      />
    ) : convertedLink ? (
      <img className="max-w-sm" src={convertedLink} alt="Imagen de ejercicio" />
    ) : null}
  </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto">Add Product</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
