package br.com.sca.monitbarragem.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link EventoBarragemSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class EventoBarragemSearchRepositoryMockConfiguration {

    @MockBean
    private EventoBarragemSearchRepository mockEventoBarragemSearchRepository;

}
