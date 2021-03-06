package br.com.sca.monitbarragem.repository;
import br.com.sca.monitbarragem.domain.Localidade;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Localidade entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalidadeRepository extends MongoRepository<Localidade, String> {

}
