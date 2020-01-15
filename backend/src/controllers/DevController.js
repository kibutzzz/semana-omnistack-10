const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        try {
            const { github_username, techs, latitude, longitude } = request.body;

            let dev = await Dev.findOne({ github_username })
            if (!dev) {
                const github_response = await axios.get(`https://api.github.com/users/${github_username}`);

                const { name = login, avatar_url, bio } = github_response.data;
                const techsArray = parseStringAsArray(techs);

                const location = {
                    type: "Point",
                    coordinates: [longitude, latitude]
                };

                dev = await Dev.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location
                });
            }
            return response.json(dev);
        } catch (e) {
            return response.status(500).json(e);
        }
    },

    async update(request, response) {

        try {
            const { github_username } = request.body;
            const dev = await Dev.findOne({ github_username });

            if (!dev) return response.status(404).send();

            let techsArray = request.body.techs ? parseStringAsArray(request.body.techs) : dev.techs;
            const { bio = dev.bio, name = dev.name, avatar_url = dev.avatar_url } = request.body;

            //TODO update location.coordinates
            const newData = { techs: techsArray, bio, name, avatar_url };
            const updated = await Dev.findOneAndUpdate(github_username, newData, {
                new: true
            });

            return response.status(200).json(updated);
        } catch (e) {

            return response.status(500).send();
        }
    },

    async destroy(request, response) {
        const { id } = request.params;

        await Dev.findByIdAndRemove(id, (err, dev) => {
            if (err) return response.status(500).send();

            if (!dev) response.status(404).send();

            return response.status(204).json({ message: "Dev removido com sucesso", id: dev._id });
        });

    }
}