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

    
  const getDriverByLocation = (drivers,specificLocation,distanceInKm=3) => {
   
    let availableDriversWithInSpecLocation =[];
              
    drivers.forEach(driver => {

        const driverCordinate = {lat: driver.latitude,lon: driver.longitude};
        const distanceOf2Drivers = Distance.between(specificLocation, driverCordinate);

    
 
      const distanceValueInKm=
          (distanceOf2Drivers.unit == "km")
            ? parseFloat(distanceOf2Drivers.human_readable().distance, 10)
            : parseFloat(distanceOf2Drivers.human_readable().distance, 10)/1000;
          
            console.log(distanceValueInKm);

          const distanceWithin3km     =  parseFloat(Distance(distanceInKm+' km').human_readable().distance, 10);
         
          if (distanceValueInKm  == distanceWithin3km) {
              availableDriversWithInSpecLocation.push(driver);
           } 
        

             
    });
  
    return availableDriversWithInSpecLocation;
  };

  const getClosestDrivers = (availableDrivers,specificDriverLocation)=>{
    let driversWithinDistance=[];
          availableDrivers.forEach(driver => {

            const driverLocation = {
                lat: driver.latitude,
                lon: driver.longitude,
              };
              const distanceOf2Drivers = Distance.between(
                specificDriverLocation,
                driverLocation
              );

              const distanceValue=
              (distanceOf2Drivers.unit == "km")
                ? parseFloat(distanceOf2Drivers.human_readable().distance, 10)
                : parseFloat(distanceOf2Drivers.human_readable().distance, 10)/1000;
             const distanceUnit = 'km';
            let newDriver =driver.dataValues;
            newDriver['distance'] ={ distanceValue, distanceUnit};
            
             driversWithinDistance.push(newDriver);

        });
        return sortedAvailableDrivers(driversWithinDistance);
  };

  const sortedAvailableDrivers = (drivers)=>{
    const sortedAvailableDrivers =  drivers.sort((a, b) => {

      const driverOne = a.distance.distanceValue,
        driverTwo = b.distance.distanceValue;
      if (driverOne < driverTwo) return -1;
      if (driverOne > driverTwo) return 1;
      return 0;
    });
    return sortedAvailableDrivers.slice(0, 3);
  };

  module.exports = {getPagination,getPagingData,getDriverByLocation,getClosestDrivers};