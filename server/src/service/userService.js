const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailServise = require('../service/mailServise');
const TokenServise = require('../service/tokenServise');
const UserDto = require('../dtos/userDto');

class UserService {
    static async signUp(email, password) {
        const candidate = await User.findOne({email});
        if (candidate) {
            // throw new Error('Пользователь с таким email уже существует')
            console.log('')
        }

        const hashPassword = await bcrypt.hash(password, 7);
        const activationLink = uuid.v4();

        const user = await User.create({email, password: hashPassword, activationLink})
        
        // FIXME: activationLink нужно изменить
        await MailServise.sendActivationMail(email, activationLink);

        const userDto = new UserDto(user); // id, email, isActivated
        const tokens = TokenServise.generateTokens({ ...userDto });
        await TokenServise.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = UserService;