// Khởi tạo đối tượng UserManagement để quản lý người dùng
const STATE_USER = {
    users: [],

    // Khởi tạo dữ liệu từ LocalStorage
    init: function() {
        const storedUsers = localStorage.getItem('users');
        this.users = storedUsers ? JSON.parse(storedUsers) : [];
        this.renderUserList();
    },

    // Lưu danh sách người dùng vào LocalStorage
    saveUsers: function() {
        localStorage.setItem('users', JSON.stringify(this.users));
    },

    // Thêm người dùng mới
    addUser: function(user) {
        this.users.push(user);
        this.saveUsers();
        this.renderUserList();
    },

    // Sửa thông tin người dùng
    editUser: function(index, updatedUser) {
        this.users[index] = updatedUser;
        this.saveUsers();
        this.renderUserList();
    },

    // Xóa người dùng
    deleteUser: function(index) {
        this.users.splice(index, 1);
        this.saveUsers();
        this.renderUserList();
    },

    // Hiển thị danh sách người dùng
    renderUserList: function() {
        const userListContainer = document.getElementById('user-list');
        userListContainer.innerHTML = ''; // Xóa danh sách cũ

        this.users.forEach((user, index) => {
            const userItem = document.createElement('div');
            userItem.innerHTML = `
                <p>Name: ${user.name}</p>
                <p>Email: ${user.email}</p>
                <button onclick="STATE_USER.editUserForm(${index})">Edit</button>
                <button onclick="STATE_USER.deleteUser(${index})">Delete</button>
            `;
            userListContainer.appendChild(userItem);
        });
    },

    // Hiển thị form chỉnh sửa người dùng
    editUserForm: function(index) {
        const user = this.users[index];
        document.getElementById('user-name').value = user.name;
        document.getElementById('user-email').value = user.email;
        document.getElementById('user-index').value = index;
        document.getElementById('submit-button').innerText = 'Update User';
    },

    // Xử lý form submission
    handleFormSubmit: function() {
        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;
        const index = document.getElementById('user-index').value;

        const user = { name, email };

        if (index === '') {
            this.addUser(user);
        } else {
            this.editUser(index, user);
        }

        document.getElementById('user-form').reset();
        document.getElementById('submit-button').innerText = 'Add User';
    }
};
// Chạy chương trình chính
function main() {
    // STATE_USER.init();
    listUsers();
    listenNewUser();
}

main();
// Tạo các hàm quản lý người dùng
function createNewUser(data) {
    STATE_USER.addUser(data);
}

function updateUser(id, data) {
    STATE_USER.editUser(id, data);
}

function deleteUser(id) {
    STATE_USER.deleteUser(id);
}

function getUsers() {
    return STATE_USER.users;
}

function listUsers() {
    STATE_USER.renderUserList();
}

// Tạo các hàm sự kiện
function listenNewUser() {
    document.getElementById('user-form').addEventListener('submit', function(event) {
        event.preventDefault();
        STATE_USER.handleFormSubmit();
    });
    listenEditUser();
    listenDeleteUser();
}

function listenEditUser() {
    // Gán sự kiện khi nhấn nút Edit trong danh sách người dùng (có thể đã được gắn trong renderUserList)
}

function listenDeleteUser() {
    // Gán sự kiện khi nhấn nút Delete trong danh sách người dùng (có thể đã được gắn trong renderUserList)
}


