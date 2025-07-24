import {
  Card,
  Input,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";

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
  return (
    <div className="max-h-[75vh]">
      <Card className="h-full max-w-sm overflow-scroll ">
        <CardHeader
          floated={false}
          shadow={false}
          className="mb-2 rounded-none p-2"
        >
          <div className="w-full max-w-sm md:w-96 relative block">
            <Input label="Search Invoice" />
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll max-w-sm max-h-[65vh] h-full">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map(({ head }) => (
                  <th key={head} className="border-b border-gray-300 p-4">
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
    </div>
  );
}
