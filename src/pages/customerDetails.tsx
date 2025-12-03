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
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import NotImplemented from "../components/NotImplemented";
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

  const navigate = useNavigate();

  const [save, isPending, customer, reload, remove] = useCustomerById(id);
  const [customerEditState, setCustomerEditState] =
    useState<Partial<Customer> | null>(customer);
  useEffect(() => {
    setCustomerEditState(customer);
    setDirty(false);
  }, [customer]);

  const [trainings] = useTrainingsByCustomerId(id);

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      {currentView === "basicInfo" && (
        <BasicInfoView
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
            end: new Date(date.getTime() + duration * 60 * 1000),
          }))}
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
    </Box>
  );
}

export default CustomerDetailsPage;

interface BasicInfoViewProps {
  readonly?: boolean;
  value?: Partial<Customer> | null;
  onChange?: (value: Partial<Customer>) => unknown;
}

const BasicInfoView: React.FC<BasicInfoViewProps> = ({
  readonly = false,
  value = null,
  onChange,
}) => {
  const [firstName, setFirstName] = useState(value?.firstname || "");
  const [lastName, setLastName] = useState(value?.lastname || "");
  const [email, setEmail] = useState(value?.email || "");
  const [phone, setPhone] = useState(value?.phone || "");
  const [streetAddress, setStreetAddress] = useState(
    value?.streetaddress || ""
  );
  const [city, setCity] = useState(value?.city || "");
  const [postalCode, setPostalCode] = useState(value?.postcode || "");

  useEffect(() => {
    if (value === null) return;

    setFirstName(value?.firstname || "");
    setLastName(value?.lastname || "");
    setEmail(value?.email || "");
    setPhone(value?.phone || "");
    setStreetAddress(value?.streetaddress || "");
    setCity(value?.city || "");
    setPostalCode(value?.postcode || "");
  }, [value]);

  return (
    <Box sx={{ height: "100%", overflow: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "space-between",
          gap: 2,
          mt: 2,
        }}
      >
        <FormControl sx={{ flexBasis: "calc(50% - var(--mui-spacing))" }}>
          <InputLabel htmlFor="firstName">First name</InputLabel>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() => onChange?.({ firstname: firstName })}
            readOnly={readonly}
            inputProps={{
              style: {
                marginInlineStart: "14px",
                marginInlineEnd: "14px",
              },
            }}
          />
        </FormControl>
        <FormControl sx={{ flexBasis: "calc(50% - var(--mui-spacing))" }}>
          <InputLabel htmlFor="lastName">Last name</InputLabel>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={() => onChange?.({ lastname: lastName })}
            readOnly={readonly}
            inputProps={{
              style: {
                marginInlineStart: "14px",
                marginInlineEnd: "14px",
              },
            }}
          />
        </FormControl>
        <FormControl sx={{ flexBasis: "calc(50% - var(--mui-spacing))" }}>
          <InputLabel htmlFor="email">E-mail</InputLabel>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => onChange?.({ email })}
            readOnly={readonly}
            inputProps={{
              style: {
                marginInlineStart: "14px",
                marginInlineEnd: "14px",
              },
            }}
          />
        </FormControl>
        <FormControl sx={{ flexBasis: "calc(50% - var(--mui-spacing))" }}>
          <InputLabel htmlFor="phone">Phone</InputLabel>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => onChange?.({ phone })}
            readOnly={readonly}
            inputProps={{
              style: {
                marginInlineStart: "14px",
                marginInlineEnd: "14px",
              },
            }}
          />
        </FormControl>
        <FormControl sx={{ flexBasis: "100%" }}>
          <InputLabel htmlFor="streetAddress">Street address</InputLabel>
          <Input
            id="streetAddress"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            onBlur={() => onChange?.({ streetaddress: streetAddress })}
            readOnly={readonly}
            inputProps={{
              style: {
                marginInlineStart: "14px",
                marginInlineEnd: "14px",
              },
            }}
          />
        </FormControl>
        <FormControl sx={{ flexBasis: "calc(50% - var(--mui-spacing))" }}>
          <InputLabel htmlFor="city">City</InputLabel>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onBlur={() => onChange?.({ city })}
            readOnly={readonly}
            inputProps={{
              style: {
                marginInlineStart: "14px",
                marginInlineEnd: "14px",
              },
            }}
          />
        </FormControl>
        <FormControl sx={{ flexBasis: "calc(50% - var(--mui-spacing))" }}>
          <InputLabel htmlFor="postalCode">Postal code</InputLabel>
          <Input
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            onBlur={() => onChange?.({ postcode: postalCode })}
            readOnly={readonly}
            inputProps={{
              style: {
                marginInlineStart: "14px",
                marginInlineEnd: "14px",
              },
            }}
          />
        </FormControl>
      </Box>
    </Box>
  );
};
