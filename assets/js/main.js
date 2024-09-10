// "use strict";
import { userController } from './controller.js';

function main() {
    userController.modal();
    userController.listenNewUser();
    userController.init();
}
main();
