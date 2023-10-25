import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button, FlatList } from 'react-native';
import { EditStudent, createStudent, deleteStudent, getAllStudents } from '../../API/apiRequest';

const AddStudent = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [Class, setClassName] = useState('');
    const [gpa, setGPA] = useState('');
    const [students, setStudents] = useState([]);
    const [editMode, setEditMode] = useState({});

    // Hàm này sẽ gọi danh sách sinh viên từ cơ sở dữ liệu khi component được tải lần đầu
    useEffect(() => {
      getAllStudents()
        .then((data) => {
          setStudents(data);
          // Khởi tạo trạng thái chỉnh sửa cho mỗi sinh viên thành false ban đầu
          const initialEditMode = {};
          data.forEach((student) => {
            initialEditMode[student.id] = false;
          });
          setEditMode(initialEditMode);
        })
        .catch((error) => {
          console.error('Error fetching students:', error);
        });
    }, []);

    const saveStudentInfo = () => {
        const newUser = {
            name,
            address,
            Class,
            gpa,
        };
        createStudent(newUser)
            .then(() => {
                console.log('Student created successfully');
                // Sau khi thêm sinh viên, gọi lại danh sách để cập nhật
                refreshStudentList();
            })
            .catch((err) => {
                console.log('Error creating student:', err);
            });
    }

    const handleEdit = (id) => {
        const newUser = {
            name,
            address,
            Class,
            gpa,
        };
        EditStudent(newUser, id)
            .then(() => {
                // console.log('Student updated successfully');
                // Sau khi chỉnh sửa sinh viên, gọi lại danh sách để cập nhật
                refreshStudentList();
            })
            .catch((err) => {
                console.log('Error updating student:', err);
            });
    }

    const handleDelete = (id) => {
        deleteStudent(id)
            .then(() => {
                console.log("Delete Successfully!");
                // Sau khi xóa sinh viên, gọi lại danh sách để cập nhật
                refreshStudentList();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const refreshStudentList = () => {
        getAllStudents()
            .then((data) => {
                setStudents(data);
                // Khởi tạo trạng thái chỉnh sửa cho mỗi sinh viên thành false
                const updatedEditMode = {};
                data.forEach((student) => {
                    updatedEditMode[student.id] = false;
                });
                setEditMode(updatedEditMode);
            })
            .catch((error) => {
                console.error('Error fetching students:', error);
            });
    }

    return (
        <View style={styles.container}>
            <Text>Name: </Text>
            <TextInput
                style={styles.input}
                label="Name"
                placeholder="Enter your name"
                onChangeText={(value) => setName(value)}
            />
            <Text>Address: </Text>
            <TextInput
                style={styles.input}
                label="Address"
                placeholder="Enter your address"
                onChangeText={(value) => setAddress(value)}
            />
            <Text>ClassName: </Text>
            <TextInput
                style={styles.input}
                label="Class"
                placeholder="Enter your class"
                onChangeText={(value) => setClassName(value)}
            />
            <Text>GPA: </Text>
            <TextInput
                style={styles.input}
                label="GPA"
                placeholder="Enter your GPA"
                keyboardType="numeric"
                onChangeText={(value) => setGPA(value)}
            />

            <Button title="Add Student" onPress={saveStudentInfo} />
            <View style={styles.title}>
                <Text style={styles.title}>Students List: </Text>
            </View>

            <FlatList
                data={students}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={stylesFlatList.container}>
                        {editMode[item.id] ? (
                            // Hiển thị trường nhập liệu khi chỉnh sửa
                            <View>
                                <Text>StudentID: {item.id}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your name"
                                    value={name}
                                    onChangeText={(value) => setName(value)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your address"
                                    value={address}
                                    onChangeText={(value) => setAddress(value)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your class"
                                    value={Class}
                                    onChangeText={(value) => setClassName(value)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your gpa"
                                    value={gpa}
                                    onChangeText={(value) => setGPA(value)}
                                />
                            </View>
                        ) : (
                            // Hiển thị thông tin khi không chỉnh sửa
                            <View>
                                <Text>StudentID: {item.id}</Text>
                                <Text>Name: {item.name}</Text>
                                <Text>Address: {item.address}</Text>
                                <Text>Class: {item.class}</Text>
                                <Text>GPA: {item.gpa}</Text>
                            </View>
                        )}
                        <View style={styles.button}>
                            {editMode[item.id] ? (
                                // Hiển thị nút "Save" khi chỉnh sửa
                                <Button
                                    title="Save"
                                    onPress={() => {
                                        handleEdit(item.id);
                                        setEditMode({ ...editMode, [item.id]: false });
                                    }}
                                />
                            ) : (
                                // Hiển thị nút "Edit" khi không chỉnh sửa
                                <Button
                                    title="Edit"
                                    onPress={() => setEditMode({ ...editMode, [item.id]: true })}
                                />
                            )}
                        </View>
                        <View style={styles.button}>
                            <Button
                                title="Delete"
                                onPress={() => handleDelete(item.id)}
                            />
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 20,
        paddingBottom: 20,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 2,
        paddingLeft: 10,
        marginBottom: 10,
    },
    button: {
        color: 'red',
        padding: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 5,
    },
});

const stylesFlatList = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default AddStudent;
