import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Edit, EditLocationSharp } from '@mui/icons-material';
import { Grid } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function CardTodo() {
    interface TaskItem {
        id: number;
        title: string;
        description?: string;
        color?: string;
        status: boolean;
    }

    const [tasks, setTasks] = React.useState<TaskItem[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/v1/todo");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const jsonData = await response.json();
                setTasks(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {tasks.map(taskItem => (
                <Grid item xs={12} sm={6} key={taskItem.id}>
                    <Card sx={{
                        border: taskItem.color ? `1px solid ${taskItem.color}` : '1px solid #000',
                        borderColor: taskItem.color ? `${taskItem.color}33` : '#000033',
                    }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: taskItem.color || red[500] }} aria-label="recipe">
                                    {taskItem.title.charAt(0)}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <Edit />
                                </IconButton>
                            }
                            title={taskItem.title}
                        />
                        {taskItem.description && (
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {taskItem.description}
                                </Typography>
                            </CardContent>
                        )}
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
    
}

