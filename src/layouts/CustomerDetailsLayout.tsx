import ArrowBack from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from '@mui/icons-material/Person';
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { Outlet, useMatch, useNavigate, useParams } from "react-router";
import { useAppPageContextValue } from "../contexts/AppPageContext";

function CustomerDetailsLayout() {
  const { id } = useParams();
  useAppPageContextValue({ title: `CUSTOMER ${id}` });
  const navigate = useNavigate();
  const isInTrainingView = !!useMatch({
    path: `/customers/${id}/trainings`,
    end: true,
  });

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Outlet />
      <Box
        sx={{
          position: "absolute",
          bottom: 1,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "var(--mui-zIndex-fab)",
        }}
      >
        <Fab color="default" onClick={() => navigate("/customers")}>
          <ArrowBack />
        </Fab>
        <Fab color="primary" sx={{ ml: 1 }}>
          <SaveIcon />
        </Fab>
        {!isInTrainingView ? (
          <Fab
            color="info"
            sx={{ ml: 1 }}
            onClick={() => navigate(`/customers/${id}/trainings`)}
          >
            <CalendarMonthIcon />
          </Fab>
        ) : (
          <Fab
            color="info"
            sx={{ ml: 1 }}
            onClick={() => navigate(`/customers/${id}`)}
          >
            <PersonIcon />
          </Fab>
        )}
      </Box>
    </Box>
  );
}

export default CustomerDetailsLayout;
