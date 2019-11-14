package br.com.sca.monitbarragem.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link BarragemSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class BarragemSearchRepositoryMockConfiguration {

    @MockBean
    private BarragemSearchRepository mockBarragemSearchRepository;

}
