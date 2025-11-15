import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SortIcon from "@mui/icons-material/Sort";
import type React from "react";
import { useCallback, useState, useTransition } from "react";
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
    email: "hanguyen@mail.com",
    phone: "232-1234567",
  },
  {
    id: 1089,
    firstname: "Sherlock",
    lastname: "Holmes",
    streetaddress: "5th Street",
    postcode: "23110",
    city: "Flintsone",
    email: "sherloc@mail.com",
    phone: "232-7654321",
  },
];

function CustomersPage() {
  const [, startTransition] = useTransition();
  const [customers, setCustomers] = useState(initialCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  const onSort = useCallback(() => {
    startTransition(() =>
      setCustomers((customers) =>
        customers.slice(0).sort((first, second) => {
          const firstFullName = `${first.firstname} ${first.lastname}`;
          const secondFullName = `${second.firstname} ${second.lastname}`;
          return firstFullName.localeCompare(secondFullName);
        })
      )
    );
  }, []);

  const onSearchChange = useCallback(
    (search: string) => {
      startTransition(() =>
        setFilteredCustomers(
          search.trim().length === 0
            ? initialCustomers
            : customers.filter((customer) =>
                search
                  .split(/\s+/)
                  .filter(searchTerm => searchTerm.length > 0)
                  .some(
                    (searchTerm) =>
                      customer.firstname?.toLowerCase().startsWith(searchTerm) ||
                      customer.lastname?.toLowerCase().startsWith(searchTerm) ||
                      customer.email?.toLowerCase().includes(searchTerm) ||
                      customer.phone?.toLowerCase().includes(searchTerm)
                  )
              )
        )
      );
    },
    [customers]
  );

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar onSearchChange={onSearchChange} onSort={onSort} />
      <CustomersList customers={filteredCustomers} />
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
  onSearchChange: (search: string) => unknown;
  onSort: () => unknown;
}

const Toolbar: React.FC<ToolbarProps> = ({ onSearchChange, onSort }) => {
  const [search, setSearch] = useState("");
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
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
        autoComplete="off"
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
