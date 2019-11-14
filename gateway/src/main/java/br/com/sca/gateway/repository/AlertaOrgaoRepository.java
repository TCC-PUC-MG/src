package br.com.sca.gateway.repository;
import br.com.sca.gateway.domain.AlertaOrgao;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the AlertaOrgao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlertaOrgaoRepository extends MongoRepository<AlertaOrgao, String> {

}
