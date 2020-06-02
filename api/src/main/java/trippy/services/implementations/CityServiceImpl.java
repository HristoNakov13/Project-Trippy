package trippy.services.implementations;

import org.springframework.stereotype.Service;
import trippy.domain.entities.City;
import trippy.repositories.CityRepository;
import trippy.services.CityService;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class CityServiceImpl implements CityService {

    private final CityRepository cityRepository;

    public CityServiceImpl(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public List<City> getAllCities() {
        return this.cityRepository.findAll();
    }

    @Override
    public City getCityById(Long id) {
        return this.cityRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("City not found."));
    }
}
