package br.com.sca.gateway.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link NivelSegurancaSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class NivelSegurancaSearchRepositoryMockConfiguration {

    @MockBean
    private NivelSegurancaSearchRepository mockNivelSegurancaSearchRepository;

}
