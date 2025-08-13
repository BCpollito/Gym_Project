import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Collapse,
  Chip,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { Dumbbell, CalendarDays, List as ListIcon, X } from "lucide-react";
import { useState } from "react";

export default function LibraryNavigation() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((cur) => !cur);
  const navigate = useNavigate();

  const handleLinkWorkout = () => {
    navigate("/admin/libreria/activity/exercises");
    setOpen(false);
  };

  const handleLinkPograms = () => {};

  return (
    <>
      <div className="fixed top-0 left-0 w-full px-4 py-0 bg-white shadow z-50">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-lg font-semibold text-gray-800">Librería</h1>
          {/*// @ts-ignore*/}
          <IconButton
            ripple={false}
            onClick={toggleOpen}
            className="hover:bg-transparent"
            variant="text"
            size="md"
          >
            {open ? (
              <X className="h-8 w-8" />
            ) : (
              <ListIcon className="h-8 w-8" />
            )}
          </IconButton>
        </div>
        <Collapse open={open}>
        {/*// @ts-ignore*/}
          <List>
            {/*// @ts-ignore*/}
            <ListItem
              onClick={handleLinkWorkout}
              className="justify-center text-center text-gray-500"
            >
              {/*// @ts-ignore*/}
              <ListItemPrefix>
                <Dumbbell className="h-4 w-4" />
              </ListItemPrefix>
              {/*// @ts-ignore*/}
              <Typography className="text-sm">Actividades</Typography>
            </ListItem>
            {/*// @ts-ignore*/}
            <ListItem
              onClick={handleLinkPograms}
              className="justify-center text-center text-gray-500"
            >
              {/*// @ts-ignore*/}
              <ListItemPrefix>
                <CalendarDays className="h-4 w-4" />
              </ListItemPrefix>
              {/*// @ts-ignore*/}
              <Typography className="text-sm">Programas</Typography>
            </ListItem>
          </List>
        </Collapse>
      </div>
    </>
  );
}
