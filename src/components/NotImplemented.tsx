import Box from "@mui/material/Box";
import CodeOffIcon from "@mui/icons-material/CodeOff";
import Typography from "@mui/material/Typography";

function NotImplemented() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        gap: 1
      }}
    >
      <CodeOffIcon fontSize="large" sx={{ ml: "auto" }} />
      <Typography sx={{ mr: "auto" }}>Not implemented</Typography>
    </Box>
  );
}

export default NotImplemented;
