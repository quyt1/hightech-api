const _ = require('lodash');
const GetErrorsMessagesValidate = require('../helper/get-errors-messages-validate');

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            email: { type: String, required: true },
            fullname: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: false },
            password: { type: String }
        },
        { timestamps: true }
    )

    const Users = mongoose.model('Users', schema);

    Users.validateData = (data) => {
        return new Promise(async (resolve, reject) => {
            let rules = {};
            if (_.has(data, '_id') || _.has(data, 'id')) {
                /*
                * Validate update
                */
                if (_.has(data, 'email')) {
                    rules.email = ['email'];
                }
                if (_.has(data, 'fullname')) {
                    rules.fullname = ['required'];
                }
                if (_.has(data, 'phone')) {
                    rules.phone = ['required'];
                }
                if (_.has(data, 'password')) {
                    rules.password = ['required', 'min:6'];
                }
            } else {
                /*
                * Validate create
                */
                rules = {
                    email: ['email'],
                    fullname: ['required'],
                    phone: ['required'],
                    password: ['required', 'min:6']
                };
            }

            let messageError = await GetErrorsMessagesValidate(data, rules);
            return resolve(messageError);
        });
    };

    Users.createData = async (params) => {
        let validate = await Users.validateData(params);

        if (validate) {
            throw new Error(validate);
        }

        return await Users.create(params);
    }

    Users.getOneByParams = async (params) => {
        return await Users.findOne(params);
    }
    

    return Users;
}
