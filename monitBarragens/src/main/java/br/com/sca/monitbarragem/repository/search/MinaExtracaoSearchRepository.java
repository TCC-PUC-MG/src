package br.com.sca.monitbarragem.repository.search;
import br.com.sca.monitbarragem.domain.MinaExtracao;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link MinaExtracao} entity.
 */
public interface MinaExtracaoSearchRepository extends ElasticsearchRepository<MinaExtracao, String> {
}
