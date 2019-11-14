package br.com.sca.segcomunicacao.repository;
import br.com.sca.segcomunicacao.domain.AlertaOrgao;
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
