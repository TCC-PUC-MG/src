package br.com.sca.gateway.repository.search;
import br.com.sca.gateway.domain.AlertaOrgao;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link AlertaOrgao} entity.
 */
public interface AlertaOrgaoSearchRepository extends ElasticsearchRepository<AlertaOrgao, String> {
}
