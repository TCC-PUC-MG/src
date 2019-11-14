package br.com.sca.monitbarragem.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link MinaExtracaoSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class MinaExtracaoSearchRepositoryMockConfiguration {

    @MockBean
    private MinaExtracaoSearchRepository mockMinaExtracaoSearchRepository;

}
