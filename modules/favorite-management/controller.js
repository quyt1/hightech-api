const { success, error } = require('../../helper/response')
const { Favorites } = require('../../models')
const Validate = require('../../helper/get-errors-messages-validate');


async function getAll(req, res) {
    let favorites = await Favorites.getAll(req.params);
    return success(req, res, favorites);
}

async function getFavorites(req, res) {
    let favorites = await Favorites.getByUser(req);
    return success(req, res, favorites);
}

async function checkFavorite(req, res) {
    let favorite = await Favorites.getOneByParams({ product: req.params.id, user: req.user.id });
    if (!favorite) {
        return success(req, res, {});
    }
    return success(req, res, favorite);
}

async function favorite(req, res) {
    let rules = {
        productId: ['required'],
        favorite: ['required', 'boolean']
    }

    let validate = await Validate(req.body, rules);

    if(validate){
        return error(req, res, validate);
    }
    if (req.body.favorite === true) {
        let favorite = await Favorites.getOneByParams({ product: req.body.productId, user: req.user.id });
        if (favorite) {
            return error(req, res, "Sản phẩm đã được thêm vào danh sách yêu thích");
        }
        let newFavorite = await Favorites.createData({
            product: req.body.productId,
            user: req.user.id
        });
        return success(req, res, newFavorite);
    }else {
        let favorite = await Favorites.getOneByParams({ product: req.body.productId, user: req.user.id });
        if (!favorite) {
            return error(req, res, "Sản phẩm chưa được thêm vào danh sách yêu thích");
        }
        await Favorites.deleteOne(favorite._id);
        return success(req, res, {});
    }
    

}

module.exports = {
    getAll,
    getFavorites,
    checkFavorite,
    favorite
}