import Distance from "geo-distance";
const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };
  
  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: records } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, records, totalPages, currentPage };
  };

    
  const getDriverByLocation = (drivers,specificLocation) => {
   
    let availableDriversWithInSpecLocation =[];
              
    drivers.forEach(driver => {

        const driverCordinate = {lat: driver.latitude,lon: driver.longitude};
        const getDistance = Distance.between(specificLocation, driverCordinate);

              if (parseFloat(getDistance.radians).toFixed(2)  == parseFloat(Distance("3 km").radians).toFixed(2)) {
                  availableDriversWithInSpecLocation.push(driver);
              } 
    });
  
    return availableDriversWithInSpecLocation;
  };

  module.exports = {getPagination,getPagingData,getDriverByLocation};