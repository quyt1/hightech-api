const BuildQuery = require('../helper/build-query-nosql');
const Constants = require('../constants');
let _ = require('lodash');

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            title: { type: String, required: true },
            description: { type: Array, required: false },
            images: { type: Array, required: false },
            costPrice: { type: Number, required: true },
            salePrice: { type: Number, required: false },
            salePercent: { type: Number, required: false },
            quantity: { type: Number, required: false, default: 100 },
            sold : { type: Number, required: false, default: 0 },
            specifications: { type: JSON, required: true },
            category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true },
            brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brands', required: true },
        },
        { timestamps: true }
    )

    const Products = mongoose.model('Products', schema);

    Products.getAll = async (params) => {
        if (params.type && params.type != 0) {
            const { Categories } = require('../models');
            let matchCategory = await Categories.getOneByParams({ type: params.type });
            let query = {
                category: matchCategory._id
            }
            params = {...params,...query }
        }
        if (params.brands) {
            // let brands = _.isString(params.brands) ? JSON.parse(params.brands) : params.brands;
            let query = {
                brand: params.brands
            }
            params = {...params,...query }
        }
        const { filter, skip, limit, sort, projection, population, hasPaging } = await BuildQuery(params);
        if (hasPaging) {
            return Products.paginate(filter, {
                offset: skip,
                limit: limit,
                select: projection,
                sort: sort,
                populate: population,
                customLabels: Constants.CUSTOM_LABELS_PAGINATION,
            })
        } else {
            return Products.find(filter)
                .sort(sort)
                .select(projection)
                .populate(population).lean();
        }

    }

    Products.createData = async (params) => {
        return await Products.create(params);
    }

    Products.getByID = async (params) => {
        return await Products.findById(params).lean();
    }

    Products.getOneByParams = async (params) => {
        return await Products.findOne(params);
    }

    Products.updateData = async (id, params) => {
        return await Products.findByIdAndUpdate(id, params).then((data) => {
            return Products.findById(id);
        });
    }

    Products.deleteOne = async (id) => {
        return await Products.findByIdAndDelete(id);
    }


    return Products;
}
