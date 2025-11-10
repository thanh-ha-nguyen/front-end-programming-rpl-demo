import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SortIcon from "@mui/icons-material/Sort";
import type React from "react";
import { useCallback, useState } from "react";
import CustomersList from "../components/CustomersList";

const initialCustomers = [
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
    firstname: "Ha",
    lastname: "Nguyen",
    streetaddress: "5th Street",
    postcode: "23110",
    city: "Flintsone",
    email: "john@mail.com",
    phone: "232-2345540",
  },
  {
    id: 1089,
    firstname: "Sherlock",
    lastname: "Holmes",
    streetaddress: "5th Street",
    postcode: "23110",
    city: "Flintsone",
    email: "john@mail.com",
    phone: "232-2345540",
  },
];

function CustomersPage() {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState(initialCustomers);
  const onSort = useCallback(() => {
    setCustomers((customers) =>
      customers.slice(0).sort((first, second) => {
        const firstFullName = `${first.firstname} ${first.lastname}`;
        const secondFullName = `${second.firstname} ${second.lastname}`;
        return firstFullName.localeCompare(secondFullName);
      })
    );
  }, [setCustomers]);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar search={search} onSearchChange={setSearch} onSort={onSort} />
      <CustomersList customers={customers} />
      <Fab
        color="primary"
        sx={{
          position: "absolute",
          bottom: "8px",
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

interface ToolbarProps {
  search: string;
  onSearchChange: (search: string) => unknown;
  onSort: () => unknown;
}

const Toolbar: React.FC<ToolbarProps> = ({
  search,
  onSearchChange,
  onSort,
}) => {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );

  const onClick = useCallback(() => {
    onSort();
  }, [onSort]);

  return (
    <Box
      sx={{
        display: "flex",
        columnGap: 1,
        alignContent: "space-between",
        mb: 1,
      }}
    >
      <OutlinedInput
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        placeholder="Search a customer by name, e-mail or phone"
        value={search}
        onChange={onChange}
        sx={{ flexGrow: 1 }}
      />
      <IconButton onClick={onClick}>
        <SortIcon />
      </IconButton>
    </Box>
  );
};
