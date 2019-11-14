package br.com.sca.gateway.repository;
import br.com.sca.gateway.domain.OrgaoGoverno;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the OrgaoGoverno entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrgaoGovernoRepository extends MongoRepository<OrgaoGoverno, String> {

}
