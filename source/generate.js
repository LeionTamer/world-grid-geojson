const degrees = 3

const featureArray = []

const { polygon, featureCollection } = require('@turf/helpers')
const fs = require('fs')

for (let lat = -90; lat <= 90; lat += degrees) {
  for (let lon = -180; lon <= 180 - degrees; lon += degrees) {
    const latNext = (lat + degrees) <= 90 ? lat + degrees : 90
    const lonNext = (lon + degrees) <= 180 ? lon + degrees : 180

    // create a geojson polygon feature using TurfJS
    const feature = polygon([[[lon, lat], [lonNext, lat], [lonNext, latNext], [lon, latNext], [lon, lat]]])
    featureArray.push(feature)
  }
}

// create a geojson feature collection using TurfJS
collection = featureCollection(featureArray)

// create a file using the degrees as a reference
fs.writeFile(`../${degrees}-world-grid.geojson`, JSON.stringify(collection), function (err) {
  if (err) {
    console.error(err)
  }
})