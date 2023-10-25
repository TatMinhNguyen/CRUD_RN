const baseUrl = "http://10.90.169.92:4000";

export const createStudent = async (user) => {
    try {
        const response = await fetch(`${baseUrl}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            console.log('User created successfully');
        } else {
            // Xử lý lỗi nếu có
            const errorMessage = await response.text();
            console.log(errorMessage);
        }
    } catch (error) {
        console.error(error);
    }
}

export const EditStudent = async (user,studentId) => {
    try {
        const response = await fetch(`${baseUrl}/${studentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            console.log('User updated successfully');
        } else {
            // Xử lý lỗi nếu có
            const errorMessage = await response.text();
            console.log(errorMessage);
        }
    } catch (error) {
        console.error(error);
    }
}

export const getAllStudents = async () => {
    try {
        const response = await fetch(`${baseUrl}/`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json(); // Lấy dữ liệu từ phản hồi
            console.log('Get Students successfully');
            return data; // Trả về dữ liệu nếu cần
        } else {
            // Xử lý lỗi nếu có
            const errorMessage = await response.text();
            console.log(errorMessage);
            throw new Error(errorMessage); // Ném ra lỗi nếu có lỗi
        }
    } catch (error) {
        console.error('Error:', error);
        throw error; // Ném ra lỗi trong trường hợp xảy ra lỗi trong khối try-catch
    }
};

export const deleteStudent = async (studentId) => {
    try {
        const response = await fetch(`${baseUrl}/${studentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('Student deleted successfully');
        } else {
            // Xử lý lỗi nếu có
            const errorMessage = await response.text();
            console.log(errorMessage);
        }
    } catch (error) {
        console.error(error);
    }
}



