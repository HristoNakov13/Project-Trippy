package trippy.services;

import trippy.domain.entities.City;

import java.util.List;

public interface CityService {

    /**
     * Fetches all available cities that are written on the database.
     *
     * @return {@link List<City>} all cities.
     */
    List<City> getAllCities();
}
