import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
const TimePickers = (props) => {
    const [value, setValue] = useState();
  
    useEffect(()=>{
     if(value)
      props.timeHandler(value)
  
      
  
    },[value])
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <TimePicker
        label=""
        value={value}
        className="text-white  bg-tertiaryblue-100  py-0 focus:outline-none border-2 border-white rounded-lg font-title w-[100%]  text-sm font-bold "
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params}  sx={{
            svg: { color: '#fff' },
              input: { color: '#fff'},
              label:{ color: '#fff' },
              border:{color:"#fff"}
             
          }} />}
      />
    </LocalizationProvider>
  );
};
export default TimePickers
