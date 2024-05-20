import { Alert, AlertColor } from "@mui/material";
import * as React from 'react';
import CheckIcon from '@mui/icons-material/Check';

interface ResponseAttribute {
    message: string;
    status: number;
}

export default function AlertResponse({ message, status }: ResponseAttribute) {
    let severity: AlertColor = "success";

    if (status === 400) {
        severity = "error";
    }

    return (
        <Alert variant="outlined" severity={severity} sx={{ marginTop: 3 }}>
            {message}
        </Alert>
    );
}