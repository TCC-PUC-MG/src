package br.com.sca.gateway.web.rest;

import br.com.sca.gateway.GatewayApp;
import br.com.sca.gateway.config.TestSecurityConfiguration;
import br.com.sca.gateway.domain.Ocorrencias;
import br.com.sca.gateway.repository.OcorrenciasRepository;
import br.com.sca.gateway.repository.search.OcorrenciasSearchRepository;
import br.com.sca.gateway.web.rest.errors.ExceptionTranslator;

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

import static br.com.sca.gateway.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link OcorrenciasResource} REST controller.
 */
@SpringBootTest(classes = {GatewayApp.class, TestSecurityConfiguration.class})
public class OcorrenciasResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private OcorrenciasRepository ocorrenciasRepository;

    /**
     * This repository is mocked in the br.com.sca.gateway.repository.search test package.
     *
     * @see br.com.sca.gateway.repository.search.OcorrenciasSearchRepositoryMockConfiguration
     */
    @Autowired
    private OcorrenciasSearchRepository mockOcorrenciasSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restOcorrenciasMockMvc;

    private Ocorrencias ocorrencias;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OcorrenciasResource ocorrenciasResource = new OcorrenciasResource(ocorrenciasRepository, mockOcorrenciasSearchRepository);
        this.restOcorrenciasMockMvc = MockMvcBuilders.standaloneSetup(ocorrenciasResource)
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
    public static Ocorrencias createEntity() {
        Ocorrencias ocorrencias = new Ocorrencias()
            .descricao(DEFAULT_DESCRICAO);
        return ocorrencias;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ocorrencias createUpdatedEntity() {
        Ocorrencias ocorrencias = new Ocorrencias()
            .descricao(UPDATED_DESCRICAO);
        return ocorrencias;
    }

    @BeforeEach
    public void initTest() {
        ocorrenciasRepository.deleteAll();
        ocorrencias = createEntity();
    }

    @Test
    public void createOcorrencias() throws Exception {
        int databaseSizeBeforeCreate = ocorrenciasRepository.findAll().size();

        // Create the Ocorrencias
        restOcorrenciasMockMvc.perform(post("/api/ocorrencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ocorrencias)))
            .andExpect(status().isCreated());

        // Validate the Ocorrencias in the database
        List<Ocorrencias> ocorrenciasList = ocorrenciasRepository.findAll();
        assertThat(ocorrenciasList).hasSize(databaseSizeBeforeCreate + 1);
        Ocorrencias testOcorrencias = ocorrenciasList.get(ocorrenciasList.size() - 1);
        assertThat(testOcorrencias.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);

        // Validate the Ocorrencias in Elasticsearch
        verify(mockOcorrenciasSearchRepository, times(1)).save(testOcorrencias);
    }

    @Test
    public void createOcorrenciasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ocorrenciasRepository.findAll().size();

        // Create the Ocorrencias with an existing ID
        ocorrencias.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restOcorrenciasMockMvc.perform(post("/api/ocorrencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ocorrencias)))
            .andExpect(status().isBadRequest());

        // Validate the Ocorrencias in the database
        List<Ocorrencias> ocorrenciasList = ocorrenciasRepository.findAll();
        assertThat(ocorrenciasList).hasSize(databaseSizeBeforeCreate);

        // Validate the Ocorrencias in Elasticsearch
        verify(mockOcorrenciasSearchRepository, times(0)).save(ocorrencias);
    }


    @Test
    public void getAllOcorrencias() throws Exception {
        // Initialize the database
        ocorrenciasRepository.save(ocorrencias);

        // Get all the ocorrenciasList
        restOcorrenciasMockMvc.perform(get("/api/ocorrencias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ocorrencias.getId())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }
    
    @Test
    public void getOcorrencias() throws Exception {
        // Initialize the database
        ocorrenciasRepository.save(ocorrencias);

        // Get the ocorrencias
        restOcorrenciasMockMvc.perform(get("/api/ocorrencias/{id}", ocorrencias.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ocorrencias.getId()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }

    @Test
    public void getNonExistingOcorrencias() throws Exception {
        // Get the ocorrencias
        restOcorrenciasMockMvc.perform(get("/api/ocorrencias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateOcorrencias() throws Exception {
        // Initialize the database
        ocorrenciasRepository.save(ocorrencias);

        int databaseSizeBeforeUpdate = ocorrenciasRepository.findAll().size();

        // Update the ocorrencias
        Ocorrencias updatedOcorrencias = ocorrenciasRepository.findById(ocorrencias.getId()).get();
        updatedOcorrencias
            .descricao(UPDATED_DESCRICAO);

        restOcorrenciasMockMvc.perform(put("/api/ocorrencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOcorrencias)))
            .andExpect(status().isOk());

        // Validate the Ocorrencias in the database
        List<Ocorrencias> ocorrenciasList = ocorrenciasRepository.findAll();
        assertThat(ocorrenciasList).hasSize(databaseSizeBeforeUpdate);
        Ocorrencias testOcorrencias = ocorrenciasList.get(ocorrenciasList.size() - 1);
        assertThat(testOcorrencias.getDescricao()).isEqualTo(UPDATED_DESCRICAO);

        // Validate the Ocorrencias in Elasticsearch
        verify(mockOcorrenciasSearchRepository, times(1)).save(testOcorrencias);
    }

    @Test
    public void updateNonExistingOcorrencias() throws Exception {
        int databaseSizeBeforeUpdate = ocorrenciasRepository.findAll().size();

        // Create the Ocorrencias

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOcorrenciasMockMvc.perform(put("/api/ocorrencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ocorrencias)))
            .andExpect(status().isBadRequest());

        // Validate the Ocorrencias in the database
        List<Ocorrencias> ocorrenciasList = ocorrenciasRepository.findAll();
        assertThat(ocorrenciasList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Ocorrencias in Elasticsearch
        verify(mockOcorrenciasSearchRepository, times(0)).save(ocorrencias);
    }

    @Test
    public void deleteOcorrencias() throws Exception {
        // Initialize the database
        ocorrenciasRepository.save(ocorrencias);

        int databaseSizeBeforeDelete = ocorrenciasRepository.findAll().size();

        // Delete the ocorrencias
        restOcorrenciasMockMvc.perform(delete("/api/ocorrencias/{id}", ocorrencias.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ocorrencias> ocorrenciasList = ocorrenciasRepository.findAll();
        assertThat(ocorrenciasList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Ocorrencias in Elasticsearch
        verify(mockOcorrenciasSearchRepository, times(1)).deleteById(ocorrencias.getId());
    }

    @Test
    public void searchOcorrencias() throws Exception {
        // Initialize the database
        ocorrenciasRepository.save(ocorrencias);
        when(mockOcorrenciasSearchRepository.search(queryStringQuery("id:" + ocorrencias.getId())))
            .thenReturn(Collections.singletonList(ocorrencias));
        // Search the ocorrencias
        restOcorrenciasMockMvc.perform(get("/api/_search/ocorrencias?query=id:" + ocorrencias.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ocorrencias.getId())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }
}
