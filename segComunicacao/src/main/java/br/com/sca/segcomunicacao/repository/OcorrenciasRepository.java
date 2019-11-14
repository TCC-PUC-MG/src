package br.com.sca.segcomunicacao.repository;
import br.com.sca.segcomunicacao.domain.Ocorrencias;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Ocorrencias entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OcorrenciasRepository extends MongoRepository<Ocorrencias, String> {

}
