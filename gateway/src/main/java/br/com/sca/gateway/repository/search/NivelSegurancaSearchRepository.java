package br.com.sca.gateway.repository.search;
import br.com.sca.gateway.domain.NivelSeguranca;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link NivelSeguranca} entity.
 */
public interface NivelSegurancaSearchRepository extends ElasticsearchRepository<NivelSeguranca, String> {
}
