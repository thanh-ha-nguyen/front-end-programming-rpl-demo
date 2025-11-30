import ArrowBack from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useCustomerById } from "../hooks";

function CustomerDetailsPage() {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const navigate = useNavigate();

  const [save, isPending, customer, reload, remove] = useCustomerById(
    id === null || id === undefined || isNaN(Number(id)) ? null : Number(id)
  );

  useEffect(() => {
    if (customer === null) return;

    setFirstName(customer.firstname);
    setLastName(customer.lastname);
    setEmail(customer.email);
    setPhone(customer.phone);
    setStreetAddress(customer.streetaddress);
    setCity(customer.city);
    setPostalCode(customer.postcode);
  }, [customer]);

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Box sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "space-between",
            gap: 2,
          }}
        >
          <FormControl sx={{ flexBasis: "calc(50% - var(--mui-spacing))" }}>
            <InputLabel htmlFor="firstName">First name</InputLabel>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              readOnly={isPending}
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
              readOnly={isPending}
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
              readOnly={isPending}
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
              readOnly={isPending}
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
              readOnly={isPending}
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
              readOnly={isPending}
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
              readOnly={isPending}
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
      <Box
        sx={{
          position: "absolute",
          bottom: "calc(2 * var(--mui-spacing))",
          left: "0px",
          zIndex: "var(--mui-zIndex-fab)",
        }}
      >
        <Fab color="default" onClick={() => navigate("/customers")}>
          <ArrowBack />
        </Fab>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "calc(2 * var(--mui-spacing))",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "var(--mui-zIndex-fab)",
        }}
      >
        <Fab color="error" sx={{ ml: 1 }} onClick={remove}>
          <DeleteIcon />
        </Fab>
        <Fab
          color="primary"
          sx={{ ml: 1 }}
          onClick={() =>
            save({
              city,
              email,
              firstname: firstName,
              lastname: lastName,
              phone,
              postcode: postalCode,
              streetaddress: streetAddress,
            })
          }
        >
          <SaveIcon />
        </Fab>
        <Fab color="default" sx={{ ml: 1 }} onClick={reload}>
          <RefreshIcon />
        </Fab>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "calc(2 * var(--mui-spacing))",
          right: "0px",
          zIndex: "var(--mui-zIndex-fab)",
        }}
      >
        <Fab
          color="info"
          sx={{ ml: 1 }}
          onClick={() => navigate(`/customers/${id}/trainings`)}
        >
          <CalendarMonthIcon />
        </Fab>
      </Box>
    </Box>
  );
}

export default CustomerDetailsPage;
