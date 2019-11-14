package br.com.sca.gateway.repository.search;
import br.com.sca.gateway.domain.AlertaEnviados;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link AlertaEnviados} entity.
 */
public interface AlertaEnviadosSearchRepository extends ElasticsearchRepository<AlertaEnviados, String> {
}
