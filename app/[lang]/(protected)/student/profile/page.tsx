import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLeft } from "@/components/ui/group-function-user";

const StudentProfilePage = () => {
  return (
    <>
      <div className="container flex bg-[#cccccccc] py-8 text-primary">
        <NavLeft />
      </div>
    </>
  );
};
export default StudentProfilePage;
