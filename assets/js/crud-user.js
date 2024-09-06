"use strict";

const load = document.querySelector('.page_loader');
function showLoader() {
    load.classList.remove('hidden');
}
function hideLoader() {
    load.classList.add('hidden');
}
function alwayLoad() {
    showLoader(); 
    window.onload = hideLoader(); 
}
alwayLoad()

const STATE_USER = {
    state_users: [],

    //Load dữ liệu từ API
    loadUsersFromAPI: function(){
        showLoader()
        fetch('https://cae4b723474a87611103.free.beeceptor.com/api/users12/')
            .then(response => {
                if(!response.ok){
                    throw new Error('không ổn');
                }else{
                    return response.json();
                }
            })
            .then(data => {
                this.state_users = data
                this.renderUserList();
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                hideLoader();
            })
    },
    // Khởi tạo dữ liệu từ LocalStorage
    init: function(){
        this.loadUsersFromAPI();
        pagination()
    },
    // lưu danh sách dữ liệu vào LocalStorage
    // saveUsers: function(){
    //     localStorage.setItem('STATE_USE', JSON.stringify(this.state_users));
    // },
    //Thêm User
    addUser: function(user) {
        showLoader()
        fetch('https://cae4b723474a87611103.free.beeceptor.com/api/users14/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Lỗi nhé')
            }
            return response.json()
        })
        .then(data => {
            this.state_users.unshift(data)
            this.renderUserList();
        })
        .catch(error => {
            console.error('Có lỗi khi thêm user:', error)
        })
        .finally(() => {
            hideLoader();
        })
    },
    //Sửa User
    editUser: function(id, updateUser){
        showLoader();
        fetch(`https://cae4b723474a87611103.free.beeceptor.com/api/users14/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateUser)
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Lỗi cập nhật");
            }
            return response.json();
        })
        .then(() => {
            this.loadUsersFromAPI();
            modal();
        })
        .catch(error => {
            console.log("Đã xảy ra lỗi", error);
        })
        .finally(() => {
            hideLoader();
        })
    },
    //Xóa User
    deleteUser: function(id){
        showLoader();
        fetch(`https://cae4b723474a87611103.free.beeceptor.com/api/users14/${id}`,{
            method: 'DELETE',
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("Lỗi xóa");       
            }
            this.state_users = this.state_users.filter(user => user.id !== id);
            this.renderUserList();

        })
        .catch(error => {
            console.log("Lỗi", error);     
        })
        .finally(() => {
            hideLoader();
        })
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
            pagination();
            modal();
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
            modal();
        } else {
            const id = this.state_users[index].id;    
            this.editUser(id, user);
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

//Modal
function modal(){
    var add = document.querySelector('.btn-add');
    var formAdd = document.querySelector('.form-add');
    var closeModal = document.querySelector('.close-modal');
    var overflow = document.querySelector('.overflow');
    const btnUpdate = document.querySelectorAll('.btn-update');
    add.addEventListener('click', function(){
        overflow.classList.add('active');
        document.getElementById('save').style.display = 'block';
        document.getElementById('update').style.display = 'none';
        document.getElementById('title-add').style.display = 'block';
        document.getElementById('title-update').style.display = 'none';
        STATE_USER.resetForm();
    });
    closeModal.addEventListener('click', function(){
        overflow.classList.remove('active');
    });
    overflow.addEventListener('click', function(){
        overflow.classList.remove('active');
    });
    formAdd.addEventListener('click', function(e){
        e.stopPropagation();
    });
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
            const id = STATE_USER.state_users[index].id;
            if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
                STATE_USER.deleteUser(id);
            }
        })
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

// Pagination
function pagination(){
    let thisPage = 1;
    const limit = 5;
    const listItem = document.querySelectorAll('tbody tr');
    function loadItem(){
        showLoader();
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
        setTimeout(() => {
            hideLoader();
        }, 500); 
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
        if(1 < thisPage != count){
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
    return STATE_USER.loadUsersFromAPI();  
}

function listUsers(){
    STATE_USER.renderUserList();
    listenDeleteUser();
    modal();
    pagination();
    searchUsers();
    listenSort();
}

//Hàm chạy chính
function main() {
    STATE_USER.init();
    listenNewUser();
    listUsers();
    modal();
}
main();
