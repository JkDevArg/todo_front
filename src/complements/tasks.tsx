import { Box, Button, Input, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AlertResponse from './alert';
import GetTasks from '../form/getTasks';

function TodoForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [alertStatus, setStatusAlert] = useState(0);
    const [selectedTask, setSelectedTask] = useState<string>("");
    const [isSelectDisabled, setIsSelectDisabled] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/v1/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: selectedTask || title,  // Use selectedTask if available, otherwise use title
                    description,
                    color
                })
            });
            setSuccessMessage(response.statusText);
            setStatusAlert(response.status);
            // Limpiar los campos del formulario después de obtener la respuesta
            setTitle('');
            setDescription('');
            setColor('');
            setSelectedTask('');  // Reset the selected task
            setIsSelectDisabled(false);  // Enable the select
            setTimeout(() => {
                window.location.reload();  // Recarga la página
            }, 1500);
        } catch (error) {
            setSuccessMessage('Hubo un error');
            setStatusAlert(400);
            setTimeout(() => {
                window.location.reload();  // Recarga la página
            }, 3000);
        }
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTitle(value);
        if (value) {
            setIsSelectDisabled(true);
        } else {
            setIsSelectDisabled(false);
        }
    };

    const handleTaskSelect = (task: string) => {
        setSelectedTask(task);
        if (task) {
            setTitle('');  // Clear the title input
            setIsSelectDisabled(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box>
                <Stack spacing={3}>
                    <GetTasks onTaskSelect={handleTaskSelect} disabled={isSelectDisabled} />
                    {!selectedTask && (
                        <Input
                            id="title"
                            type="text"
                            aria-label="title"
                            placeholder="Title"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    )}
                    <Input
                        id="description"
                        aria-label="description"
                        multiline
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                        id="color"
                        type="color"
                        aria-label="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <Button variant="outlined" type="submit">Submit</Button>
                </Stack>
                {successMessage && <AlertResponse message={successMessage} status={alertStatus} />}
            </Box>
        </form>
    );
}

export default TodoForm;
