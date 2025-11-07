import type React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router";

interface CustomersListProps {
  customers?: CustomerEntity[];
}

const CustomersList: React.FC<CustomersListProps> = ({ customers = [] }) => {
  const navigate = useNavigate();

  return (
    <Paper sx={{ height: '100%' }}>
      <List>
        {customers.map(({ id, avatarurl, firstname, lastname, phone }) => (
          <ListItemButton key={id} onClick={() => navigate(`/customers/${id}`)}>
            <ListItemAvatar>
              <Avatar alt={firstname + " " + lastname} src={avatarurl} />
            </ListItemAvatar>
            <ListItemText
              primary={firstname + " " + lastname}
              secondary={phone}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};

export default CustomersList;
