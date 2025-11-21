import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { useCallback, useState } from "react";
import { useParams } from "react-router";
import { useAppPageContextValue } from "../contexts/AppPageContext";
import { useCustomerById } from "../hooks";

function CustomerDetailsView() {
  const { id } = useParams();
  useAppPageContextValue({ title: `CUSTOMER ${id}` });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  
  const onLoaded = useCallback((customer: CustomerEntity) => {
    setFirstName(customer.city);
    setLastName(customer.lastname);
    setEmail(customer.email);
    setPhone(customer.phone);
    setStreetAddress(customer.streetaddress);
    setCity(customer.city);
    setPostalCode(customer.postcode);
  }, []);
  useCustomerById(Number(id), onLoaded);

  return (
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
        />
      </FormControl>
      <FormControl sx={{ flexBasis: "calc(50% - var(--mui-spacing))" }}>
        <InputLabel htmlFor="lastName">Last name</InputLabel>
        <Input
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ flexBasis: "calc(50% - var(--mui-spacing))" }}>
        <InputLabel htmlFor="email">E-mail</InputLabel>
        <Input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ flexBasis: "calc(50% - var(--mui-spacing))" }}>
        <InputLabel htmlFor="phone">Phone</InputLabel>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ flexBasis: "100%" }}>
        <InputLabel htmlFor="streetAddress">Street address</InputLabel>
        <Input
          id="streetAddress"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ flexBasis: "calc(50% - var(--mui-spacing))" }}>
        <InputLabel htmlFor="city">City</InputLabel>
        <Input
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ flexBasis: "calc(50% - var(--mui-spacing))" }}>
        <InputLabel htmlFor="postalCode">Postal code</InputLabel>
        <Input
          id="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </FormControl>
    </Box>
  );
}

export default CustomerDetailsView;
