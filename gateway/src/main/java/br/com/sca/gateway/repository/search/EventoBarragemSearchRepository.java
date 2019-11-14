package br.com.sca.gateway.repository.search;
import br.com.sca.gateway.domain.EventoBarragem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link EventoBarragem} entity.
 */
public interface EventoBarragemSearchRepository extends ElasticsearchRepository<EventoBarragem, String> {
}
