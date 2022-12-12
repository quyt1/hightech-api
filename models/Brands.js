const BuildQuery = require('../helper/build-query-nosql');
const Constants = require('../constants');

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            title: { type: String, required: true },
            active : { type: Boolean, required: true, default: true },
            category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true },
        },
        { timestamps: true }
    )

    const Brands = mongoose.model('Brands', schema);

    Brands.getAll = async (params) => {
        if (params.type && params.type != 0) {
            const { Categories } = require('../models');
            let matchCategory = await Categories.getOneByParams({ type: params.type });
            let query = {
                category: matchCategory._id,
            }
            params = {...params,...query }
        }
        if(!params.all || params.all == false) {
            let query = {
                active: true
            }
            params = {...params,...query }
        }
        const { filter, skip, limit, sort, projection, population, hasPaging } = await BuildQuery(params);
        if (hasPaging) {
            return Brands.paginate(filter, {
                offset: skip,
                limit: limit,
                select: projection,
                sort: sort,
                populate: population,
                customLabels: Constants.CUSTOM_LABELS_PAGINATION,
            })
        } else {
            return Brands.find(filter)
                .sort(sort)
                .select(projection)
                .populate(population).lean();
        }
    }

    Brands.createData = async (params) => {
        return await Brands.create(params);
    }

    Brands.getByID = async (id) => {
        return await Brands.findById(id);
    }

    Brands.getOneByParams = async (params) => {
        return await Brands.findOne(params);
    }

    Brands.updateData = async (id, params) => {
        return await Brands.findByIdAndUpdate(id, params).then((data) => {
            return Brands.findById(id);
        });
    }

    Brands.deleteOne = async (id) => {
        // return await Brands.findByIdAndDelete(id);
        return await Brands.findByIdAndUpdate(id, {active : false}).then((data) => {
            return Brands.findById(id);
        });
    }



    return Brands;
}
