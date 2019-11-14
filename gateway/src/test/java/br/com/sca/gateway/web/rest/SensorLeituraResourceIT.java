package br.com.sca.gateway.web.rest;

import br.com.sca.gateway.GatewayApp;
import br.com.sca.gateway.config.TestSecurityConfiguration;
import br.com.sca.gateway.domain.SensorLeitura;
import br.com.sca.gateway.repository.SensorLeituraRepository;
import br.com.sca.gateway.repository.search.SensorLeituraSearchRepository;
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
 * Integration tests for the {@link SensorLeituraResource} REST controller.
 */
@SpringBootTest(classes = {GatewayApp.class, TestSecurityConfiguration.class})
public class SensorLeituraResourceIT {

    private static final String DEFAULT_LEITURA = "AAAAAAAAAA";
    private static final String UPDATED_LEITURA = "BBBBBBBBBB";

    @Autowired
    private SensorLeituraRepository sensorLeituraRepository;

    /**
     * This repository is mocked in the br.com.sca.gateway.repository.search test package.
     *
     * @see br.com.sca.gateway.repository.search.SensorLeituraSearchRepositoryMockConfiguration
     */
    @Autowired
    private SensorLeituraSearchRepository mockSensorLeituraSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restSensorLeituraMockMvc;

    private SensorLeitura sensorLeitura;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SensorLeituraResource sensorLeituraResource = new SensorLeituraResource(sensorLeituraRepository, mockSensorLeituraSearchRepository);
        this.restSensorLeituraMockMvc = MockMvcBuilders.standaloneSetup(sensorLeituraResource)
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
    public static SensorLeitura createEntity() {
        SensorLeitura sensorLeitura = new SensorLeitura()
            .leitura(DEFAULT_LEITURA);
        return sensorLeitura;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SensorLeitura createUpdatedEntity() {
        SensorLeitura sensorLeitura = new SensorLeitura()
            .leitura(UPDATED_LEITURA);
        return sensorLeitura;
    }

    @BeforeEach
    public void initTest() {
        sensorLeituraRepository.deleteAll();
        sensorLeitura = createEntity();
    }

    @Test
    public void createSensorLeitura() throws Exception {
        int databaseSizeBeforeCreate = sensorLeituraRepository.findAll().size();

        // Create the SensorLeitura
        restSensorLeituraMockMvc.perform(post("/api/sensor-leituras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sensorLeitura)))
            .andExpect(status().isCreated());

        // Validate the SensorLeitura in the database
        List<SensorLeitura> sensorLeituraList = sensorLeituraRepository.findAll();
        assertThat(sensorLeituraList).hasSize(databaseSizeBeforeCreate + 1);
        SensorLeitura testSensorLeitura = sensorLeituraList.get(sensorLeituraList.size() - 1);
        assertThat(testSensorLeitura.getLeitura()).isEqualTo(DEFAULT_LEITURA);

        // Validate the SensorLeitura in Elasticsearch
        verify(mockSensorLeituraSearchRepository, times(1)).save(testSensorLeitura);
    }

    @Test
    public void createSensorLeituraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sensorLeituraRepository.findAll().size();

        // Create the SensorLeitura with an existing ID
        sensorLeitura.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restSensorLeituraMockMvc.perform(post("/api/sensor-leituras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sensorLeitura)))
            .andExpect(status().isBadRequest());

        // Validate the SensorLeitura in the database
        List<SensorLeitura> sensorLeituraList = sensorLeituraRepository.findAll();
        assertThat(sensorLeituraList).hasSize(databaseSizeBeforeCreate);

        // Validate the SensorLeitura in Elasticsearch
        verify(mockSensorLeituraSearchRepository, times(0)).save(sensorLeitura);
    }


    @Test
    public void getAllSensorLeituras() throws Exception {
        // Initialize the database
        sensorLeituraRepository.save(sensorLeitura);

        // Get all the sensorLeituraList
        restSensorLeituraMockMvc.perform(get("/api/sensor-leituras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sensorLeitura.getId())))
            .andExpect(jsonPath("$.[*].leitura").value(hasItem(DEFAULT_LEITURA)));
    }
    
    @Test
    public void getSensorLeitura() throws Exception {
        // Initialize the database
        sensorLeituraRepository.save(sensorLeitura);

        // Get the sensorLeitura
        restSensorLeituraMockMvc.perform(get("/api/sensor-leituras/{id}", sensorLeitura.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sensorLeitura.getId()))
            .andExpect(jsonPath("$.leitura").value(DEFAULT_LEITURA));
    }

    @Test
    public void getNonExistingSensorLeitura() throws Exception {
        // Get the sensorLeitura
        restSensorLeituraMockMvc.perform(get("/api/sensor-leituras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSensorLeitura() throws Exception {
        // Initialize the database
        sensorLeituraRepository.save(sensorLeitura);

        int databaseSizeBeforeUpdate = sensorLeituraRepository.findAll().size();

        // Update the sensorLeitura
        SensorLeitura updatedSensorLeitura = sensorLeituraRepository.findById(sensorLeitura.getId()).get();
        updatedSensorLeitura
            .leitura(UPDATED_LEITURA);

        restSensorLeituraMockMvc.perform(put("/api/sensor-leituras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSensorLeitura)))
            .andExpect(status().isOk());

        // Validate the SensorLeitura in the database
        List<SensorLeitura> sensorLeituraList = sensorLeituraRepository.findAll();
        assertThat(sensorLeituraList).hasSize(databaseSizeBeforeUpdate);
        SensorLeitura testSensorLeitura = sensorLeituraList.get(sensorLeituraList.size() - 1);
        assertThat(testSensorLeitura.getLeitura()).isEqualTo(UPDATED_LEITURA);

        // Validate the SensorLeitura in Elasticsearch
        verify(mockSensorLeituraSearchRepository, times(1)).save(testSensorLeitura);
    }

    @Test
    public void updateNonExistingSensorLeitura() throws Exception {
        int databaseSizeBeforeUpdate = sensorLeituraRepository.findAll().size();

        // Create the SensorLeitura

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSensorLeituraMockMvc.perform(put("/api/sensor-leituras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sensorLeitura)))
            .andExpect(status().isBadRequest());

        // Validate the SensorLeitura in the database
        List<SensorLeitura> sensorLeituraList = sensorLeituraRepository.findAll();
        assertThat(sensorLeituraList).hasSize(databaseSizeBeforeUpdate);

        // Validate the SensorLeitura in Elasticsearch
        verify(mockSensorLeituraSearchRepository, times(0)).save(sensorLeitura);
    }

    @Test
    public void deleteSensorLeitura() throws Exception {
        // Initialize the database
        sensorLeituraRepository.save(sensorLeitura);

        int databaseSizeBeforeDelete = sensorLeituraRepository.findAll().size();

        // Delete the sensorLeitura
        restSensorLeituraMockMvc.perform(delete("/api/sensor-leituras/{id}", sensorLeitura.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SensorLeitura> sensorLeituraList = sensorLeituraRepository.findAll();
        assertThat(sensorLeituraList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the SensorLeitura in Elasticsearch
        verify(mockSensorLeituraSearchRepository, times(1)).deleteById(sensorLeitura.getId());
    }

    @Test
    public void searchSensorLeitura() throws Exception {
        // Initialize the database
        sensorLeituraRepository.save(sensorLeitura);
        when(mockSensorLeituraSearchRepository.search(queryStringQuery("id:" + sensorLeitura.getId())))
            .thenReturn(Collections.singletonList(sensorLeitura));
        // Search the sensorLeitura
        restSensorLeituraMockMvc.perform(get("/api/_search/sensor-leituras?query=id:" + sensorLeitura.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sensorLeitura.getId())))
            .andExpect(jsonPath("$.[*].leitura").value(hasItem(DEFAULT_LEITURA)));
    }
}
