package br.com.sca.monitbarragem.web.rest;

import br.com.sca.monitbarragem.MonitBarragensApp;
import br.com.sca.monitbarragem.config.TestSecurityConfiguration;
import br.com.sca.monitbarragem.domain.EventoRisco;
import br.com.sca.monitbarragem.repository.EventoRiscoRepository;
import br.com.sca.monitbarragem.repository.search.EventoRiscoSearchRepository;
import br.com.sca.monitbarragem.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.util.Collections;
import java.util.List;

import static br.com.sca.monitbarragem.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EventoRiscoResource} REST controller.
 */
@SpringBootTest(classes = {MonitBarragensApp.class, TestSecurityConfiguration.class})
public class EventoRiscoResourceIT {

    private static final String DEFAULT_EVENTOS_BARRAGEM = "AAAAAAAAAA";
    private static final String UPDATED_EVENTOS_BARRAGEM = "BBBBBBBBBB";

    @Autowired
    private EventoRiscoRepository eventoRiscoRepository;

    /**
     * This repository is mocked in the br.com.sca.monitbarragem.repository.search test package.
     *
     * @see br.com.sca.monitbarragem.repository.search.EventoRiscoSearchRepositoryMockConfiguration
     */
    @Autowired
    private EventoRiscoSearchRepository mockEventoRiscoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restEventoRiscoMockMvc;

