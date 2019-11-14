package br.com.sca.segcomunicacao.repository.search;
import br.com.sca.segcomunicacao.domain.Ocorrencias;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Ocorrencias} entity.
 */
public interface OcorrenciasSearchRepository extends ElasticsearchRepository<Ocorrencias, String> {
}
