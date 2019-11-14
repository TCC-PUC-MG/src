package br.com.sca.gateway.repository.search;
import br.com.sca.gateway.domain.OrgaoGoverno;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link OrgaoGoverno} entity.
 */
public interface OrgaoGovernoSearchRepository extends ElasticsearchRepository<OrgaoGoverno, String> {
}
