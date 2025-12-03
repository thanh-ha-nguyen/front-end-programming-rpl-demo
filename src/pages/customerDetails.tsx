import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import InsightsIcon from "@mui/icons-material/Insights";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonIcon from "@mui/icons-material/Person";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CustomerInfoEditView from "../components/CustomerInfoEditView";
import NotImplemented from "../components/NotImplemented";
import TrainingEditView from "../components/TrainingEditView";
import { useCustomerById, useTrainingsByCustomerId } from "../hooks";
import "./customerDetails.css";

type CurrentView = "basicInfo" | "trainings" | "statistics";

function CustomerDetailsPage() {
  const { id: idParam } = useParams();
  const id =
    idParam === null || idParam === undefined || isNaN(Number(idParam))
      ? null
      : Number(idParam);

  const [currentView, setCurrentView] = useState<CurrentView>("basicInfo");

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const handleOpenDeleteConfirmationDialog = useCallback(() => {
    setDeleteConfirmationOpen(true);
  }, []);
  const handleCloseDeleteConfirmationDialog = useCallback(() => {
    setDeleteConfirmationOpen(false);
  }, []);

  const [dirty, setDirty] = useState(false);

  const [saveConfirmationOpen, setSaveConfirmationOpen] = useState(false);
  const handleOpenSaveConfirmationDialog = useCallback(() => {
    setSaveConfirmationOpen(true);
  }, []);
  const handleCloseSaveConfirmationDialog = useCallback(() => {
    setSaveConfirmationOpen(false);
  }, []);

  const [newTrainingDialogOpen, setNewTrainingDialogOpen] = useState(false);
  const handleOpenNewTrainingDialog = useCallback(() => {
    setNewTrainingDialogOpen(true);
  }, []);
  const handleCloseTrainingEditDialog = useCallback(() => {
    setNewTrainingDialogOpen(false);
    requestAnimationFrame(() => setTrainingEditState({}));
  }, []);

  const navigate = useNavigate();

  const [save, isPending, customer, reload, remove] = useCustomerById(id);
  const [customerEditState, setCustomerEditState] =
    useState<Partial<Customer> | null>(customer);
  useEffect(() => {
    setCustomerEditState(customer);
    setDirty(false);
  }, [customer]);

  const [trainings, addTraining, removeTraining] = useTrainingsByCustomerId(id);
  const [trainingEditState, setTrainingEditState] = useState<
    Partial<TrainingEntity>
  >({});
  const isNewTraining = !trainingEditState.id;

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      {currentView === "basicInfo" && (
        <CustomerInfoEditView
          readonly={isPending}
          value={customerEditState}
          onChange={(value) => {
            setCustomerEditState((state) => ({ ...state, ...value }));
            setDirty(true);
          }}
        />
      )}
      {currentView === "trainings" && (
        <FullCalendar
          plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next,today",
            center: "title",
            right: "dayGridYear,timeGridWeek,timeGridDay",
          }}
          selectable
          events={trainings.map(({ id, activity, date, duration }) => ({
            id: String(id),
            title: activity,
            start: date,
            end: new Date(new Date(date).getTime() + duration * 60000),
          }))}
          select={({ start, end }) => {
            setTrainingEditState({
              date: start,
              duration: Math.round((end?.getTime() - start.getTime()) / 60000),
            });
            handleOpenNewTrainingDialog();
          }}
          eventClick={({ event }) => {
            if (!event.start) return;

            setTrainingEditState({
              id: Number.parseInt(event.id),
              date: event.start,
              duration:
                event.end === null
                  ? undefined
                  : Math.round(
                      (event.end.getTime() - event.start.getTime()) / 60000
                    ),
            });
            handleOpenNewTrainingDialog();
          }}
        />
      )}
      {currentView === "statistics" && <NotImplemented />}
      <Box
        sx={{
          position: "absolute",
          bottom: "calc(2 * var(--mui-spacing))",
          left: "var(--mui-spacing)",
          zIndex: "var(--mui-zIndex-fab)",
        }}
      >
        <Fab
          color="default"
          onClick={() => {
            if (dirty) {
              handleOpenSaveConfirmationDialog();
            } else {
              navigate("/customers");
            }
          }}
        >
          <ArrowBackIcon />
        </Fab>
      </Box>
      {currentView === "basicInfo" && (
        <Box
          sx={{
            position: "absolute",
            bottom: "calc(2 * var(--mui-spacing))",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "var(--mui-zIndex-fab)",
          }}
        >
          <Fab
            color="error"
            sx={{ ml: 1 }}
            onClick={handleOpenDeleteConfirmationDialog}
          >
            <DeleteIcon />
          </Fab>
          <Fab
            color="primary"
            sx={{ ml: 1 }}
            onClick={() => {
              if (customerEditState) save(customerEditState);
              setDirty(false);
            }}
          >
            <SaveIcon />
          </Fab>
          <Fab
            color="default"
            sx={{ ml: 1 }}
            onClick={() => {
              reload();
              setDirty(false);
            }}
          >
            <RefreshIcon />
          </Fab>
        </Box>
      )}
      <Box
        sx={{
          position: "absolute",
          bottom: "calc(2 * var(--mui-spacing))",
          right: "var(--mui-spacing)",
          zIndex: "var(--mui-zIndex-fab)",
        }}
      >
        <SpeedDial
          ariaLabel="Choose view mode"
          icon={
            <SpeedDialIcon
              icon={
                currentView === "basicInfo" ? (
                  <PersonIcon />
                ) : currentView === "trainings" ? (
                  <CalendarMonthIcon />
                ) : (
                  <InsightsIcon />
                )
              }
              openIcon={<KeyboardArrowUpIcon />}
            />
          }
        >
          <SpeedDialAction
            icon={<PersonIcon />}
            slotProps={{
              tooltip: { title: "Basic info" },
            }}
            onClick={() => setCurrentView("basicInfo")}
          />
          <SpeedDialAction
            icon={<CalendarMonthIcon />}
            slotProps={{
              tooltip: { title: "Training schedule" },
            }}
            onClick={() => {
              if (dirty) {
                handleOpenSaveConfirmationDialog();
              } else {
                setCurrentView("trainings");
              }
            }}
          />
          <SpeedDialAction
            icon={<InsightsIcon />}
            slotProps={{
              tooltip: { title: "Statistics" },
            }}
            onClick={() => {
              if (dirty) {
                handleOpenSaveConfirmationDialog();
              } else {
                setCurrentView("statistics");
              }
            }}
          />
        </SpeedDial>
      </Box>
      <Dialog open={deleteConfirmationOpen}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this customer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseDeleteConfirmationDialog();
              remove();
            }}
          >
            Yes
          </Button>
          <Button onClick={handleCloseDeleteConfirmationDialog} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={saveConfirmationOpen}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            There are unsaved changes. Do you want to save?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseSaveConfirmationDialog();
              if (customerEditState) save(customerEditState);
              setDirty(false);
            }}
            autoFocus
          >
            Yes
          </Button>
          <Button onClick={handleCloseSaveConfirmationDialog}>No</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={newTrainingDialogOpen}>
        <DialogTitle>
          {isNewTraining
            ? "New Training"
            : `Training: ${trainingEditState.activity || "Untitled"}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of the activity below
          </DialogContentText>
          <TrainingEditView
            readonly={!isNewTraining}
            value={trainingEditState}
            onChange={(value) => {
              setTrainingEditState({ ...trainingEditState, ...value });
            }}
          />
        </DialogContent>
        <DialogActions>
          {trainingEditState.id !== undefined && (
            <Button
              color="error"
              onClick={() => {
                removeTraining(trainingEditState.id!);
                handleCloseTrainingEditDialog();
              }}
              sx={{ mr: "auto" }}
            >
              Delete
            </Button>
          )}
          {isNewTraining && (
            <Button
              color="primary"
              onClick={() => {
                addTraining(trainingEditState);
                handleCloseTrainingEditDialog();
              }}
            >
              Save
            </Button>
          )}
          <Button onClick={handleCloseTrainingEditDialog}>
            {isNewTraining ? "Cancel" : "Close"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CustomerDetailsPage;
