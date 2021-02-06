const axios = require("axios");
const AppError = require("./appError");

const getCoordsForAddress = async (address) => {
	let data;
	try {
		const url = "https://api.mapbox.com/geocoding/v5";
		const endPoint = "mapbox.places";
		const searchText = encodeURIComponent(address);
		const mapbox_Key = process.env.MAPBOX_KEY;

		const response = await axios({
			method: "GET",
			url: `${url}/${endPoint}/${searchText}.json/?access_token=${mapbox_Key}`,
		});
		data = await response.data;
	} catch (err) {
		throw new AppError("Something went wrong", 500);
	}

	if (!data || data.status === "ZERO_RESULTS") {
		throw new AppError(
			"Could not find location for the specified address.",
			422
		);
	}

	const [lng, lat] = data.features[0].center;
	const coordinate = { lng, lat };
	return coordinate;
};

module.exports = getCoordsForAddress;
