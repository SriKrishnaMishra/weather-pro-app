import React, { useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Paper,
  Typography
} from '@mui/material';
import { Delete, Edit, Refresh } from '@mui/icons-material';
import axios from 'axios';

const WeatherList = ({ weatherData, onDelete, onUpdate, apiKey }) => {
  const [editDialog, setEditDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editCity, setEditCity] = useState('');

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditCity(item.city);
    setEditDialog(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${editCity}&appid=${apiKey}&units=metric`
      );

      const updatedData = {
        city: response.data.name,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        description: response.data.weather[0].description,
        timestamp: new Date().toLocaleString()
      };

      onUpdate(selectedItem.id, updatedData);
      setEditDialog(false);
    } catch (error) {
      console.error('Error updating weather data:', error);
    }
  };

  const handleRefresh = async (item) => {
    try {
      console.log('Refreshing weather for:', item.city);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${item.city}&appid=${apiKey}&units=metric`
      );

      console.log('Received new weather data:', response.data);
      const updatedData = {
        ...item,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        description: response.data.weather[0].description,
        timestamp: new Date().toLocaleString()
      };
      console.log('Updating with:', updatedData);

      onUpdate(item.id, updatedData);
    } catch (error) {
      console.error('Error refreshing weather data:', error.response ? error.response.data : error);
      alert(`Error refreshing weather for ${item.city}: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <>
      <List>
        {weatherData.map((item) => (
          <Paper key={item.id} elevation={2} sx={{ mb: 2, p: 2 }}>
            <ListItem
              secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => handleRefresh(item)}>
                    <Refresh />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleEdit(item)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" onClick={() => onDelete(item.id)}>
                    <Delete />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={
                  <Typography variant="h6">
                    {item.city} - {item.temperature}°C
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2">
                      Humidity: {item.humidity}%
                    </Typography>
                    <Typography variant="body2">
                      {item.description}
                    </Typography>
                    <Typography variant="caption">
                      Last updated: {item.timestamp}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </Paper>
        ))}
      </List>

      <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
        <DialogTitle>Edit City</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="City Name"
            fullWidth
            value={editCity}
            onChange={(e) => setEditCity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WeatherList;
