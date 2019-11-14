package br.com.sca.gateway.repository;
import br.com.sca.gateway.domain.RiscoBarragem;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the RiscoBarragem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RiscoBarragemRepository extends MongoRepository<RiscoBarragem, String> {

}
