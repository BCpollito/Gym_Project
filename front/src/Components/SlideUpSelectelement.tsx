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
import { PropsModal } from "../types/PropsModal";
import SlideUpworkoutElement from "./SlideUpworkoutElement";

export default function SlideUpSelectelement({
  open,
  onClose,
  idworkout,
  refresh,
  elementorder,
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
      {/*// @ts-ignore*/}
      <Dialog
        open={open}
        handler={onClose}
        animate={{
          mount: { y: 0 },
          unmount: { y: 500 },
        }}
        className="fixed bottom-0 w-full max-w-full m-0 rounded-t-2xl bg-white"
        style={{ height: "30%" }}
      >
        {/*// @ts-ignore*/}
        <DialogHeader className="flex justify-between items-center w-full">
          <div className="w-10" />
          {/*// @ts-ignore*/}
          <Typography variant="h6" className="text-center flex-1">
            Añadir nuevo...
          </Typography>
          {/*// @ts-ignore*/}
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
        {/*// @ts-ignore*/}
        <DialogBody className="w-full p-0 pb-4">
          {/*// @ts-ignore*/}
          <List className="p-0 w-full">
            {/*// @ts-ignore*/}
            <ListItem onClick={handleElement} className="pl-5">
              {/*// @ts-ignore*/}
              <ListItemPrefix>
                <LayoutList />
              </ListItemPrefix>
              Bloque
            </ListItem>
            {/*// @ts-ignore*/}
            <ListItem onClick={handleElement} className="pl-5">
              {/*// @ts-ignore*/}
              <ListItemPrefix>
                <CirclePause />
              </ListItemPrefix>
              Descanso
            </ListItem>
          </List>
        </DialogBody>
      </Dialog>
      {openElement === true &&
         <SlideUpworkoutElement
        open={openElement}
        onClose={() => setopenElement(false)}
        idworkout={idworkout}
        elementorder={elementorder}
        modo={modo === "Bloque" ? "Bloque" : "Descanso"}
        refresh={refresh}
      />
      }     
    </>
  );
}
