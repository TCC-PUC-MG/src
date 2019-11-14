package br.com.sca.gateway.repository;
import br.com.sca.gateway.domain.SensorLeitura;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the SensorLeitura entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SensorLeituraRepository extends MongoRepository<SensorLeitura, String> {

}
