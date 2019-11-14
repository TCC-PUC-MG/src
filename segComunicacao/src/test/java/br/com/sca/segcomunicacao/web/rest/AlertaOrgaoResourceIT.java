package br.com.sca.segcomunicacao.web.rest;

import br.com.sca.segcomunicacao.SegComunicacaoApp;
import br.com.sca.segcomunicacao.config.TestSecurityConfiguration;
import br.com.sca.segcomunicacao.domain.AlertaOrgao;
import br.com.sca.segcomunicacao.repository.AlertaOrgaoRepository;
import br.com.sca.segcomunicacao.repository.search.AlertaOrgaoSearchRepository;
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
 * Integration tests for the {@link AlertaOrgaoResource} REST controller.
 */
@SpringBootTest(classes = {SegComunicacaoApp.class, TestSecurityConfiguration.class})
public class AlertaOrgaoResourceIT {

    @Autowired
    private AlertaOrgaoRepository alertaOrgaoRepository;

    /**
     * This repository is mocked in the br.com.sca.segcomunicacao.repository.search test package.
     *
     * @see br.com.sca.segcomunicacao.repository.search.AlertaOrgaoSearchRepositoryMockConfiguration
     */
    @Autowired
    private AlertaOrgaoSearchRepository mockAlertaOrgaoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restAlertaOrgaoMockMvc;

    private AlertaOrgao alertaOrgao;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AlertaOrgaoResource alertaOrgaoResource = new AlertaOrgaoResource(alertaOrgaoRepository, mockAlertaOrgaoSearchRepository);
        this.restAlertaOrgaoMockMvc = MockMvcBuilders.standaloneSetup(alertaOrgaoResource)
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
    public static AlertaOrgao createEntity() {
        AlertaOrgao alertaOrgao = new AlertaOrgao();
        return alertaOrgao;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AlertaOrgao createUpdatedEntity() {
        AlertaOrgao alertaOrgao = new AlertaOrgao();
        return alertaOrgao;
    }

    @BeforeEach
    public void initTest() {
        alertaOrgaoRepository.deleteAll();
        alertaOrgao = createEntity();
    }

    @Test
    public void createAlertaOrgao() throws Exception {
        int databaseSizeBeforeCreate = alertaOrgaoRepository.findAll().size();

        // Create the AlertaOrgao
        restAlertaOrgaoMockMvc.perform(post("/api/alerta-orgaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alertaOrgao)))
            .andExpect(status().isCreated());

        // Validate the AlertaOrgao in the database
        List<AlertaOrgao> alertaOrgaoList = alertaOrgaoRepository.findAll();
        assertThat(alertaOrgaoList).hasSize(databaseSizeBeforeCreate + 1);
        AlertaOrgao testAlertaOrgao = alertaOrgaoList.get(alertaOrgaoList.size() - 1);

        // Validate the AlertaOrgao in Elasticsearch
        verify(mockAlertaOrgaoSearchRepository, times(1)).save(testAlertaOrgao);
    }

    @Test
    public void createAlertaOrgaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = alertaOrgaoRepository.findAll().size();

        // Create the AlertaOrgao with an existing ID
        alertaOrgao.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlertaOrgaoMockMvc.perform(post("/api/alerta-orgaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alertaOrgao)))
            .andExpect(status().isBadRequest());

        // Validate the AlertaOrgao in the database
        List<AlertaOrgao> alertaOrgaoList = alertaOrgaoRepository.findAll();
        assertThat(alertaOrgaoList).hasSize(databaseSizeBeforeCreate);

        // Validate the AlertaOrgao in Elasticsearch
        verify(mockAlertaOrgaoSearchRepository, times(0)).save(alertaOrgao);
    }


    @Test
    public void getAllAlertaOrgaos() throws Exception {
        // Initialize the database
        alertaOrgaoRepository.save(alertaOrgao);

        // Get all the alertaOrgaoList
        restAlertaOrgaoMockMvc.perform(get("/api/alerta-orgaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alertaOrgao.getId())));
    }
    
    @Test
    public void getAlertaOrgao() throws Exception {
        // Initialize the database
        alertaOrgaoRepository.save(alertaOrgao);

        // Get the alertaOrgao
        restAlertaOrgaoMockMvc.perform(get("/api/alerta-orgaos/{id}", alertaOrgao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(alertaOrgao.getId()));
    }

    @Test
    public void getNonExistingAlertaOrgao() throws Exception {
        // Get the alertaOrgao
        restAlertaOrgaoMockMvc.perform(get("/api/alerta-orgaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAlertaOrgao() throws Exception {
        // Initialize the database
        alertaOrgaoRepository.save(alertaOrgao);

        int databaseSizeBeforeUpdate = alertaOrgaoRepository.findAll().size();

        // Update the alertaOrgao
        AlertaOrgao updatedAlertaOrgao = alertaOrgaoRepository.findById(alertaOrgao.getId()).get();

        restAlertaOrgaoMockMvc.perform(put("/api/alerta-orgaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAlertaOrgao)))
            .andExpect(status().isOk());

        // Validate the AlertaOrgao in the database
        List<AlertaOrgao> alertaOrgaoList = alertaOrgaoRepository.findAll();
        assertThat(alertaOrgaoList).hasSize(databaseSizeBeforeUpdate);
        AlertaOrgao testAlertaOrgao = alertaOrgaoList.get(alertaOrgaoList.size() - 1);

        // Validate the AlertaOrgao in Elasticsearch
        verify(mockAlertaOrgaoSearchRepository, times(1)).save(testAlertaOrgao);
    }

    @Test
    public void updateNonExistingAlertaOrgao() throws Exception {
        int databaseSizeBeforeUpdate = alertaOrgaoRepository.findAll().size();

        // Create the AlertaOrgao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAlertaOrgaoMockMvc.perform(put("/api/alerta-orgaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alertaOrgao)))
            .andExpect(status().isBadRequest());

        // Validate the AlertaOrgao in the database
        List<AlertaOrgao> alertaOrgaoList = alertaOrgaoRepository.findAll();
        assertThat(alertaOrgaoList).hasSize(databaseSizeBeforeUpdate);

        // Validate the AlertaOrgao in Elasticsearch
        verify(mockAlertaOrgaoSearchRepository, times(0)).save(alertaOrgao);
    }

    @Test
    public void deleteAlertaOrgao() throws Exception {
        // Initialize the database
        alertaOrgaoRepository.save(alertaOrgao);

        int databaseSizeBeforeDelete = alertaOrgaoRepository.findAll().size();

        // Delete the alertaOrgao
        restAlertaOrgaoMockMvc.perform(delete("/api/alerta-orgaos/{id}", alertaOrgao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AlertaOrgao> alertaOrgaoList = alertaOrgaoRepository.findAll();
        assertThat(alertaOrgaoList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the AlertaOrgao in Elasticsearch
        verify(mockAlertaOrgaoSearchRepository, times(1)).deleteById(alertaOrgao.getId());
    }

    @Test
    public void searchAlertaOrgao() throws Exception {
        // Initialize the database
        alertaOrgaoRepository.save(alertaOrgao);
        when(mockAlertaOrgaoSearchRepository.search(queryStringQuery("id:" + alertaOrgao.getId())))
            .thenReturn(Collections.singletonList(alertaOrgao));
        // Search the alertaOrgao
        restAlertaOrgaoMockMvc.perform(get("/api/_search/alerta-orgaos?query=id:" + alertaOrgao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alertaOrgao.getId())));
    }
}
