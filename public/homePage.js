'use strict';

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((answer) => {
        if (answer.success) {
            location.reload();
        }
    });
};

ApiConnector.current((profile) => {
    if (profile.success === true) {
        ProfileWidget.showProfile(profile.data);
    }
});

const ratesBoard = new RatesBoard();

setInterval(
    ApiConnector.getStocks((value) => {
        // console.log(value);
        if (value.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(value.data);
        }
    }),
    60000
);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (money) => {
    const pay = (moneyPayment) => {
        // console.log(moneyPayment);
        if (moneyPayment.success === true) {
            ProfileWidget.showProfile(moneyPayment.data);
            moneyManager.setMessage(moneyPayment.success, 'Баланс пополнен!');
        }
    };

    ApiConnector.addMoney(money, pay);
};

moneyManager.conversionMoneyCallback = (money) => {
    const conversionMoney = (moneyConversion) => {
        // console.log(moneyConversion);
        if (moneyConversion.success === true) {
            ProfileWidget.showProfile(moneyConversion.data);
            moneyManager.setMessage(
                moneyConversion.success,
                'Конвертация прошла успешно!'
            );
        }
    };

    ApiConnector.convertMoney(money, conversionMoney);
};

moneyManager.sendMoneyCallback = (money) => {
    const sendMoneyTransaction = (moneyTransfer) => {
        // console.log(moneyTransfer);
        if (moneyTransfer.success === true) {
            ProfileWidget.showProfile(moneyTransfer.data);
            moneyManager.setMessage(
                moneyTransfer.success,
                'Перевод выполнен успешно!'
            );
        }
    };

    ApiConnector.transferMoney(money, sendMoneyTransaction);
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((favoriteData) => {
    // console.log(favoriteData);
    if (favoriteData.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(favoriteData.data);
    }

    moneyManager.updateUsersList(favoriteData.data);
});

favoritesWidget.addUserCallback = (addUser) => {
    // console.log(addUser);
    const user = (userCallback) => {
        if (userCallback.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(userCallback.data);
            moneyManager.updateUsersList(userCallback.data);
            favoritesWidget.setMessage(
                userCallback.success,
                'Пользователь успешно добавлен в избранное!'
            );
        }
    };

    ApiConnector.addUserToFavorites(addUser, user);
};

favoritesWidget.removeUserCallback = (removeUser) => {
    // console.log(removeUser);
    const user = (userCallback) => {
        if (userCallback.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(userCallback.data);
            moneyManager.updateUsersList(userCallback.data);
            favoritesWidget.setMessage(
                userCallback.success,
                'Пользователь успешно удален из избранного!'
            );
        }
    };

    ApiConnector.removeUserFromFavorites(removeUser, user);
};
