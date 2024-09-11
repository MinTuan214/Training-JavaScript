import { STATE_USER } from './state.js';
import { userServices } from './services.js';

const userController = {
    async init() {
        await userServices.getUser();
        this.render();
        this.listenEvent();
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
        userServices.deleteUserInState(id);
        this.render();
    },
    render() {
        userServices.renderUserList(STATE_USER.state_users);
        this.listenDelete();
    },
    sortUp(key){
        userServices.sortUsersUp(key);
        this.render();
    },
    sortDown(key){
        userServices.sortUsersDown(key);
        this.render();
    },
    handleFormSubmit() {
        const {lastName, firstName, email, phone, country, city, address ,index} = this.containForm();
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
                const filteredUsers = userServices.searchUsers(query);
                STATE_USER.state_users = filteredUsers;
                userServices.renderUserList(STATE_USER.state_users);
                userServices.pagination();
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
    modal() {
        var add = document.querySelector('.btn-add');
        var formAdd = document.querySelector('.form-add');
        var closeModal = document.querySelector('.close-modal');
        var overflow = document.querySelector('.overflow');
        add.addEventListener('click', function () {
            overflow.classList.add('active');
        });
        closeModal.addEventListener('click', function () {
            overflow.classList.remove('active');
        });
        overflow.addEventListener('click', function () {
            overflow.classList.remove('active');
        });
        formAdd.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }, 
    containForm(){
        var lastName = document.getElementById('lastName').value;
        var firstName = document.getElementById('firstName').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var country = document.getElementById('country').value;
        var city = document.getElementById('city').value;
        var address = document.getElementById('address').value;
        var index = document.getElementById('user-index').value;
        return { lastName, firstName, email, phone, country, city, address, index};
    },
    listenEvent(){
        this.listenDelete();
        this.listenSort();
        this.listenNewUser();
        this.searchUsers();
        this.modal();
    }

};

export { userController };
