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
            ]
        },
        { timestamps: true }
    )

    const Carts = mongoose.model('Carts', schema);

    Carts.createData = async (params) => {
        return await Carts.create(params);
    }

    Carts.getOneByParams = async (params) => {
        let query = {
            populate : 'items.product'
        }
        params = {...params,...query }
        const { filter, skip, limit, sort, projection, population, hasPaging } = await BuildQuery(params);
        return await Carts.findOne(filter)
            .sort(sort)
            .select(projection)
            .populate(population)
    }

    Carts.updateData = async (id, params) => {
        return await Carts.findByIdAndUpdate(id, params).then((data) => {
            return Carts.findById(id);
        });
    }


    return Carts;
}
