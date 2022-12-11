const UserService = require('../service/userService');


class UserController {
    static async signUp(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await UserService.signUp(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (error) {
            console.log(error)
        }
    }

    static async signIn(req, res, next) {
        try {

        } catch (error) {
            
        }
    }

    static async logout(req, res, next) {
        try {

        } catch (error) {
            
        }
    }

    static async active(req, res, next) {
        try {

        } catch (error) {
            
        }
    }

    static async refresh(req, res, next) {
        try {

        } catch (error) {
            
        }
    }

    static async getUsers(req, res, next) {
        try {
            res.json('Users');
        } catch (error) {
            
        }
    }
}

module.exports = UserController;