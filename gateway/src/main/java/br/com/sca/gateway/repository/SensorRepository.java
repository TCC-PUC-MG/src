package br.com.sca.gateway.repository;
import br.com.sca.gateway.domain.Sensor;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Sensor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SensorRepository extends MongoRepository<Sensor, String> {

}
