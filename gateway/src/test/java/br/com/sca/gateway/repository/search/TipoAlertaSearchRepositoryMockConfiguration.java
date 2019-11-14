package br.com.sca.gateway.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link TipoAlertaSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class TipoAlertaSearchRepositoryMockConfiguration {

    @MockBean
    private TipoAlertaSearchRepository mockTipoAlertaSearchRepository;

}
