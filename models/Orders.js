const BuildQuery = require('../helper/build-query-nosql');
const Constants = require('../constants');

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
            items: [
                {
                    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
                    quantity: { type: Number, required: true },
                }
            ],
            totalPrice: {
                type: Number,
                required: true
            },
            isPaid: {
                type: Boolean,
                required: true,
                default: false
            },
            paidAt: {
                type: Date,
            },
            isDelivered: {
                type: Boolean,
                required: true,
                default: false
            },
            deliveredAt: {
                type: Date,
            },
            shippingAddress: {
                address: { type: String, required: true },
                city: { type: String, required: true },
                postalCode: { type: String, required: true },
                country: { type: String, required: true },
            },
            paymentMethod: {
                type: String,
            },
            phone: {
                type: String,
                required: true
            },
            status: {
                type: String,
                default: Constants.ORDER_STATUS.NotProcessed,
                enum: [
                    Constants.ORDER_STATUS.NotProcessed,
                    Constants.ORDER_STATUS.Processing,
                    Constants.ORDER_STATUS.Shipping,
                    Constants.ORDER_STATUS.Delivered,
                    Constants.ORDER_STATUS.Cancelled
                ]
            }
        },
        { timestamps: true }
    )

    const Orders = mongoose.model('Orders', schema);

    Orders.getAll = async (params) => {
        const { filter, skip, limit, sort, projection, population, hasPaging } = await BuildQuery(params);
        if (hasPaging) {
            return Orders.paginate(filter, {
                offset: skip,
                limit: limit,
                select: projection,
                sort: sort,
                populate: population,
                customLabels: Constants.CUSTOM_LABELS_PAGINATION,
            })
        } else {
            return Orders.find(filter)
                .sort(sort)
                .select(projection)
                .populate(population).lean();
        }
    }

    Orders.getByUser = async (req) => {
        let query = {
            user: req.user.id
        }
        req.query = {...req.query,...query }
        const { filter, skip, limit, sort, projection, population, hasPaging } = await BuildQuery(req.query);
        if (hasPaging) {
            return Orders.paginate(filter, {
                offset: skip,
                limit: limit,
                select: projection,
                sort: sort,
                populate: population,
                customLabels: Constants.CUSTOM_LABELS_PAGINATION,
            })
        } else {
            return Orders.find(filter)
                .sort(sort)
                .select(projection)
                .populate(population).lean();
        }
    }

    Orders.createData = async (params) => {
        return await Orders.create(params);
    }

    Orders.getOneByParams = async (params) => {
        let query = {
            populate : 'items.product'
        }
        query = {...query,...params }
        const { filter, skip, limit, sort, projection, population, hasPaging } = await BuildQuery(query);
        return await Orders.findOne(filter)
            .sort(sort)
            .select(projection)
            .populate(population).lean();
    }

    Orders.getByID = async (id) => {
        return await Orders.findById(id);
    }

    Orders.updateData = async (id, params) => {
        return await Orders.findByIdAndUpdate(id, params).then((data) => {
            return Orders.findById(id);
        });
    }


    return Orders;
}
