package br.com.sca.segcomunicacao.repository.search;
import br.com.sca.segcomunicacao.domain.OrgaoGoverno;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link OrgaoGoverno} entity.
 */
public interface OrgaoGovernoSearchRepository extends ElasticsearchRepository<OrgaoGoverno, String> {
}
