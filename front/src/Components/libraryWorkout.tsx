import {
  Card,
  Input,
  Typography,
  CardBody,
  Button,
} from "@material-tailwind/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateWorkoutModal from "./CreateWorkoutModal";

const TABLE_HEAD = [
  {
    head: "Number",
  },
  {
    head: "Customer",
  },
  {
    head: "Amount",
  },
  {
    head: "Issued",
  },
  {
    head: "Payment Date",
  },
  {
    head: "opciones prolongadas",
  },
];

const TABLE_ROWS = [
  {
    number: "#MS-415646",
    customer: "Viking Burrito",
    amount: "$14,000",
    issued: "31 Jan 2024",
    date: "31 Feb 2024",
  },
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
    amount: "$3,000",
    issued: "24 Jan 2024",
    date: "24 Feb 2024",
  },
  {
    number: "#QW-103578",
    customer: "Fiber Notion",
    amount: "$20,000",
    issued: "12 Jan 2024",
    date: "12 Feb 2024",
  },
  {
    number: "#MS-415688",
    customer: "Blue Bird",
    amount: "$5,600",
    issued: "10 Jan 2024",
    date: "10 Feb 2024",
  },
  ,
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
    amount: "$3,000",
    issued: "24 Jan 2024",
    date: "24 Feb 2024",
  },
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
    amount: "$3,000",
    issued: "24 Jan 2024",
    date: "24 Feb 2024",
  },
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
    amount: "$3,000",
    issued: "24 Jan 2024",
    date: "24 Feb 2024",
  },

  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
    amount: "$3,000",
    issued: "24 Jan 2024",
    date: "24 Feb 2024",
  },
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
    amount: "$3,000",
    issued: "24 Jan 2024",
    date: "24 Feb 2024",
  },
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
    amount: "$3,000",
    issued: "24 Jan 2024",
    date: "24 Feb 2024",
  },
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
    amount: "$3,000",
    issued: "24 Jan 2024",
    date: "24 Feb 2024",
  },
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
    amount: "$3,000",
    issued: "24 Jan 2024",
    date: "24 Feb 2024",
  },
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
    amount: "$3,000",
    issued: "24 Jan 2024",
    date: "24 Feb 2024",
  },
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
    amount: "$3,000",
    issued: "24 Jan 2024",
    date: "24 Feb 2024",
  },
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
    amount: "$3,000",
    issued: "24 Jan 2024",
    date: "24 Feb 2024",
  },
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
    amount: "$3,000",
    issued: "24 Jan 2024",
    date: "24 Feb 2024",
  },
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
    amount: "$3,000",
    issued: "24 Jan 2024",
    date: "24 Feb 2024",
  },
  {
    number: "#RV-126749",
    customer: "Stone Tech Zone",
    amount: "$3,000",
    issued: "24 Jan 2024",
    date: "24 Feb 2024",
  },
];

export default function LibraryWorkout() {
  const [open, setOpen] = useState(false);

  const handleCreateWorkout = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="max-h-[77vh]">
      <div className="flex pb-2 gap-2 items-center pr-4 pl-4 pt-2">
        <Button
          onClick={handleCreateWorkout}
          color="amber"
          size="sm"
          className="flex items-center justify-center gap-3 rounded-full h-8"
        >
          <Plus strokeWidth={3} /> Crear workout
        </Button>

        <Input label="Buscar Workout por nombre" />
      </div>
      <Card className="h-full w-full sm:max-w-sm overflow-scroll ">
        <CardBody className="max-w-sm max-h-[72vh] h-full">
          <table className="overflow-scroll table-auto max-w-sm text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map(({ head }) => (
                  <th
                    key={head}
                    className="border-b border-gray-300 text-center"
                  >
                    <div className="flex items-center gap-1">
                      <Typography
                        color="blue-gray"
                        variant="small"
                        className="!font-bold"
                      >
                        {head}
                      </Typography>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                ({ number, customer, amount, issued, date }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-gray-300";

                  return (
                    <tr key={number}>
                      <td className={classes}>
                        <div className="flex items-center gap-1">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {number}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {customer}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {amount}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {issued}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {date}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <CreateWorkoutModal open={open} onClose={handleClose} />
    </div>
  );
}
