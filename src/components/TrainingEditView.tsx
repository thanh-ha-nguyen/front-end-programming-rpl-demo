import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
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
  const [date, setDate] = useState<Dayjs | null>(dayjs(value?.date) || dayjs());
  const [activity, setActivity] = useState(value?.activity || "");
  const [duration, setDuration] = useState(value?.duration || 30);

  useEffect(() => {
    setDate(dayjs(value.date));
    setActivity(value.activity || "");
    setDuration(value.duration || 30);
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
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
        <DateTimePicker
          label="Start time"
          slotProps={{
            textField: {
              variant: "standard",
              onBlur: () => {
                onChange?.({ date: date?.toDate() });
              },
            },
          }}
          sx={{ mr: "auto" }}
          value={date}
          onChange={(value) => setDate(value)}
        />
        <FormControl sx={{ flexBasis: "calc(50% - var(--mui-spacing))" }}>
          <InputLabel htmlFor="duration">Duration</InputLabel>
          <Input
            id="duration"
            endAdornment={
              <InputAdornment position="end">minute(s)</InputAdornment>
            }
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
    </LocalizationProvider>
  );
};

export default TrainingEditView;
