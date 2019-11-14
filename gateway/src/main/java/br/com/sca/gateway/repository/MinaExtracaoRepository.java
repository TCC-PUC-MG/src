package br.com.sca.gateway.repository;
import br.com.sca.gateway.domain.MinaExtracao;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the MinaExtracao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MinaExtracaoRepository extends MongoRepository<MinaExtracao, String> {

}
