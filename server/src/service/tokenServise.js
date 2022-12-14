const jwt = require('jsonwebtoken');
const Token = require('../models/tokenModel')

class TokenServise {
    static generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken, 
            refreshToken
        };
    }

    static async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await Token.create({user: userId, refreshToken});
        return token;
    }
}

module.exports = TokenServise;