package br.com.sca.gateway.repository;
import br.com.sca.gateway.domain.AlertaEnviados;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the AlertaEnviados entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlertaEnviadosRepository extends MongoRepository<AlertaEnviados, String> {

}
