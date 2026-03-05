import { Stack, Typography } from "@mui/material"
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { useEffect, useState } from "react";



const LoadingPage = () => {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setFrame((prevFrame) => {
                return 1 - prevFrame;
            })
        }, 300)
    }, [frame])

    return (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ minHeight: "90vh" }}>
            <Typography variant="h4">Loading...</Typography>
            {frame ? <HourglassBottomIcon fontSize="large"/> : <HourglassTopIcon fontSize="large"/>}
        </Stack>
    );
};

export default LoadingPage;
