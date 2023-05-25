import React, { useState } from 'react';
import { Box, VStack, Text, HStack, Button, Center } from 'native-base';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Pressable, TextInput } from 'react-native';

const DataTime = ({ onDateTimeSelected }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = formatDate(selectedDate);
      setSelectedDate(formattedDate);
      setSelectedDateTime(formatMySQLDateTime(selectedDate, time));
     
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
      const formattedTime = selectedTime.toLocaleTimeString();
      setSelectedTime(formattedTime);
      setSelectedDateTime(formatMySQLDateTime(date, selectedTime));
      onDateTimeSelected(selectedDateTime);
    }
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  };

  const formatMySQLDateTime = (date, time) => {
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <Box mt={5} minWidth="200">
      <Pressable onPress={toggleDatePicker}>
        <TextInput
          style={{ borderWidth: 1, borderColor: '#d6d6d6', padding: 7, borderRadius: 4 }}
          placeholder='Data'
          editable={false}
          value={selectedDate}
        />
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          mode='date'
          display='spinner'
          value={date}
          onChange={handleDateChange}
        />
      )}

      <Pressable onPress={toggleTimePicker}>
        <TextInput
          style={{ borderWidth: 1, borderColor: '#d6d6d6', padding: 7, borderRadius: 4 }}
          placeholder='Hora'
          editable={false}
          value={selectedTime}
        />
      </Pressable>

      {showTimePicker && (
        <DateTimePicker
          mode='time'
          display='spinner'
          value={time}
          onChange={handleTimeChange}
        />
      )}

    
    </Box>
  );
};

export default DataTime;
