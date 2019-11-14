package br.com.sca.gateway.repository.search;
import br.com.sca.gateway.domain.Ocorrencias;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Ocorrencias} entity.
 */
public interface OcorrenciasSearchRepository extends ElasticsearchRepository<Ocorrencias, String> {
}
