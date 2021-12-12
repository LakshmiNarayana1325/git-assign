import react from "react";

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'; 
import KeyIcon from '@mui/icons-material/Key';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HistoryIcon from '@mui/icons-material/History';
export const Sidebardata = [
    {
        icon:<KeyboardIcon />,
        link:"/Board"
    },
    {
        icon:<KeyIcon />,
        link:"/Key"
    },
    {
        icon:<DirectionsCarIcon />,
        link:"/Car"
    },
    {
        icon:<CloudUploadIcon />,
        link:"/Upload"
    },
   

    {
        icon:<PersonAddAltIcon />,
        link:"/Adduser"
    },
    {
        icon:<HistoryIcon />,
        link:"/History"
    }

]