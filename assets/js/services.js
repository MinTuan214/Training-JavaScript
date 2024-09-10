import { STATE_USER } from "./state.js";
import { API } from "./apis.js";

const userServices = {
    async loadUser(){
        try {
            const users = await API.loadUsers();
            STATE_USER.setUser(users);
        } catch (error) {
            console.error('Lỗi khi truy xuất dữ liệu: ', error);
        }
    },
    async addUser(user){
        try {
            const newUser = await API.addUser(user);
            STATE_USER.addUserToState(newUser);
        } catch (error) {
            console.error('Lỗi khi thêm dữ liệu: ', error);
        }
    },
    async updateUser(id, user){
        try {
            const updateUser = await API.updateUser(id, user);
            STATE_USER.updateUserInState(updateUser);
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
}

export { userServices };