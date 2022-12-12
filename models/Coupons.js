const BuildQuery = require('../helper/build-query-nosql');
const Constants = require('../constants');

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            title: { type: String, required: true },
            code: { type: String, required: true, unique: true, index: true },
            value : { type: Number, required: true },
            expiredAt : { type: Date, required: true },
            quantity : { type: Number, required: true },
            used : { type: Number, required: true, default: 0 },
            active : { type: Boolean, required: true, default: true },
        },
        { timestamps: true }
    )

    const Coupons = mongoose.model('Coupons', schema);

    Coupons.getAll = async (params) => {
        const { filter, skip, limit, sort, projection, population, hasPaging } = await BuildQuery(params);
        if (hasPaging) {
            return Coupons.paginate(filter, {
                offset: skip,
                limit: limit,
                select: projection,
                sort: sort,
                populate: population,
                customLabels: Constants.CUSTOM_LABELS_PAGINATION,
            })
        } else {
            return Coupons.find(filter)
                .sort(sort)
                .select(projection)
                .populate(population).lean();
        }
    }

    Coupons.createData = async (params) => {
        return await Coupons.create(params);
    }

    Coupons.getByID = async (id) => {
        return await Coupons.findById(id);
    }

    Coupons.getOneByParams = async (params) => {
        return await Coupons.findOne(params);
    }

    Coupons.updateData = async (id, params) => {
        return await Coupons.findByIdAndUpdate(id, params).then((data) => {
            return Coupons.findById(id);
        });
    }

    Coupons.deleteOne = async (id) => {
        // return await Coupons.findByIdAndDelete(id);
        return await Coupons.findByIdAndUpdate(id, {active : false}).then((data) => {
            return Coupons.findById(id);
        });
    }

    return Coupons;
}
