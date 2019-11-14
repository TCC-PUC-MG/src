package br.com.sca.segcomunicacao.web.rest;

import br.com.sca.segcomunicacao.SegComunicacaoApp;
import br.com.sca.segcomunicacao.config.TestSecurityConfiguration;
import br.com.sca.segcomunicacao.domain.AlertaEnviados;
import br.com.sca.segcomunicacao.repository.AlertaEnviadosRepository;
import br.com.sca.segcomunicacao.repository.search.AlertaEnviadosSearchRepository;
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
 * Integration tests for the {@link AlertaEnviadosResource} REST controller.
 */
@SpringBootTest(classes = {SegComunicacaoApp.class, TestSecurityConfiguration.class})
public class AlertaEnviadosResourceIT {

    @Autowired
    private AlertaEnviadosRepository alertaEnviadosRepository;

    /**
     * This repository is mocked in the br.com.sca.segcomunicacao.repository.search test package.
     *
     * @see br.com.sca.segcomunicacao.repository.search.AlertaEnviadosSearchRepositoryMockConfiguration
     */
    @Autowired
    private AlertaEnviadosSearchRepository mockAlertaEnviadosSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restAlertaEnviadosMockMvc;

    private AlertaEnviados alertaEnviados;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AlertaEnviadosResource alertaEnviadosResource = new AlertaEnviadosResource(alertaEnviadosRepository, mockAlertaEnviadosSearchRepository);
        this.restAlertaEnviadosMockMvc = MockMvcBuilders.standaloneSetup(alertaEnviadosResource)
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
    public static AlertaEnviados createEntity() {
        AlertaEnviados alertaEnviados = new AlertaEnviados();
        return alertaEnviados;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AlertaEnviados createUpdatedEntity() {
        AlertaEnviados alertaEnviados = new AlertaEnviados();
        return alertaEnviados;
    }

    @BeforeEach
    public void initTest() {
        alertaEnviadosRepository.deleteAll();
        alertaEnviados = createEntity();
    }

    @Test
    public void createAlertaEnviados() throws Exception {
        int databaseSizeBeforeCreate = alertaEnviadosRepository.findAll().size();

        // Create the AlertaEnviados
        restAlertaEnviadosMockMvc.perform(post("/api/alerta-enviados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alertaEnviados)))
            .andExpect(status().isCreated());

        // Validate the AlertaEnviados in the database
        List<AlertaEnviados> alertaEnviadosList = alertaEnviadosRepository.findAll();
        assertThat(alertaEnviadosList).hasSize(databaseSizeBeforeCreate + 1);
        AlertaEnviados testAlertaEnviados = alertaEnviadosList.get(alertaEnviadosList.size() - 1);

        // Validate the AlertaEnviados in Elasticsearch
        verify(mockAlertaEnviadosSearchRepository, times(1)).save(testAlertaEnviados);
    }

    @Test
    public void createAlertaEnviadosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = alertaEnviadosRepository.findAll().size();

        // Create the AlertaEnviados with an existing ID
        alertaEnviados.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlertaEnviadosMockMvc.perform(post("/api/alerta-enviados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alertaEnviados)))
            .andExpect(status().isBadRequest());

        // Validate the AlertaEnviados in the database
        List<AlertaEnviados> alertaEnviadosList = alertaEnviadosRepository.findAll();
        assertThat(alertaEnviadosList).hasSize(databaseSizeBeforeCreate);

        // Validate the AlertaEnviados in Elasticsearch
        verify(mockAlertaEnviadosSearchRepository, times(0)).save(alertaEnviados);
    }


    @Test
    public void getAllAlertaEnviados() throws Exception {
        // Initialize the database
        alertaEnviadosRepository.save(alertaEnviados);

        // Get all the alertaEnviadosList
        restAlertaEnviadosMockMvc.perform(get("/api/alerta-enviados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alertaEnviados.getId())));
    }
    
    @Test
    public void getAlertaEnviados() throws Exception {
        // Initialize the database
        alertaEnviadosRepository.save(alertaEnviados);

        // Get the alertaEnviados
        restAlertaEnviadosMockMvc.perform(get("/api/alerta-enviados/{id}", alertaEnviados.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(alertaEnviados.getId()));
    }

    @Test
    public void getNonExistingAlertaEnviados() throws Exception {
        // Get the alertaEnviados
        restAlertaEnviadosMockMvc.perform(get("/api/alerta-enviados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAlertaEnviados() throws Exception {
        // Initialize the database
        alertaEnviadosRepository.save(alertaEnviados);

        int databaseSizeBeforeUpdate = alertaEnviadosRepository.findAll().size();

        // Update the alertaEnviados
        AlertaEnviados updatedAlertaEnviados = alertaEnviadosRepository.findById(alertaEnviados.getId()).get();

        restAlertaEnviadosMockMvc.perform(put("/api/alerta-enviados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAlertaEnviados)))
            .andExpect(status().isOk());

        // Validate the AlertaEnviados in the database
        List<AlertaEnviados> alertaEnviadosList = alertaEnviadosRepository.findAll();
        assertThat(alertaEnviadosList).hasSize(databaseSizeBeforeUpdate);
        AlertaEnviados testAlertaEnviados = alertaEnviadosList.get(alertaEnviadosList.size() - 1);

        // Validate the AlertaEnviados in Elasticsearch
        verify(mockAlertaEnviadosSearchRepository, times(1)).save(testAlertaEnviados);
    }

    @Test
    public void updateNonExistingAlertaEnviados() throws Exception {
        int databaseSizeBeforeUpdate = alertaEnviadosRepository.findAll().size();

        // Create the AlertaEnviados

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAlertaEnviadosMockMvc.perform(put("/api/alerta-enviados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alertaEnviados)))
            .andExpect(status().isBadRequest());

        // Validate the AlertaEnviados in the database
        List<AlertaEnviados> alertaEnviadosList = alertaEnviadosRepository.findAll();
        assertThat(alertaEnviadosList).hasSize(databaseSizeBeforeUpdate);

        // Validate the AlertaEnviados in Elasticsearch
        verify(mockAlertaEnviadosSearchRepository, times(0)).save(alertaEnviados);
    }

    @Test
    public void deleteAlertaEnviados() throws Exception {
        // Initialize the database
        alertaEnviadosRepository.save(alertaEnviados);

        int databaseSizeBeforeDelete = alertaEnviadosRepository.findAll().size();

        // Delete the alertaEnviados
        restAlertaEnviadosMockMvc.perform(delete("/api/alerta-enviados/{id}", alertaEnviados.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AlertaEnviados> alertaEnviadosList = alertaEnviadosRepository.findAll();
        assertThat(alertaEnviadosList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the AlertaEnviados in Elasticsearch
        verify(mockAlertaEnviadosSearchRepository, times(1)).deleteById(alertaEnviados.getId());
    }

    @Test
    public void searchAlertaEnviados() throws Exception {
        // Initialize the database
        alertaEnviadosRepository.save(alertaEnviados);
        when(mockAlertaEnviadosSearchRepository.search(queryStringQuery("id:" + alertaEnviados.getId())))
            .thenReturn(Collections.singletonList(alertaEnviados));
        // Search the alertaEnviados
        restAlertaEnviadosMockMvc.perform(get("/api/_search/alerta-enviados?query=id:" + alertaEnviados.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alertaEnviados.getId())));
    }
}
