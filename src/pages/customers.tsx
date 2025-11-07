import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import CustomersList from "../components/CustomersList";

function CustomersPage() {
  const customers = [
    {
      id: 1087,
      firstname: "John",
      lastname: "Johnson",
      streetaddress: "5th Street",
      postcode: "23110",
      city: "Flintsone",
      email: "john@mail.com",
      phone: "232-2345540",
    },
    {
      id: 1088,
      firstname: "John",
      lastname: "Johnson",
      streetaddress: "5th Street",
      postcode: "23110",
      city: "Flintsone",
      email: "john@mail.com",
      phone: "232-2345540",
    },
    {
      id: 1089,
      firstname: "John",
      lastname: "Johnson",
      streetaddress: "5th Street",
      postcode: "23110",
      city: "Flintsone",
      email: "john@mail.com",
      phone: "232-2345540",
    },
  ];

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <CustomersList customers={customers} />
      <Fab
        color="primary"
        sx={{
          position: "absolute",
          bottom: '8px',
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default CustomersPage;
