package br.com.sca.gateway.repository;
import br.com.sca.gateway.domain.NivelSeguranca;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the NivelSeguranca entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NivelSegurancaRepository extends MongoRepository<NivelSeguranca, String> {

}
