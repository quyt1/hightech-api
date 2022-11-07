const BuildQuery = require('../helper/build-query-nosql');
const Constants = require('../constants');

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            user : { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
            product : { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
        },
        { timestamps: true }
    )

    const Favorites = mongoose.model('Favorites', schema);

    Favorites.getAll = async (params) => {
        const { filter, skip, limit, sort, projection, population, hasPaging } = await BuildQuery(params);
        if (hasPaging) {
            return Favorites.paginate(filter, {
                offset: skip,
                limit: limit,
                select: projection,
                sort: sort,
                populate: population,
                customLabels: Constants.CUSTOM_LABELS_PAGINATION,
            })
        } else {
            return Favorites.find(filter)
                .sort(sort)
                .select(projection)
                .populate(population).lean();
        }
    }

    Favorites.getByUser = async (req) => {
        let query = {
            user: req.user.id
        }
        req.query = {...req.query,...query }
        const { filter, skip, limit, sort, projection, population, hasPaging } = await BuildQuery(req.query);
        if (hasPaging) {
            return Favorites.paginate(filter, {
                offset: skip,
                limit: limit,
                select: projection,
                sort: sort,
                populate: population,
                customLabels: Constants.CUSTOM_LABELS_PAGINATION,
            })
        } else {
            return Favorites.find(filter)
                .sort(sort)
                .select(projection)
                .populate(population).lean();
        }
    }

    Favorites.getMyFavoriteProducts = async (req) => {
        let query = {
            user: req.user.id,
        }
        req.query = {...req.query,...query }
        if (!req.query.populate) {
            req.query.populate = 'product';
        }
        const { filter, skip, limit, sort, projection, population, hasPaging } = await BuildQuery(req.query);
        if (hasPaging) {
            return Favorites.paginate(filter, {
                offset: skip,
                limit: limit,
                select: projection,
                sort: sort,
                populate: population,
                customLabels: Constants.CUSTOM_LABELS_PAGINATION,
            }).then(favorites => {
                return favorites.map(favorite => favorite.product);
            })
        } else {
            return Favorites.find(filter)
                .sort(sort)
                .select(projection)
                .populate(population).lean().then(favorites => {
                    return favorites.map(favorite => favorite.product);
                })
        }
    }



    Favorites.createData = async (params) => {
        return await Favorites.create(params);
    }

    Favorites.getByID = async (id) => {
        return await Favorites.findById(id);
    }

    Favorites.getOneByParams = async (params) => {
        return await Favorites.findOne(params);
    }

    Favorites.updateData = async (id, params) => {
        return await Favorites.findByIdAndUpdate(id, params).then((data) => {
            return Favorites.findById(id);
        });
    }

    Favorites.deleteOne = async (id) => {
        return await Favorites.findByIdAndDelete(id);
    }



    return Favorites;
}
