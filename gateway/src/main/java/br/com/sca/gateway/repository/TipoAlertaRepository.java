package br.com.sca.gateway.repository;
import br.com.sca.gateway.domain.TipoAlerta;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the TipoAlerta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoAlertaRepository extends MongoRepository<TipoAlerta, String> {

}
