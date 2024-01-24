export const apiKey = 'b0b83ecec3fc48b6884ad12571f4e320'

export const reverseGeocode = async (latitude, longitude) => {
  const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`
  const res = await fetch(reverseGeocodingUrl)
  const data = await res.json()
  return data.features[0]?.properties.formatted
}
