import ArrowBack from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { useAppPageContextValue } from "../contexts/AppPageContext";
import { useCustomerById } from "../hooks";

function NewCustomerDetailsPage() {
  useAppPageContextValue({ title: "NEW CUSTOMER" });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const reset = useCallback(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setStreetAddress("");
    setCity("");
    setPostalCode("");
  }, []);

  const navigate = useNavigate();

  const [save, isPending] = useCustomerById(null);

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
        <Fab
          color="primary"
          sx={{ ml: 1 }}
          onClick={() => {
            save({
              city,
              email,
              firstname: firstName,
              lastname: lastName,
              phone,
              postcode: postalCode,
              streetaddress: streetAddress,
            });
          }}
        >
          <SaveIcon />
        </Fab>
        <Fab color="default" sx={{ ml: 1 }} onClick={reset}>
          <RefreshIcon />
        </Fab>
      </Box>
    </Box>
  );
}

export default NewCustomerDetailsPage;
