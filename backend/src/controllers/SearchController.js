const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(request, response) {
    //buscar devs em 10km
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringAsArray(techs);
    const devs = await Dev.find({
      $or: [
        { techs: { $in: techsArray } },
        { $expr: { $eq: [0, techsArray.length] } }
      ],
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return response.json({ devs });
  }
};
