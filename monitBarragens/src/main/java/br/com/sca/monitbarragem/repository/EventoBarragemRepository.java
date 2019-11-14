package br.com.sca.monitbarragem.repository;
import br.com.sca.monitbarragem.domain.EventoBarragem;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the EventoBarragem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventoBarragemRepository extends MongoRepository<EventoBarragem, String> {

}
