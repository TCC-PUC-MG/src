package br.com.sca.monitbarragem.repository;
import br.com.sca.monitbarragem.domain.EventoRisco;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the EventoRisco entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventoRiscoRepository extends MongoRepository<EventoRisco, String> {

}