    private EventoRisco eventoRisco;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EventoRiscoResource eventoRiscoResource = new EventoRiscoResource(eventoRiscoRepository, mockEventoRiscoSearchRepository);
        this.restEventoRiscoMockMvc = MockMvcBuilders.standaloneSetup(eventoRiscoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EventoRisco createEntity() {
        EventoRisco eventoRisco = new EventoRisco()
            .eventosBarragem(DEFAULT_EVENTOS_BARRAGEM);
        return eventoRisco;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EventoRisco createUpdatedEntity() {
        EventoRisco eventoRisco = new EventoRisco()
            .eventosBarragem(UPDATED_EVENTOS_BARRAGEM);
        return eventoRisco;
    }

    @BeforeEach
    public void initTest() {
        eventoRiscoRepository.deleteAll();
        eventoRisco = createEntity();
    }

    @Test
    public void createEventoRisco() throws Exception {
        int databaseSizeBeforeCreate = eventoRiscoRepository.findAll().size();

        // Create the EventoRisco
        restEventoRiscoMockMvc.perform(post("/api/evento-riscos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventoRisco)))
            .andExpect(status().isCreated());

        // Validate the EventoRisco in the database
        List<EventoRisco> eventoRiscoList = eventoRiscoRepository.findAll();
        assertThat(eventoRiscoList).hasSize(databaseSizeBeforeCreate + 1);
        EventoRisco testEventoRisco = eventoRiscoList.get(eventoRiscoList.size() - 1);
        assertThat(testEventoRisco.getEventosBarragem()).isEqualTo(DEFAULT_EVENTOS_BARRAGEM);

        // Validate the EventoRisco in Elasticsearch
        verify(mockEventoRiscoSearchRepository, times(1)).save(testEventoRisco);
    }

    @Test
    public void createEventoRiscoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eventoRiscoRepository.findAll().size();

        // Create the EventoRisco with an existing ID
        eventoRisco.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restEventoRiscoMockMvc.perform(post("/api/evento-riscos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventoRisco)))
            .andExpect(status().isBadRequest());

        // Validate the EventoRisco in the database
        List<EventoRisco> eventoRiscoList = eventoRiscoRepository.findAll();
        assertThat(eventoRiscoList).hasSize(databaseSizeBeforeCreate);

        // Validate the EventoRisco in Elasticsearch
        verify(mockEventoRiscoSearchRepository, times(0)).save(eventoRisco);
    }


    @Test
    public void getAllEventoRiscos() throws Exception {
        // Initialize the database
        eventoRiscoRepository.save(eventoRisco);

        // Get all the eventoRiscoList
        restEventoRiscoMockMvc.perform(get("/api/evento-riscos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eventoRisco.getId())))
            .andExpect(jsonPath("$.[*].eventosBarragem").value(hasItem(DEFAULT_EVENTOS_BARRAGEM)));
    }
    
    @Test
    public void getEventoRisco() throws Exception {
        // Initialize the database
        eventoRiscoRepository.save(eventoRisco);

        // Get the eventoRisco
        restEventoRiscoMockMvc.perform(get("/api/evento-riscos/{id}", eventoRisco.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(eventoRisco.getId()))
            .andExpect(jsonPath("$.eventosBarragem").value(DEFAULT_EVENTOS_BARRAGEM));
    }

    @Test
    public void getNonExistingEventoRisco() throws Exception {
        // Get the eventoRisco
        restEventoRiscoMockMvc.perform(get("/api/evento-riscos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateEventoRisco() throws Exception {
        // Initialize the database
        eventoRiscoRepository.save(eventoRisco);

        int databaseSizeBeforeUpdate = eventoRiscoRepository.findAll().size();

        // Update the eventoRisco
        EventoRisco updatedEventoRisco = eventoRiscoRepository.findById(eventoRisco.getId()).get();
        updatedEventoRisco
            .eventosBarragem(UPDATED_EVENTOS_BARRAGEM);

        restEventoRiscoMockMvc.perform(put("/api/evento-riscos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEventoRisco)))
            .andExpect(status().isOk());

        // Validate the EventoRisco in the database
        List<EventoRisco> eventoRiscoList = eventoRiscoRepository.findAll();
        assertThat(eventoRiscoList).hasSize(databaseSizeBeforeUpdate);
        EventoRisco testEventoRisco = eventoRiscoList.get(eventoRiscoList.size() - 1);
        assertThat(testEventoRisco.getEventosBarragem()).isEqualTo(UPDATED_EVENTOS_BARRAGEM);

        // Validate the EventoRisco in Elasticsearch
        verify(mockEventoRiscoSearchRepository, times(1)).save(testEventoRisco);
    }

    @Test
    public void updateNonExistingEventoRisco() throws Exception {
        int databaseSizeBeforeUpdate = eventoRiscoRepository.findAll().size();

        // Create the EventoRisco

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEventoRiscoMockMvc.perform(put("/api/evento-riscos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventoRisco)))
            .andExpect(status().isBadRequest());

        // Validate the EventoRisco in the database
        List<EventoRisco> eventoRiscoList = eventoRiscoRepository.findAll();
        assertThat(eventoRiscoList).hasSize(databaseSizeBeforeUpdate);

        // Validate the EventoRisco in Elasticsearch
        verify(mockEventoRiscoSearchRepository, times(0)).save(eventoRisco);
    }

    @Test
    public void deleteEventoRisco() throws Exception {
        // Initialize the database
        eventoRiscoRepository.save(eventoRisco);

        int databaseSizeBeforeDelete = eventoRiscoRepository.findAll().size();

        // Delete the eventoRisco
        restEventoRiscoMockMvc.perform(delete("/api/evento-riscos/{id}", eventoRisco.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EventoRisco> eventoRiscoList = eventoRiscoRepository.findAll();
        assertThat(eventoRiscoList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the EventoRisco in Elasticsearch
        verify(mockEventoRiscoSearchRepository, times(1)).deleteById(eventoRisco.getId());
    }

    @Test
    public void searchEventoRisco() throws Exception {
        // Initialize the database
        eventoRiscoRepository.save(eventoRisco);
        when(mockEventoRiscoSearchRepository.search(queryStringQuery("id:" + eventoRisco.getId())))
            .thenReturn(Collections.singletonList(eventoRisco));
        // Search the eventoRisco
        restEventoRiscoMockMvc.perform(get("/api/_search/evento-riscos?query=id:" + eventoRisco.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eventoRisco.getId())))
            .andExpect(jsonPath("$.[*].eventosBarragem").value(hasItem(DEFAULT_EVENTOS_BARRAGEM)));
    }
}
