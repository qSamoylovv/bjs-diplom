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
    if (profile.success) {
        ProfileWidget.showProfile(profile.data);
    }
});

const ratesBoard = new RatesBoard();

const apiConnectorGetStocks = () => {
    ApiConnector.getStocks((value) => {
        // console.log(value);
        if (value.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(value.data);
        }
    });
};

apiConnectorGetStocks();
setInterval(apiConnectorGetStocks(), 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (money) => {
    const pay = (moneyPayment) => {
        // console.log(moneyPayment);
        if (moneyPayment.success) {
            ProfileWidget.showProfile(moneyPayment.data);
            moneyManager.setMessage(moneyPayment.success, 'Баланс пополнен!');
        } else {
            moneyManager.setMessage(moneyPayment.success, moneyPayment.error);
        }
    };

    ApiConnector.addMoney(money, pay);
};

moneyManager.conversionMoneyCallback = (money) => {
    const conversionMoney = (moneyConversion) => {
        console.log(moneyConversion);
        if (moneyConversion.success) {
            ProfileWidget.showProfile(moneyConversion.data);
            moneyManager.setMessage(
                moneyConversion.success,
                'Конвертация прошла успешно!'
            );
        } else {
            moneyManager.setMessage(
                moneyConversion.success,
                moneyConversion.error
            );
        }
    };

    ApiConnector.convertMoney(money, conversionMoney);
};

moneyManager.sendMoneyCallback = (money) => {
    const sendMoneyTransaction = (moneyTransfer) => {
        // console.log(moneyTransfer);
        if (moneyTransfer.success) {
            ProfileWidget.showProfile(moneyTransfer.data);
            moneyManager.setMessage(
                moneyTransfer.success,
                'Перевод выполнен успешно!'
            );
        } else {
            moneyManager.setMessage(moneyTransfer.success, moneyTransfer.error);
        }
    };

    ApiConnector.transferMoney(money, sendMoneyTransaction);
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((favoriteData) => {
    // console.log(favoriteData);
    if (favoriteData.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(favoriteData.data);
    }

    moneyManager.updateUsersList(favoriteData.data);
});

favoritesWidget.addUserCallback = (addUser) => {
    // console.log(addUser);
    const user = (userCallback) => {
        if (userCallback.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(userCallback.data);
            moneyManager.updateUsersList(userCallback.data);
            favoritesWidget.setMessage(
                userCallback.success,
                'Пользователь успешно добавлен в избранное!'
            );
        } else {
            favoritesWidget.setMessage(
                userCallback.success,
                userCallback.error
            );
        }
    };

    ApiConnector.addUserToFavorites(addUser, user);
};

favoritesWidget.removeUserCallback = (removeUser) => {
    // console.log(removeUser);
    const user = (userCallback) => {
        if (userCallback.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(userCallback.data);
            moneyManager.updateUsersList(userCallback.data);
            favoritesWidget.setMessage(
                userCallback.success,
                'Пользователь успешно удален из избранного!'
            );
        } else {
            favoritesWidget.setMessage(
                userCallback.success,
                userCallback.error
            );
        }
    };

    ApiConnector.removeUserFromFavorites(removeUser, user);
};
