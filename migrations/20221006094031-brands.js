const { Brands,Categories } = require('../models');
const Constants = require('../constants');

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    let data = [
      {
        "title": "Intel",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.CPU}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "AMD",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.CPU}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Asus",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.MAINBOARD}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Gigabyte",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.MAINBOARD}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "G.Skill",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.RAM}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Kingston",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.RAM}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "WD",
        "category":   await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.HDD}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Kingston",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.HDD}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "SanDisk",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.SSD}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Samsung",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.SSD}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Gigabyte",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.VGA}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "MSI",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.VGA}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Gigabyte",
        "category":await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.POWER}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Cooler Master",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.POWER}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Corsair",
        "category":await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.CASE}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Xigmatek",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.CASE}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Noctua",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.COOLER}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Cooler Master",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.COOLER}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Asus",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.MONITOR}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Ms",
        "category":await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.MONITOR}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Dareu",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.KEYBOARD}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Logitech",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.KEYBOARD}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Logitech",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.MOUSE}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Dareu",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.MOUSE}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Corsair",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.HEADPHONE}).then((data) => {
          return data._id;
        })
      },
      {
        "title": "Msi",
        "category": await Categories.getOneByParams({type: Constants.CATEGORY_TYPE.HEADPHONE}).then((data) => {
          return data._id;
        })
      }
    ]

    await Brands.insertMany(data);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await Brands.deleteMany({});
      })
    } finally {
      session.endSession();
    }
  }
};
