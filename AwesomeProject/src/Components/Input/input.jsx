import React from 'react';
import { View, TextInput,Text, StyleSheet } from 'react-native';

const Input = ({ label, placeholder, keyboardType }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}:</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                keyboardType={keyboardType} // Sử dụng keyboardType để chỉ định loại bàn phím
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },
});

export default Input;
