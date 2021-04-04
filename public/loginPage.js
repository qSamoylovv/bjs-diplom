'use strict';

const userForm = new UserForm();

console.log(userForm);

userForm.loginFormCallback = (data) => {
    const user = (response) => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    };

    ApiConnector.login(data, user);
};

userForm.registerFormCallback = (data) => {
    const user = (response) => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error);
        }
    };

    ApiConnector.register(data, user);
};
