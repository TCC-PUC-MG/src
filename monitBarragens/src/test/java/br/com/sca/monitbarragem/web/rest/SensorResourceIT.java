package br.com.sca.monitbarragem.web.rest;

import br.com.sca.monitbarragem.MonitBarragensApp;
import br.com.sca.monitbarragem.config.TestSecurityConfiguration;
import br.com.sca.monitbarragem.domain.Sensor;
import br.com.sca.monitbarragem.repository.SensorRepository;
import br.com.sca.monitbarragem.repository.search.SensorSearchRepository;
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
 * Integration tests for the {@link SensorResource} REST controller.
 */
@SpringBootTest(classes = {MonitBarragensApp.class, TestSecurityConfiguration.class})
public class SensorResourceIT {

    private static final Integer DEFAULT_NUMERO = 1;
    private static final Integer UPDATED_NUMERO = 2;

    @Autowired
    private SensorRepository sensorRepository;

    /**
     * This repository is mocked in the br.com.sca.monitbarragem.repository.search test package.
     *
     * @see br.com.sca.monitbarragem.repository.search.SensorSearchRepositoryMockConfiguration
     */
    @Autowired
    private SensorSearchRepository mockSensorSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restSensorMockMvc;

    private Sensor sensor;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SensorResource sensorResource = new SensorResource(sensorRepository, mockSensorSearchRepository);
        this.restSensorMockMvc = MockMvcBuilders.standaloneSetup(sensorResource)
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
    public static Sensor createEntity() {
        Sensor sensor = new Sensor()
            .numero(DEFAULT_NUMERO);
        return sensor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sensor createUpdatedEntity() {
        Sensor sensor = new Sensor()
            .numero(UPDATED_NUMERO);
        return sensor;
    }

    @BeforeEach
    public void initTest() {
        sensorRepository.deleteAll();
        sensor = createEntity();
    }

    @Test
    public void createSensor() throws Exception {
        int databaseSizeBeforeCreate = sensorRepository.findAll().size();

        // Create the Sensor
        restSensorMockMvc.perform(post("/api/sensors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sensor)))
            .andExpect(status().isCreated());

        // Validate the Sensor in the database
        List<Sensor> sensorList = sensorRepository.findAll();
        assertThat(sensorList).hasSize(databaseSizeBeforeCreate + 1);
        Sensor testSensor = sensorList.get(sensorList.size() - 1);
        assertThat(testSensor.getNumero()).isEqualTo(DEFAULT_NUMERO);

        // Validate the Sensor in Elasticsearch
        verify(mockSensorSearchRepository, times(1)).save(testSensor);
    }

    @Test
    public void createSensorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sensorRepository.findAll().size();

        // Create the Sensor with an existing ID
        sensor.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restSensorMockMvc.perform(post("/api/sensors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sensor)))
            .andExpect(status().isBadRequest());

        // Validate the Sensor in the database
        List<Sensor> sensorList = sensorRepository.findAll();
        assertThat(sensorList).hasSize(databaseSizeBeforeCreate);

        // Validate the Sensor in Elasticsearch
        verify(mockSensorSearchRepository, times(0)).save(sensor);
    }


    @Test
    public void getAllSensors() throws Exception {
        // Initialize the database
        sensorRepository.save(sensor);

        // Get all the sensorList
        restSensorMockMvc.perform(get("/api/sensors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sensor.getId())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)));
    }
    
    @Test
    public void getSensor() throws Exception {
        // Initialize the database
        sensorRepository.save(sensor);

        // Get the sensor
        restSensorMockMvc.perform(get("/api/sensors/{id}", sensor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sensor.getId()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO));
    }

    @Test
    public void getNonExistingSensor() throws Exception {
        // Get the sensor
        restSensorMockMvc.perform(get("/api/sensors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSensor() throws Exception {
        // Initialize the database
        sensorRepository.save(sensor);

        int databaseSizeBeforeUpdate = sensorRepository.findAll().size();

        // Update the sensor
        Sensor updatedSensor = sensorRepository.findById(sensor.getId()).get();
        updatedSensor
            .numero(UPDATED_NUMERO);

        restSensorMockMvc.perform(put("/api/sensors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSensor)))
            .andExpect(status().isOk());

        // Validate the Sensor in the database
        List<Sensor> sensorList = sensorRepository.findAll();
        assertThat(sensorList).hasSize(databaseSizeBeforeUpdate);
        Sensor testSensor = sensorList.get(sensorList.size() - 1);
        assertThat(testSensor.getNumero()).isEqualTo(UPDATED_NUMERO);

        // Validate the Sensor in Elasticsearch
        verify(mockSensorSearchRepository, times(1)).save(testSensor);
    }

    @Test
    public void updateNonExistingSensor() throws Exception {
        int databaseSizeBeforeUpdate = sensorRepository.findAll().size();

        // Create the Sensor

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSensorMockMvc.perform(put("/api/sensors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sensor)))
            .andExpect(status().isBadRequest());

        // Validate the Sensor in the database
        List<Sensor> sensorList = sensorRepository.findAll();
        assertThat(sensorList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Sensor in Elasticsearch
        verify(mockSensorSearchRepository, times(0)).save(sensor);
    }

    @Test
    public void deleteSensor() throws Exception {
        // Initialize the database
        sensorRepository.save(sensor);

        int databaseSizeBeforeDelete = sensorRepository.findAll().size();

        // Delete the sensor
        restSensorMockMvc.perform(delete("/api/sensors/{id}", sensor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Sensor> sensorList = sensorRepository.findAll();
        assertThat(sensorList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Sensor in Elasticsearch
        verify(mockSensorSearchRepository, times(1)).deleteById(sensor.getId());
    }

    @Test
    public void searchSensor() throws Exception {
        // Initialize the database
        sensorRepository.save(sensor);
        when(mockSensorSearchRepository.search(queryStringQuery("id:" + sensor.getId())))
            .thenReturn(Collections.singletonList(sensor));
        // Search the sensor
        restSensorMockMvc.perform(get("/api/_search/sensors?query=id:" + sensor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sensor.getId())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)));
    }
}
