const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/46831dc6912e02b3c953fbdd42b18b00/' + latitude + ',' + longitude;

	request({ url, json: true }, (error, { body }) => {
		const { error: responseError, daily, currently } = body;

		if (error) {
			callback('Unable to connect to weather service!');
		} else if (responseError) {
			callback('Unable to find location!');
		} else {
			const forecastMsg =
				daily.data[0].summary +
				' It is currently ' +
				currently.temperature +
				' degress out.  There is a ' +
				currently.precipProbability +
				'% chance of rain.';
			callback(undefined, forecastMsg);
		}
	});
};

module.exports = forecast;
