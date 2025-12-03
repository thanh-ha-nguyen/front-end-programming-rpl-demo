import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import React, { useEffect, useState } from "react";

interface TrainingEditViewProps {
  readonly?: boolean;
  value: Partial<Training>;
  onChange?: (value: Partial<Training>) => unknown;
}

const TrainingEditView: React.FC<TrainingEditViewProps> = ({
  readonly = false,
  value,
  onChange,
}) => {
  const [date, setDate] = useState(value?.date || new Date());
  const [activity, setActivity] = useState(value?.activity || "");
  const [duration, setDuration] = useState(value?.duration || 30);

  useEffect(() => {
    setDate(value.date || new Date());
    setActivity(value.activity || "");
    setDuration(value.duration || 30);
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
        <FormControl sx={{ flexBasis: "100%" }}>
          <InputLabel htmlFor="activity">Activity</InputLabel>
          <Input
            id="activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            onBlur={() => onChange?.({ activity })}
            readOnly={readonly}
            inputProps={{
              style: {
                marginInlineStart: "14px",
                marginInlineEnd: "14px",
              },
            }}
            autoFocus
          />
        </FormControl>
        <FormControl sx={{ flexBasis: "calc(50% - var(--mui-spacing))" }}>
          <InputLabel htmlFor="date">Start time</InputLabel>
          <Input
            id="date"
            value={date}
            onChange={(e) => setDate(new Date(e.target.value))}
            onBlur={() => onChange?.({ date })}
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
          <InputLabel htmlFor="duration">Duration</InputLabel>
          <Input
            id="duration"
            endAdornment={<InputAdornment position="end">minute(s)</InputAdornment>}
            value={duration}
            onChange={(e) => setDuration(Number.parseInt(e.target.value))}
            onBlur={() => onChange?.({ duration })}
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

export default TrainingEditView;
