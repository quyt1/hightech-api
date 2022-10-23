const { Categories } = require('../models');
const Constants = require('../constants');

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    let data = [
      {
        "title": "Vi xử lý",
        "type" : Constants.CATEGORY_TYPE.CPU,
        "icon": "https://i.im.ge/2022/10/14/27O9LM.ic-cpu.png"
      },
      {
        "title": "Bo mạch chủ",
        "type" : Constants.CATEGORY_TYPE.MAINBOARD,
        "icon": "https://i.im.ge/2022/10/14/27OjxY.ic-mainboard.png"
      },
      {
        "title": "RAM",
        "type" : Constants.CATEGORY_TYPE.RAM,
        "icon": "https://i.im.ge/2022/10/14/27OmnD.ic-ram.png"
      },
      {
        "title": "Ổ HDD",
        "type" :  Constants.CATEGORY_TYPE.HDD,
        "icon": "https://i.im.ge/2022/10/14/27OPkq.ic-hdd.png"
      },
      {
        "title": "Ổ SSD",
        "type" :  Constants.CATEGORY_TYPE.SSD,
        "icon": "https://i.im.ge/2022/10/14/27Oyup.ic-ssd.png"
      },
      {
        "title": "VGA",
        "type" :  Constants.CATEGORY_TYPE.VGA,
        "icon": "https://i.im.ge/2022/10/14/27OA9P.ic-vga.png"
      },
      {
        "title": "Nguồn",
        "type" :  Constants.CATEGORY_TYPE.POWER,
        "icon": "https://i.im.ge/2022/10/14/27OCR1.ic-power.png"
      },
      {
        "title": "Vỏ case",
        "type" :  Constants.CATEGORY_TYPE.CASE,
        "icon": "https://i.im.ge/2022/10/14/27OxQf.ic-case.png"
      },
      {
        "title": "Tản nhiệt",
        "type" :  Constants.CATEGORY_TYPE.COOLER,
        "icon": "https://i.im.ge/2022/10/14/27O3Lm.ic-cooler.png"
      },
      {
        "title": "Màn hình",
        "type" :  Constants.CATEGORY_TYPE.MONITOR,
        "icon": "https://i.im.ge/2022/10/14/27OY3r.ic-monitor.png"
      },
      {
        "title": "Bàn phím",
        "type" :  Constants.CATEGORY_TYPE.KEYBOARD,
        "icon": "https://i.im.ge/2022/10/14/27ObnW.ic-keyboard.png"
      },
      {
        "title": "Chuột",
        "type" :  Constants.CATEGORY_TYPE.MOUSE,
        "icon": "https://i.im.ge/2022/10/14/27ONPC.ic-mouse.png"
      },
      {
        "title": "Tai nghe",
        "type" :  Constants.CATEGORY_TYPE.HEADPHONE,
        "icon": "https://i.im.ge/2022/10/14/27O6d4.ic-headphone.png"
      }
    ]

    await Categories.create(data);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    const session = client.startSession();
    try{
      await session.withTransaction(async () => {
        await Categories.deleteMany({});
      })
    } finally {
      session.endSession();
    }
  }
};
