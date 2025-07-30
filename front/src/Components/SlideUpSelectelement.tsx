import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";
import { X, LayoutList, CirclePause } from "lucide-react";
import { PropsModal } from "../types/propsModal";
import SlideUpworkoutElement from "./SlideUpworkoutElement";

export default function SlideUpSelectelement({
  open,
  onClose,
  idworkout,
}: PropsModal) {
  const [openElement, setopenElement] = useState(false);
  const [modo, setmodo] = useState<string | null>(null);

  const handleElement = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.currentTarget.innerText;
    setmodo(element);
    setopenElement(true);
    onClose();
    console.log("Texto seleccionado:", element);
  };

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
          <Typography variant="h6" className="text-center flex-1">
            Añadir nuevo...
          </Typography>
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
          <List className="p-0 w-full">
            <ListItem onClick={handleElement} className="pl-5">
              <ListItemPrefix>
                <LayoutList />
              </ListItemPrefix>
              Bloque
            </ListItem>
            <ListItem onClick={handleElement} className="pl-5">
              <ListItemPrefix>
                <CirclePause />
              </ListItemPrefix>
              Descanso
            </ListItem>
          </List>
        </DialogBody>
      </Dialog>
      <SlideUpworkoutElement
        open={openElement}
        onClose={() => setopenElement(false)}
        idworkout={idworkout}
        modo={modo === "Bloque" ? "Bloque" : "Descanso"}
      />
    </>
  );
}
