package br.com.sca.segcomunicacao.web.rest;

import br.com.sca.segcomunicacao.SegComunicacaoApp;
import br.com.sca.segcomunicacao.config.TestSecurityConfiguration;
import br.com.sca.segcomunicacao.domain.TipoAlerta;
import br.com.sca.segcomunicacao.repository.TipoAlertaRepository;
import br.com.sca.segcomunicacao.repository.search.TipoAlertaSearchRepository;
import br.com.sca.segcomunicacao.web.rest.errors.ExceptionTranslator;

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

import static br.com.sca.segcomunicacao.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TipoAlertaResource} REST controller.
 */
@SpringBootTest(classes = {SegComunicacaoApp.class, TestSecurityConfiguration.class})
public class TipoAlertaResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private TipoAlertaRepository tipoAlertaRepository;

    /**
     * This repository is mocked in the br.com.sca.segcomunicacao.repository.search test package.
     *
     * @see br.com.sca.segcomunicacao.repository.search.TipoAlertaSearchRepositoryMockConfiguration
     */
    @Autowired
    private TipoAlertaSearchRepository mockTipoAlertaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restTipoAlertaMockMvc;

    private TipoAlerta tipoAlerta;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoAlertaResource tipoAlertaResource = new TipoAlertaResource(tipoAlertaRepository, mockTipoAlertaSearchRepository);
        this.restTipoAlertaMockMvc = MockMvcBuilders.standaloneSetup(tipoAlertaResource)
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
    public static TipoAlerta createEntity() {
        TipoAlerta tipoAlerta = new TipoAlerta()
            .descricao(DEFAULT_DESCRICAO);
        return tipoAlerta;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoAlerta createUpdatedEntity() {
        TipoAlerta tipoAlerta = new TipoAlerta()
            .descricao(UPDATED_DESCRICAO);
        return tipoAlerta;
    }

    @BeforeEach
    public void initTest() {
        tipoAlertaRepository.deleteAll();
        tipoAlerta = createEntity();
    }

    @Test
    public void createTipoAlerta() throws Exception {
        int databaseSizeBeforeCreate = tipoAlertaRepository.findAll().size();

        // Create the TipoAlerta
        restTipoAlertaMockMvc.perform(post("/api/tipo-alertas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoAlerta)))
            .andExpect(status().isCreated());

        // Validate the TipoAlerta in the database
        List<TipoAlerta> tipoAlertaList = tipoAlertaRepository.findAll();
        assertThat(tipoAlertaList).hasSize(databaseSizeBeforeCreate + 1);
        TipoAlerta testTipoAlerta = tipoAlertaList.get(tipoAlertaList.size() - 1);
        assertThat(testTipoAlerta.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);

        // Validate the TipoAlerta in Elasticsearch
        verify(mockTipoAlertaSearchRepository, times(1)).save(testTipoAlerta);
    }

    @Test
    public void createTipoAlertaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoAlertaRepository.findAll().size();

        // Create the TipoAlerta with an existing ID
        tipoAlerta.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoAlertaMockMvc.perform(post("/api/tipo-alertas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoAlerta)))
            .andExpect(status().isBadRequest());

        // Validate the TipoAlerta in the database
        List<TipoAlerta> tipoAlertaList = tipoAlertaRepository.findAll();
        assertThat(tipoAlertaList).hasSize(databaseSizeBeforeCreate);

        // Validate the TipoAlerta in Elasticsearch
        verify(mockTipoAlertaSearchRepository, times(0)).save(tipoAlerta);
    }


    @Test
    public void getAllTipoAlertas() throws Exception {
        // Initialize the database
        tipoAlertaRepository.save(tipoAlerta);

        // Get all the tipoAlertaList
        restTipoAlertaMockMvc.perform(get("/api/tipo-alertas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoAlerta.getId())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }
    
    @Test
    public void getTipoAlerta() throws Exception {
        // Initialize the database
        tipoAlertaRepository.save(tipoAlerta);

        // Get the tipoAlerta
        restTipoAlertaMockMvc.perform(get("/api/tipo-alertas/{id}", tipoAlerta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoAlerta.getId()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }

    @Test
    public void getNonExistingTipoAlerta() throws Exception {
        // Get the tipoAlerta
        restTipoAlertaMockMvc.perform(get("/api/tipo-alertas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateTipoAlerta() throws Exception {
        // Initialize the database
        tipoAlertaRepository.save(tipoAlerta);

        int databaseSizeBeforeUpdate = tipoAlertaRepository.findAll().size();

        // Update the tipoAlerta
        TipoAlerta updatedTipoAlerta = tipoAlertaRepository.findById(tipoAlerta.getId()).get();
        updatedTipoAlerta
            .descricao(UPDATED_DESCRICAO);

        restTipoAlertaMockMvc.perform(put("/api/tipo-alertas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoAlerta)))
            .andExpect(status().isOk());

        // Validate the TipoAlerta in the database
        List<TipoAlerta> tipoAlertaList = tipoAlertaRepository.findAll();
        assertThat(tipoAlertaList).hasSize(databaseSizeBeforeUpdate);
        TipoAlerta testTipoAlerta = tipoAlertaList.get(tipoAlertaList.size() - 1);
        assertThat(testTipoAlerta.getDescricao()).isEqualTo(UPDATED_DESCRICAO);

        // Validate the TipoAlerta in Elasticsearch
        verify(mockTipoAlertaSearchRepository, times(1)).save(testTipoAlerta);
    }

    @Test
    public void updateNonExistingTipoAlerta() throws Exception {
        int databaseSizeBeforeUpdate = tipoAlertaRepository.findAll().size();

        // Create the TipoAlerta

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoAlertaMockMvc.perform(put("/api/tipo-alertas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoAlerta)))
            .andExpect(status().isBadRequest());

        // Validate the TipoAlerta in the database
        List<TipoAlerta> tipoAlertaList = tipoAlertaRepository.findAll();
        assertThat(tipoAlertaList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TipoAlerta in Elasticsearch
        verify(mockTipoAlertaSearchRepository, times(0)).save(tipoAlerta);
    }

    @Test
    public void deleteTipoAlerta() throws Exception {
        // Initialize the database
        tipoAlertaRepository.save(tipoAlerta);

        int databaseSizeBeforeDelete = tipoAlertaRepository.findAll().size();

        // Delete the tipoAlerta
        restTipoAlertaMockMvc.perform(delete("/api/tipo-alertas/{id}", tipoAlerta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoAlerta> tipoAlertaList = tipoAlertaRepository.findAll();
        assertThat(tipoAlertaList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TipoAlerta in Elasticsearch
        verify(mockTipoAlertaSearchRepository, times(1)).deleteById(tipoAlerta.getId());
    }

    @Test
    public void searchTipoAlerta() throws Exception {
        // Initialize the database
        tipoAlertaRepository.save(tipoAlerta);
        when(mockTipoAlertaSearchRepository.search(queryStringQuery("id:" + tipoAlerta.getId())))
            .thenReturn(Collections.singletonList(tipoAlerta));
        // Search the tipoAlerta
        restTipoAlertaMockMvc.perform(get("/api/_search/tipo-alertas?query=id:" + tipoAlerta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoAlerta.getId())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }
}
