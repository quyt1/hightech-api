const _ = require('lodash');
const GetErrorsMessagesValidate = require('../helper/get-errors-messages-validate');
const BuildQuery = require('../helper/build-query-nosql');
const Constants = require('../constants');

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            email: { type: String, required: true },
            fullname: { type: String, required: true },
            phone: { type: String, required: true },
            password: { type: String },
            role: {
                type: String,
                enum: ['customer', 'admin', 'superadmin'],
                default: 'customer'
            },
            avatar: { type: String, required: false , default: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png'},
            address: { type: String, required: false },
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

    Users.getAll = async (params) => {
        const { filter, skip, limit, sort, projection, population, hasPaging } = await BuildQuery(params);
        if (hasPaging) {
            return Users.paginate(filter, {
                offset: skip,
                limit: limit,
                select: projection,
                sort: sort,
                populate: population,
                customLabels: Constants.CUSTOM_LABELS_PAGINATION,
            })
        } else {
            return Users.find(filter)
                .sort(sort)
                .select(projection)
                .populate(population).lean();
        }
    }

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

    Users.getByID = async (params) => {
        return await Users.findById(params);
    }

    Users.updateData = async (id, params) => {
        return await Users.findByIdAndUpdate(id, params).then((data) => {
            return Users.findById(id);
        });
    }

    Users.deleteOne = async (id) => {
        return await Users.findByIdAndDelete(id);
    }



    return Users;
}
