import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import React, { useEffect, useState } from "react";

interface CustomerInfoEditViewProps {
  readonly?: boolean;
  value?: Partial<Customer> | null;
  onChange?: (value: Partial<Customer>) => unknown;
}

const CustomerInfoEditView: React.FC<CustomerInfoEditViewProps> = ({
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

export default CustomerInfoEditView;
