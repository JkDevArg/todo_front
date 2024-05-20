import { Alert } from "@mui/material";
import { useState, useEffect } from "react";

type resultProps = {
    id: number,
    name: string;
    profession: string;
    attribute: string;
};

export default function GetPerson() {
    const [result, setResult] = useState<resultProps[]>([]);

    useEffect(() => {
        const api = async () => {
            const data = await fetch("http://localhost:3001/api/v1/person", {
                method: "GET"
            });
            const jsonData = await data.json();
            setResult(jsonData);
        };

        api();
    }, []);

    return (
        
        <h1>
            {result.map((value) => {
                return (
                    <Alert variant="outlined" severity="success" key={value?.id}>
                        Bienvenido {value?.name}, te has registrado como {value?.profession} en el area {value?.attribute}
                    </Alert>
                );
            })}
        </h1>
    );
}
