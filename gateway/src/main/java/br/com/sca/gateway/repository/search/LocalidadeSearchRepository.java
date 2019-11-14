package br.com.sca.gateway.repository.search;
import br.com.sca.gateway.domain.Localidade;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Localidade} entity.
 */
public interface LocalidadeSearchRepository extends ElasticsearchRepository<Localidade, String> {
}
