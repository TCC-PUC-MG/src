package br.com.sca.segcomunicacao.repository.search;
import br.com.sca.segcomunicacao.domain.NivelSituacao;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link NivelSituacao} entity.
 */
public interface NivelSituacaoSearchRepository extends ElasticsearchRepository<NivelSituacao, String> {
}
