import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Input from './../Input/input';
import { createStudent } from '../../API/apiRequest';

const AddStudent = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [className, setClassName] = useState('');
    const [gpa, setGPA] = useState(null);

    const saveStudentInfo = () => {
        const user = {
            name,
            address,
            className,
            gpa,
        };
        console.log(user)
        try {
            createStudent(user); // Gọi hàm createStudent từ API
            console.log('Student created successfully');
        } catch (err) {
            console.log('Error creating student:', err);
        }
    }

    return (
        <View style={styles.container}>
            <Input label="Name" placeholder="Enter your name" onChangeText={setName} />
            <Input label="Address" placeholder="Enter your address" onChangeText={setAddress} />
            <Input label="Class" placeholder="Enter your class" onChangeText={setClassName} />
            <Input label="GPA" placeholder="Enter your GPA" keyboardType="numeric" onChangeText={setGPA} />

            <Button title="Add Student" onPress={saveStudentInfo} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default AddStudent;
