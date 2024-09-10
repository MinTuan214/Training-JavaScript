import { STATE_USER } from './state.js';
import { userServices } from './services.js';
import { containForm } from './utils.js';

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
        this.render();
    },
    render() {
        STATE_USER.renderUserList(STATE_USER.state_users);
    },
    sortUp(key){
        STATE_USER.sortUsersUp(key);
        this.render();
    },
    handleFormSubmit() {
        const {lastName, firstName, email, phone, country, city, address ,index} = containForm();
        const user = {lastName, firstName, email, phone, country, city, address ,index};
        if (index === '') {
            this.addUser(user);
        } else {
            this.updateUser(user); 
        }
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
    }

};

export { userController };
