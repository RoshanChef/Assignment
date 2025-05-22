function getDistanceInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in kilometers
    const rad = Math.PI / 180;

    const dLat = (lat2 - lat1) * rad;
    const dLon = (lon2 - lon1) * rad;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.asin(Math.sqrt(a));

    // distance in kilometers
    return R * c;
}

module.exports = getDistanceInKm; 