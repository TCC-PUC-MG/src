package br.com.sca.gateway.repository.search;
import br.com.sca.gateway.domain.Barragem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Barragem} entity.
 */
public interface BarragemSearchRepository extends ElasticsearchRepository<Barragem, String> {
}
