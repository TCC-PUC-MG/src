package br.com.sca.gateway.repository;
import br.com.sca.gateway.domain.Barragem;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Barragem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BarragemRepository extends MongoRepository<Barragem, String> {

}
