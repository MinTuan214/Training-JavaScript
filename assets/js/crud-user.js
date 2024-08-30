// "use strict";

const STATE_USER = {
    state_users: [],

    // Lấy dữ liệu từ LocalStorage
    loadUsersFromLocalStorage: function(){
        const storedUsers = localStorage.getItem('STATE_USE');
        this.state_users = storedUsers ? JSON.parse(storedUsers) : [];
    },

    // Khởi tạo dữ liệu từ LocalStorage
    init: function(){
        this.loadUsersFromLocalStorage();
        this.renderUserList();
    },

    // lưu danh sách dữ liệu vào LocalStorage
    saveUsers: function(){
        localStorage.setItem('STATE_USE', JSON.stringify(this.state_users));
    },

    //Thêm User
    addUser: function(user){
        this.state_users.unshift(user);
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
        pagination()
    },
    
    // Hiển thị danh sách người dùng
    renderUserList: function(){
        const userListContainer = document.querySelector('#list-users tbody');
            userListContainer.innerHTML = '';
            this.state_users.forEach((user, index) => {
                userListContainer.innerHTML += `
                    <tr>
                        <td>${user.firstName}</td>
                        <td>${user.email}</td>
                        <td>${user.address}</td>
                        <td>${user.city}</td>
                        <td>${user.country}</td>
                        <td class="action">
                            <a href="${index}"><i class="fa-regular fa-eye"></i></a> |
                            <button class="btn-update" data-edit="${index}"><i class="fa-regular fa-pen-to-square"></i></button> |
                            <button class="btn-delete" data-index="${index}"><i class="fa-regular fa-trash-can"></i></button>
                        </td>
                    </tr>
                `;
            });
            listenDeleteUser();
            listenUpdateUser();
            pagination();
    },
    
    //form edit
    editUserForm: function(index){
        const user = this.state_users[index];
        document.getElementById('lastName').value = user.lastName;
        document.getElementById('firstName').value = user.firstName;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phone;
        document.getElementById('country').value = user.country;
        document.getElementById('city').value = user.city;
        document.getElementById('address').value = user.address;

        document.getElementById('user-index').value = index;
        document.getElementById('save').style.display = 'none';
        document.getElementById('update').style.display = 'block';
        document.getElementById('title-add').style.display = 'none';
        document.getElementById('title-update').style.display = 'block';   
    },  
    //Xử lý form 
    handleFormSubmit: function() {
        var lastName = document.getElementById('lastName').value;
        var firstName = document.getElementById('firstName').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var country = document.getElementById('country').value;
        var city = document.getElementById('city').value;
        var address = document.getElementById('address').value;
        var index = document.getElementById('user-index').value;
    
        const user = { lastName, firstName, email, phone, country, city, address };
        if (index === '') {
            this.addUser(user); 
            this.resetForm();
            
        } else {
            this.editUser(index, user);  
        }
    },
    // Reset form
    resetForm: function() {
        document.getElementById('lastName').value = "";
        document.getElementById('firstName').value = "";
        document.getElementById('email').value = "";
        document.getElementById('phone').value = "";
        document.getElementById('country').value = "";
        document.getElementById('city').value = "";
        document.getElementById('address').value = "";
        
        document.getElementById('save').style.display = 'block';
        document.getElementById('update').style.display = 'none';
        document.getElementById('user-index').value = "";
    },
    //Search
    searchUsers: function(query) {
        const lowerQuery = query.toLowerCase();
        const filteredUsers = this.state_users.filter(user => {
            return (
                user.lastName.toLowerCase().includes(lowerQuery) ||
                user.firstName.toLowerCase().includes(lowerQuery) ||
                user.email.toLowerCase().includes(lowerQuery) ||
                user.address.toLowerCase().includes(lowerQuery) ||
                user.city.toLowerCase().includes(lowerQuery) ||
                user.country.toLowerCase().includes(lowerQuery)
            );
        });
        return filteredUsers;
    },
    // Tăng dần
    sortUp: function(key) {
        this.state_users.sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        this.renderUserList()   
    },
    // Giảm dần
    sortDown: function(key) {
        this.state_users.sort((a, b) => {
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
        });
        this.renderUserList();  
    },
};

