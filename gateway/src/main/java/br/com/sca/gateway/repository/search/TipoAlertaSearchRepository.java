package br.com.sca.gateway.repository.search;
import br.com.sca.gateway.domain.TipoAlerta;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link TipoAlerta} entity.
 */
public interface TipoAlertaSearchRepository extends ElasticsearchRepository<TipoAlerta, String> {
}
