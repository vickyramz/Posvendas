export default class UserData {
    static userData = {};

    static setUserData = userData => {
        UserData.userData = userData;
    };

    static getUserData = () => {
        return UserData.userData;
    };
}