//Sự kiện
function listenNewUser(){
    var form = document.getElementById('save');
    form.addEventListener('click', function(e){
        e.preventDefault();
        STATE_USER.handleFormSubmit();
    });
    var update = document.getElementById('update');
    update.addEventListener('click', function(e){
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
function listenUpdateUser(){
    const btnUpdate = document.querySelectorAll('.btn-update');
    btnUpdate.forEach(function(item){
        item.addEventListener('click', function(){
            const index = this.getAttribute('data-edit');
            STATE_USER.editUserForm(index); 
        })
    });  
    btnUpdate.forEach(element => {
        element.addEventListener('click', function(){
            overflow.classList.add('active');
        });
    });
}
function listenSort() {
    var sortColumns = document.querySelectorAll('.sortable');
    sortColumns.forEach(column =>{
        const key = column.getAttribute('data-key');
        const btnSortUp = column.querySelector('.fa-sort-up');
        const btnSortDown = column.querySelector('.fa-sort-down');

        btnSortUp.addEventListener('click', function() {
            STATE_USER.sortUp(key);
            btnSortUp.classList.add('active-i');
            btnSortDown.classList.remove('active-i');
        });

        btnSortDown.addEventListener('click', function() {
            STATE_USER.sortDown(key);
            btnSortDown.classList.add('active-i');
            btnSortUp.classList.remove('active-i');
        });
    });
}

function getUsers() {
    return STATE_USER.users;
}
function createUser(data){
    STATE_USER.addUser(data);
}
// Pagination
function pagination(){
    let thisPage = 1;
    const limit = 5;
    const listItem = document.querySelectorAll('tbody tr');
    function loadItem(){
        const benginGet = limit * (thisPage - 1);
        const endGet = limit * thisPage - 1;
        listItem.forEach((item, key) =>{
            if(key >= benginGet && key <= endGet){
                item.style.display = 'table-row';
            }else{
                item.style.display = 'none';
            }
        });
        listPage();
    }
    loadItem()
    function listPage(){
        let count = Math.ceil(listItem.length / limit);
        document.querySelector('.pagination').innerHTML = '';
        if(thisPage != 1){
            let prev = document.createElement('span');
            prev.innerHTML = '<<';
            prev.addEventListener('click', function(){
                changePage(thisPage - 1);
            });
            document.querySelector('.pagination').appendChild(prev);
        }
        for (let i = 1; i <= count; i++) {
            let newPage = document.createElement('span');
            newPage.innerText = i;
            if(i == thisPage){
                newPage.classList.add('active');
            }
            newPage.addEventListener('click', function(){
                changePage(i);
            });
            document.querySelector('.pagination').appendChild(newPage);
        }
        if(thisPage != count){
            let next = document.createElement('span');
            next.innerHTML = '>>';
            next.addEventListener('click', function(){
                changePage(thisPage + 1);
            });
            document.querySelector('.pagination').appendChild(next);
        }
    }
    function changePage(i){
        thisPage = i;
        loadItem();
    }

}
// Search
function searchUsers() {
    const searchInput = document.querySelector('#searchUsers');
    const btnSearch = document.querySelector('.search button');
    btnSearch.addEventListener('click', function() {
        STATE_USER.loadUsersFromLocalStorage();  
        const query = searchInput.value.trim();
        if(query === ''){
            STATE_USER.init(); 
        }else{
            const filteredUsers = STATE_USER.searchUsers(query);
            STATE_USER.state_users = filteredUsers;
            STATE_USER.renderUserList(); 
            pagination(); 
        } 
    });     
}

function listUsers(){
    STATE_USER.renderUserList();
    listenDeleteUser();
    listenUpdateUser();
    pagination();
    searchUsers();
    listenSort();
}


//Hàm chạy chính
function main() {
    STATE_USER.init();
    listenNewUser();
    listUsers();
}
main();
