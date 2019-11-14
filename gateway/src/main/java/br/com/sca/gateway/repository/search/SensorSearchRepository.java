package br.com.sca.gateway.repository.search;
import br.com.sca.gateway.domain.Sensor;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Sensor} entity.
 */
public interface SensorSearchRepository extends ElasticsearchRepository<Sensor, String> {
}
