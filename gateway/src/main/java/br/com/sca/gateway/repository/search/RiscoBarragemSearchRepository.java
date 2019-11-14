package br.com.sca.gateway.repository.search;
import br.com.sca.gateway.domain.RiscoBarragem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link RiscoBarragem} entity.
 */
public interface RiscoBarragemSearchRepository extends ElasticsearchRepository<RiscoBarragem, String> {
}
