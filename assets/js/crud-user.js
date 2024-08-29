"use strict";

const STATE_USER = {
    state_users: [],

    //Khởi tạo dữ liệu từ LocalStorage
    init: function(){
        const storedUsers = localStorage.getItem('LIST_INFO');
        this.state_users = storedUsers ? JSON.parse(storedUsers) : [];
        this.renderUserList();
    },

    // lưu danh sách dữ liệu vào LocalStorage
    saveUsers: function(){
        localStorage.setItem('LIST_INFO', JSON.stringify(this.state_users));
    },

    //Thêm User
    addUser: function(user){
        this.state_users.push(user);
        this.saveUsers();
        this.renderUserList();
    },

    //Sửa User
    editUser: function(id, updateUser){
        this.state_users[id] = updateUser;
        this.saveUsers();
        this.renderUserList();
    },

    //Xóa User
    deleteUser: function(id){
        this.state_users.splice(id, 1);
        this.saveUsers();
        this.renderUserList();
    },
    
    // Hiển thị danh sách người dùng
    renderUserList: function(){
        const userListContainer = document.querySelector('#list-users tbody');
            userListContainer.innerHTML = '';
            this.state_users.forEach((user, index) => {
                userListContainer.innerHTML += `
                    <tr>
                        <td>${user.lastName} ${user.firstName}</td>
                        <td>${user.email}</td>
                        <td>${user.address}</td>
                        <td>${user.city}</td>
                        <td>${user.country}</td>
                        <td class="action">
                            <a href="${index}"><i class="fa-regular fa-eye"></i></a> |
                            <button class="btn-update"><i class="fa-regular fa-pen-to-square"></i></button> |
                            <button class="btn-delete" data-index="${index}"><i class="fa-regular fa-trash-can"></i></button>
                        </td>
                    </tr>
                `;
            });
            listenDeleteUser();
    },
    
    //Xử lý form 
    handleFormSubmit:  function() {
        var lastName = document.getElementById('lastName').value;
        var firstName = document.getElementById('firstName').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var country = document.getElementById('country').value;
        var city = document.getElementById('city').value;
        var address = document.getElementById('address').value;

        const user = {lastName, firstName, email, phone, country, city, address}
      
        this.addUser(user);
    
        var lastName = document.getElementById('lastName').value = "";
        var firstName = document.getElementById('firstName').value = "";
        var email = document.getElementById('email').value = "";
        var phone = document.getElementById('phone').value = "";
        var country = document.getElementById('country').value = "";
        var city = document.getElementById('city').value = "";
        var address = document.getElementById('address').value = "";
    }
};

//Sự kiện
function listenNewUser(){
    var form = document.getElementById('save');
    form.addEventListener('click', function(e){
        e.preventDefault();
        STATE_USER.handleFormSubmit();
    });
}
function listenDeleteUser(){
    const btnDelete = document.querySelectorAll('.btn-delete');
    btnDelete.forEach(function(item){
        item.addEventListener('click', function(){
                const index = this.getAttribute('data-index');
                STATE_USER.deleteUser(index);        
        })
    });
    
}

function getUsers() {
    return STATE_USER.users;
}
function listUsers(){
    STATE_USER.renderUserList();
    listenDeleteUser();
}
function createUser(data){
    STATE_USER.addUser(data);
}


//Hàm chạy chính
function main() {
    STATE_USER.init();
    listenNewUser();
    listUsers();
}
main();
























