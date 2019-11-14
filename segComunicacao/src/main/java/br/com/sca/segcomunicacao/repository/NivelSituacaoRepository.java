package br.com.sca.segcomunicacao.repository;
import br.com.sca.segcomunicacao.domain.NivelSituacao;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the NivelSituacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NivelSituacaoRepository extends MongoRepository<NivelSituacao, String> {

}
