package br.com.sca.gateway.repository.search;
import br.com.sca.gateway.domain.MinaExtracao;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link MinaExtracao} entity.
 */
public interface MinaExtracaoSearchRepository extends ElasticsearchRepository<MinaExtracao, String> {
}
