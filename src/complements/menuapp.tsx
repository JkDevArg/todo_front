import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { Create, ListAltRounded, PlusOne } from "@mui/icons-material";
import SpringModal from "./modal";

const actions = [
  { icon: <Create />, name: "Create" },
  { icon: <ListAltRounded />, name: "List" },
];

export default function BasicSpeedDial() {
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  
  return (
    <Box>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 25, right: 25 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.name === "Create" ? handleOpenModal : undefined}
          />
        ))}
      </SpeedDial>
      <SpringModal isOpen={openModal} setOpen={setOpenModal} />
    </Box>
  );
}
