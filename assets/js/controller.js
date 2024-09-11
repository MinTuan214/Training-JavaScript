import { STATE_USER } from './state.js';
import { userServices } from './services.js';
import { utils } from './utils.js';

const userController = {
    async init() {
        await userServices.loadUser();
        this.render();
    },
    async addUser(user) {
        await userServices.addUser(user);
        this.render();
    },
    async updateUser(id, user) {
        await userServices.updateUser(id, user);
        this.render();
    },
    async deleteUser(id) {
        await userServices.deleteUser(id);
        STATE_USER.deleteUserInState(id);
        this.render();
    },
    render() {
        STATE_USER.renderUserList(STATE_USER.state_users);
        this.listenDelete();
    },
    sortUp(key){
        STATE_USER.sortUsersUp(key);
        this.render();
    },
    sortDown(key){
        STATE_USER.sortUsersDown(key);
        this.render();
    },
    handleFormSubmit() {
        const {lastName, firstName, email, phone, country, city, address ,index} = utils.containForm();
        const user = {lastName, firstName, email, phone, country, city, address ,index};
        if (index === '') {
            this.addUser(user);
        } else {
            this.updateUser(user); 
        }
    },
    
    listenNewUser() {
        var form = document.getElementById('save');
        form.addEventListener('click', function (e) {
            e.preventDefault();
            userController.handleFormSubmit();
        });
        var update = document.getElementById('update');
        update.addEventListener('click', function (e) {
            e.preventDefault();
            userController.handleFormSubmit();
        });
    },
    listenDelete() {
        const btnDelete = document.querySelectorAll('.btn-delete');
        btnDelete.forEach((item) => {
            item.addEventListener('click', function (e) {
                const id = item.getAttribute('data-index');
                    userController.deleteUser(STATE_USER.state_users[id].id);    
            });
        });
    },
    
    // Search
    searchUsers() {
        const searchInput = document.querySelector('#searchUsers');
        const btnSearch = document.querySelector('.search button');
        btnSearch.addEventListener('click', function () {
            const query = searchInput.value.trim();
            if (query === '') {
                userController.init();
            } else {
                const filteredUsers = STATE_USER.searchUsers(query);
                STATE_USER.state_users = filteredUsers;
                STATE_USER.renderUserList(STATE_USER.state_users);
                STATE_USER.pagination();
            }
        });
    },
    listenSort() {
        var sortColumns = document.querySelectorAll('.sortable');
        sortColumns.forEach(column =>{
            const key = column.getAttribute('data-key');
            const btnSortUp = column.querySelector('.fa-sort-up');
            const btnSortDown = column.querySelector('.fa-sort-down');
    
            btnSortUp.addEventListener('click', function() {
                userController.sortUp(key);
                btnSortUp.classList.add('active-i');
                btnSortDown.classList.remove('active-i');
            });
    
            btnSortDown.addEventListener('click', function() {
                userController.sortDown(key);
                btnSortDown.classList.add('active-i');
                btnSortUp.classList.remove('active-i');
            });
        });
    },
    listenEvent(){
        this.listenDelete();
        this.listenSort();
        this.listenNewUser();
        this.searchUsers();
        utils.modal();
    }

};

export { userController };
