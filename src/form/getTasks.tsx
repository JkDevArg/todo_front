import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';

type resultProps = {
    tasks: string;
};

type GetTasksProps = {
    onTaskSelect: (task: string) => void;
    disabled: boolean;
};

export default function GetTasks({ onTaskSelect, disabled }: GetTasksProps) {
    const [task, setTask] = useState<string[]>([]);
    const [selectedTask, setSelectedTask] = useState<string>("");

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setSelectedTask(value);
        onTaskSelect(value); // Pass the selected task to the parent
    };

    useEffect(() => {
        const api = async () => {
            const response = await fetch("http://localhost:3001/api/v1/todo/person/getprofession", {
                method: "GET"
            });
            const jsonData = await response.json();
            setTask(jsonData);
        };

        api();
    }, []);

    return (
        <div style={{ width: '100%' }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Task</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedTask}
                    onChange={handleChange}
                    label="Task"
                    name="title"
                    disabled={disabled}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {task.map((taskItem, index) => (
                        <MenuItem key={index} value={taskItem}>
                            {taskItem}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
