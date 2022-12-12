const BuildQuery = require('../helper/build-query-nosql');
const Constants = require('../constants');


module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            title: { type: String, required: true },
            icon : { type: String, required: true },
            type: { type: Number, required: true },
            active : { type: Boolean, required: true, default: true },
        },
        { timestamps: true }
    )

    const Categories = mongoose.model('Categories', schema);

    Categories.getAll = async (params) => {
        if(!params.all || params.all == false) {
            let query = {
                active: true
            }
            params = {...params,...query }
        }
        const { filter, skip, limit, sort, projection, population, hasPaging } = await BuildQuery(params);
        if (hasPaging) {
            return Categories.paginate(filter, {
                offset: skip,
                limit: limit,
                select: projection,
                sort: sort,
                populate: population,
                customLabels: Constants.CUSTOM_LABELS_PAGINATION,
            })
        } else {
            return Categories.find(filter)
                .sort(sort)
                .select(projection)
                .populate(population).lean();
        }
    }

    Categories.createData = async (params) => {
        return await Categories.create(params);
    }

    Categories.getByID = async (params) => {
        return await Categories.findById(params);
    }

    Categories.getOneByParams = async (params) => {
        return await Categories.findOne(params);
    }

    Categories.updateData = async (id, params) => {
        return await Categories.findByIdAndUpdate(id, params).then((data) => {
            return Categories.findById(id);
        });
    }

    Categories.deleteOne = async (id) => {
        // return await Categories.findByIdAndDelete(id);
        return await Categories.findByIdAndUpdate(id, {active : false}).then((data) => {
            return Categories.findById(id);
        });
    }
    

    return Categories;
}
