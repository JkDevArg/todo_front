import { Box, Button, FormControl, Stack, TextField } from '@mui/material';
import React from 'react'

interface FormProps {
    onSubmit: (data: FormData) => void;
}

interface FormData {
    title: string;
    description: string;
    color: string;
}

function Form({ onSubmit }: FormProps) {
    const [formData, setFormData] = React.useState<FormData>({ title: '', description: '', color: '' });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { title, value } = event.target;
        setFormData({ ...formData, [title]: value });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit(formData);
    }

    return (
        <FormControl>
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{
                        width: 500,
                        maxWidth: "100%",
                        marginBottom: 2
                    }}
                >
                    <Stack spacing={2}>
                        <TextField fullWidth name="title" value={formData.title} label="Title" id="fullWidth" onChange={handleInputChange} />
                        <TextField fullWidth name="description" value={formData.description} label="Description" id="fullWidth" rows={4} onChange={handleInputChange} />
                        <input name="color" type="color" value={formData.color} />
                    </Stack>
                </Box>
                <Stack>
                    <Button type="submit" variant="outlined">Save</Button>
                </Stack>
            </form>
        </FormControl>
    );
}

export default Form;