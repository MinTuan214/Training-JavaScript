import { STATE_USER } from "./state.js";
import { API } from "./apis.js";
import { utils } from "./utils.js";

const userServices = {
    async getUser(){
        try {
            const users = await API.getUsers();
            STATE_USER.state_users = users;
        } catch (error) {
            console.error('Lỗi khi truy xuất dữ liệu: ', error);
        }
    },
    async addUser(user){
        try {
            const newUser = await API.addUser(user);
            this.addUserToState(newUser);
        } catch (error) {
            console.error('Lỗi khi thêm dữ liệu: ', error);
        }
    },
    async updateUser(id, user){
        try {
            const updateUser = await API.updateUser(id, user);
            this.updateUserInState(updateUser);
        } catch (error) {
            console.error('Lỗi khi update dữ liệu: ', error);
        }
    },
    async deleteUser(id){
        try {
            await API.deleteUser(id);  
        } catch (error) {
            console.error('Lỗi khi xóa dữ liệu: ', error);
        }
    },
    addUserToState(user) {
        STATE_USER.state_users.unshift(user);
    },
    updateUserInState(updatedUser) {
        const index = STATE_USER.state_users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
            this.state_users[index] = updatedUser;
        }
    },
    deleteUserInState(id) {
        STATE_USER.state_users = utils.deleteInState(STATE_USER.state_users, id);
    },
    searchUsers(query) {
        const lowerQuery = query.toLowerCase();
        return STATE_USER.state_users.filter(user => (
            user.lastName.toLowerCase().includes(lowerQuery) ||
            user.firstName.toLowerCase().includes(lowerQuery) ||
            user.email.toLowerCase().includes(lowerQuery) ||
            user.address.toLowerCase().includes(lowerQuery) ||
            user.city.toLowerCase().includes(lowerQuery) ||
            user.country.toLowerCase().includes(lowerQuery)
        ));
    },
    sortUsersUp(key) {
        STATE_USER.state_users.sort((a, b) => (a[key] < b[key] ? -1 : 1));
    }, 
    sortUsersDown(key) {
        STATE_USER.state_users.sort((a, b) => (a[key] > b[key] ? -1 : 1));
    },
    renderUserList(users){
        const userListContainer = document.querySelector('#list-users tbody');
            userListContainer.innerHTML = '';
            users.forEach((user, index) => {
                userListContainer.innerHTML += `
                    <tr>
                        <td>${user.firstName}</td>
                        <td>${user.email}</td>
                        <td>${user.address}</td>
                        <td>${user.city}</td>
                        <td>${user.country}</td>
                        <td class="action">
                            <a href="${index}"><i class="fa-regular fa-eye"></i></a> |
                            <button class="btn-update" data-edit="${index}">
                                <span class="text-save"><i class="fa-regular fa-pen-to-square"></i></span>
                             
                            </button> |
                            <button class="btn-delete" data-index="${index}">
                            <span class="text-delete"><i class="fa-regular fa-trash-can"></i></span>
                                <div class="loader-delete hidden">
                                    <svg 
                                        width="20px" height="20px" class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
                                        <path class="opacity-75"
                                        fill="currentColor" 
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>                            
                                </div> 
                            </button>
                        </td>
                    </tr>
                `;
            });  
            this.pagination();
        },
   
        pagination() {
            let thisPage = 1;
            const limit = 5;
            const listItem = document.querySelectorAll('tbody tr');
            function loadItem() {
                const beginGet = limit * (thisPage - 1);
                const endGet = limit * thisPage - 1;
                listItem.forEach((item, key) => {
                    if (key >= beginGet && key <= endGet) {
                        item.style.display = 'table-row';
                    } else {
                        item.style.display = 'none';
                    }
                });
                listPage();
            }
            loadItem();
        
            function listPage() {
                let count = Math.ceil(listItem.length / limit);
                document.querySelector('.pagination').innerHTML = '';
                if (thisPage != 1) {
                    let prev = document.createElement('span');
                    prev.innerHTML = '<<';
                    prev.addEventListener('click', function () {
                        changePage(thisPage - 1);
                    });
                    document.querySelector('.pagination').appendChild(prev);
                }
                for (let i = 1; i <= count; i++) {
                    let newPage = document.createElement('span');
                    newPage.innerText = i;
                    if (i == thisPage) {
                        newPage.classList.add('active');
                    }
                    newPage.addEventListener('click', function () {
                        changePage(i);
                    });
                    document.querySelector('.pagination').appendChild(newPage);
                }
                if (thisPage != count) {
                    let next = document.createElement('span');
                    next.innerHTML = '>>';
                    next.addEventListener('click', function () {
                        changePage(thisPage + 1);
                    });
                    document.querySelector('.pagination').appendChild(next);
                }
            }
            function changePage(i) {
                thisPage = i;
                loadItem();
            }
        },
}

export { userServices };