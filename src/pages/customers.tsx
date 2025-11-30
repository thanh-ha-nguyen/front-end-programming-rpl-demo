import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import type React from "react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import CustomersList from "../components/CustomersList";
import { useCustomers } from "../hooks";

function CustomersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [customers, onSort] = useCustomers(search);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Toolbar search={search} onSearchChange={setSearch} onSort={onSort} />
      <Box sx={{ flexGrow: 1, position: "relative" }}>
        <Paper
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            overflow: "auto",
          }}
        >
          <CustomersList customers={customers} />
        </Paper>
      </Box>
      <Fab
        color="primary"
        sx={{
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={() => navigate("/customers/new")}
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
