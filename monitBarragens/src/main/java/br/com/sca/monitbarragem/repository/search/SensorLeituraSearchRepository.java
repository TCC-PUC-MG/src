package br.com.sca.monitbarragem.repository.search;
import br.com.sca.monitbarragem.domain.SensorLeitura;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link SensorLeitura} entity.
 */
public interface SensorLeituraSearchRepository extends ElasticsearchRepository<SensorLeitura, String> {
}
