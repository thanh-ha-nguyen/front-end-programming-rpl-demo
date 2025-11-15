import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import type React from "react";
import { useCallback, useEffect, useState, useTransition } from "react";
import CustomersList from "../components/CustomersList";
import { loadCustomers } from "../services";

function CustomersPage() {
  const [, startTransition] = useTransition();
  const [customers, setCustomers] = useState<Array<CustomerEntity>>([]);
  const [search, setSearch] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  useEffect(() => {
    startTransition(async () => {
      const customers = await loadCustomers();
      setCustomers(customers);
      setFilteredCustomers(customers);
    });
  }, []);

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

  useEffect(() => {
    startTransition(() =>
      setFilteredCustomers(
        search.trim().length === 0
          ? customers
          : customers.filter((customer) =>
              search
                .split(/\s+/)
                .filter((searchTerm) => searchTerm.length > 0)
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
  }, [search, customers]);

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
