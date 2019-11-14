package br.com.sca.segcomunicacao.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link AlertaEnviadosSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class AlertaEnviadosSearchRepositoryMockConfiguration {

    @MockBean
    private AlertaEnviadosSearchRepository mockAlertaEnviadosSearchRepository;

}
