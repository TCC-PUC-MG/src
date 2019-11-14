package br.com.sca.monitbarragem.web.rest;

import br.com.sca.monitbarragem.MonitBarragensApp;
import br.com.sca.monitbarragem.config.TestSecurityConfiguration;
import br.com.sca.monitbarragem.domain.EventoBarragem;
import br.com.sca.monitbarragem.repository.EventoBarragemRepository;
import br.com.sca.monitbarragem.repository.search.EventoBarragemSearchRepository;
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
 * Integration tests for the {@link EventoBarragemResource} REST controller.
 */
@SpringBootTest(classes = {MonitBarragensApp.class, TestSecurityConfiguration.class})
public class EventoBarragemResourceIT {

    @Autowired
    private EventoBarragemRepository eventoBarragemRepository;

    /**
     * This repository is mocked in the br.com.sca.monitbarragem.repository.search test package.
     *
     * @see br.com.sca.monitbarragem.repository.search.EventoBarragemSearchRepositoryMockConfiguration
     */
    @Autowired
    private EventoBarragemSearchRepository mockEventoBarragemSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restEventoBarragemMockMvc;

    private EventoBarragem eventoBarragem;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EventoBarragemResource eventoBarragemResource = new EventoBarragemResource(eventoBarragemRepository, mockEventoBarragemSearchRepository);
        this.restEventoBarragemMockMvc = MockMvcBuilders.standaloneSetup(eventoBarragemResource)
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
    public static EventoBarragem createEntity() {
        EventoBarragem eventoBarragem = new EventoBarragem();
        return eventoBarragem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EventoBarragem createUpdatedEntity() {
        EventoBarragem eventoBarragem = new EventoBarragem();
        return eventoBarragem;
    }

    @BeforeEach
    public void initTest() {
        eventoBarragemRepository.deleteAll();
        eventoBarragem = createEntity();
    }

    @Test
    public void createEventoBarragem() throws Exception {
        int databaseSizeBeforeCreate = eventoBarragemRepository.findAll().size();

        // Create the EventoBarragem
        restEventoBarragemMockMvc.perform(post("/api/evento-barragems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventoBarragem)))
            .andExpect(status().isCreated());

        // Validate the EventoBarragem in the database
        List<EventoBarragem> eventoBarragemList = eventoBarragemRepository.findAll();
        assertThat(eventoBarragemList).hasSize(databaseSizeBeforeCreate + 1);
        EventoBarragem testEventoBarragem = eventoBarragemList.get(eventoBarragemList.size() - 1);

        // Validate the EventoBarragem in Elasticsearch
        verify(mockEventoBarragemSearchRepository, times(1)).save(testEventoBarragem);
    }

    @Test
    public void createEventoBarragemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eventoBarragemRepository.findAll().size();

        // Create the EventoBarragem with an existing ID
        eventoBarragem.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restEventoBarragemMockMvc.perform(post("/api/evento-barragems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventoBarragem)))
            .andExpect(status().isBadRequest());

        // Validate the EventoBarragem in the database
        List<EventoBarragem> eventoBarragemList = eventoBarragemRepository.findAll();
        assertThat(eventoBarragemList).hasSize(databaseSizeBeforeCreate);

        // Validate the EventoBarragem in Elasticsearch
        verify(mockEventoBarragemSearchRepository, times(0)).save(eventoBarragem);
    }


    @Test
    public void getAllEventoBarragems() throws Exception {
        // Initialize the database
        eventoBarragemRepository.save(eventoBarragem);

        // Get all the eventoBarragemList
        restEventoBarragemMockMvc.perform(get("/api/evento-barragems?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eventoBarragem.getId())));
    }
    
    @Test
    public void getEventoBarragem() throws Exception {
        // Initialize the database
        eventoBarragemRepository.save(eventoBarragem);

        // Get the eventoBarragem
        restEventoBarragemMockMvc.perform(get("/api/evento-barragems/{id}", eventoBarragem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(eventoBarragem.getId()));
    }

    @Test
    public void getNonExistingEventoBarragem() throws Exception {
        // Get the eventoBarragem
        restEventoBarragemMockMvc.perform(get("/api/evento-barragems/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateEventoBarragem() throws Exception {
        // Initialize the database
        eventoBarragemRepository.save(eventoBarragem);

        int databaseSizeBeforeUpdate = eventoBarragemRepository.findAll().size();

        // Update the eventoBarragem
        EventoBarragem updatedEventoBarragem = eventoBarragemRepository.findById(eventoBarragem.getId()).get();

        restEventoBarragemMockMvc.perform(put("/api/evento-barragems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEventoBarragem)))
            .andExpect(status().isOk());

        // Validate the EventoBarragem in the database
        List<EventoBarragem> eventoBarragemList = eventoBarragemRepository.findAll();
        assertThat(eventoBarragemList).hasSize(databaseSizeBeforeUpdate);
        EventoBarragem testEventoBarragem = eventoBarragemList.get(eventoBarragemList.size() - 1);

        // Validate the EventoBarragem in Elasticsearch
        verify(mockEventoBarragemSearchRepository, times(1)).save(testEventoBarragem);
    }

    @Test
    public void updateNonExistingEventoBarragem() throws Exception {
        int databaseSizeBeforeUpdate = eventoBarragemRepository.findAll().size();

        // Create the EventoBarragem

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEventoBarragemMockMvc.perform(put("/api/evento-barragems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventoBarragem)))
            .andExpect(status().isBadRequest());

        // Validate the EventoBarragem in the database
        List<EventoBarragem> eventoBarragemList = eventoBarragemRepository.findAll();
        assertThat(eventoBarragemList).hasSize(databaseSizeBeforeUpdate);

        // Validate the EventoBarragem in Elasticsearch
        verify(mockEventoBarragemSearchRepository, times(0)).save(eventoBarragem);
    }

    @Test
    public void deleteEventoBarragem() throws Exception {
        // Initialize the database
        eventoBarragemRepository.save(eventoBarragem);

        int databaseSizeBeforeDelete = eventoBarragemRepository.findAll().size();

        // Delete the eventoBarragem
        restEventoBarragemMockMvc.perform(delete("/api/evento-barragems/{id}", eventoBarragem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EventoBarragem> eventoBarragemList = eventoBarragemRepository.findAll();
        assertThat(eventoBarragemList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the EventoBarragem in Elasticsearch
        verify(mockEventoBarragemSearchRepository, times(1)).deleteById(eventoBarragem.getId());
    }

    @Test
    public void searchEventoBarragem() throws Exception {
        // Initialize the database
        eventoBarragemRepository.save(eventoBarragem);
        when(mockEventoBarragemSearchRepository.search(queryStringQuery("id:" + eventoBarragem.getId())))
            .thenReturn(Collections.singletonList(eventoBarragem));
        // Search the eventoBarragem
        restEventoBarragemMockMvc.perform(get("/api/_search/evento-barragems?query=id:" + eventoBarragem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eventoBarragem.getId())));
    }
}
