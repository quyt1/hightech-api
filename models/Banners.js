const BuildQuery = require('../helper/build-query-nosql');
const Constants = require('../constants');

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            image : { type: String, required: true },
            product : { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: false },
        },
        { timestamps: true }
    )

    const Banners = mongoose.model('Banners', schema);

    Banners.getAll = async (params) => {
        const { filter, skip, limit, sort, projection, population, hasPaging } = await BuildQuery(params);
        if (hasPaging) {
            return Banners.paginate(filter, {
                offset: skip,
                limit: limit,
                select: projection,
                sort: sort,
                populate: population,
                customLabels: Constants.CUSTOM_LABELS_PAGINATION,
            })
        } else {
            return Banners.find(filter)
                .sort(sort)
                .select(projection)
                .populate(population).lean();
        }
    }

    Banners.createData = async (params) => {
        return await Banners.create(params);
    }

    Banners.getByID = async (id) => {
        return await Banners.findById(id);
    }

    Banners.getOneByParams = async (params) => {
        return await Banners.findOne(params);
    }

    Banners.updateData = async (id, params) => {
        return await Banners.findByIdAndUpdate(id, params).then((data) => {
            return Banners.findById(id);
        });
    }

    Banners.deleteOne = async (id) => {
        return await Banners.findByIdAndDelete(id);
    }



    return Banners;
}
