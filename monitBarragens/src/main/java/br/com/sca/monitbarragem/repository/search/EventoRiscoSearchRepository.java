package br.com.sca.monitbarragem.repository.search;
import br.com.sca.monitbarragem.domain.EventoRisco;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link EventoRisco} entity.
 */
public interface EventoRiscoSearchRepository extends ElasticsearchRepository<EventoRisco, String> {
}
