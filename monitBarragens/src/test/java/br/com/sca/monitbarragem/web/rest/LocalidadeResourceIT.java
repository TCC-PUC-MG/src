package br.com.sca.monitbarragem.web.rest;

import br.com.sca.monitbarragem.MonitBarragensApp;
import br.com.sca.monitbarragem.config.TestSecurityConfiguration;
import br.com.sca.monitbarragem.domain.Localidade;
import br.com.sca.monitbarragem.repository.LocalidadeRepository;
import br.com.sca.monitbarragem.repository.search.LocalidadeSearchRepository;
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


import java.math.BigDecimal;
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
 * Integration tests for the {@link LocalidadeResource} REST controller.
 */
@SpringBootTest(classes = {MonitBarragensApp.class, TestSecurityConfiguration.class})
public class LocalidadeResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_LATITUTE = new BigDecimal(1);
    private static final BigDecimal UPDATED_LATITUTE = new BigDecimal(2);

    private static final BigDecimal DEFAULT_LONGITUDE = new BigDecimal(1);
    private static final BigDecimal UPDATED_LONGITUDE = new BigDecimal(2);

    @Autowired
    private LocalidadeRepository localidadeRepository;

    /**
     * This repository is mocked in the br.com.sca.monitbarragem.repository.search test package.
     *
     * @see br.com.sca.monitbarragem.repository.search.LocalidadeSearchRepositoryMockConfiguration
     */
    @Autowired
    private LocalidadeSearchRepository mockLocalidadeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restLocalidadeMockMvc;

    private Localidade localidade;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LocalidadeResource localidadeResource = new LocalidadeResource(localidadeRepository, mockLocalidadeSearchRepository);
        this.restLocalidadeMockMvc = MockMvcBuilders.standaloneSetup(localidadeResource)
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
    public static Localidade createEntity() {
        Localidade localidade = new Localidade()
            .nome(DEFAULT_NOME)
            .latitute(DEFAULT_LATITUTE)
            .longitude(DEFAULT_LONGITUDE);
        return localidade;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Localidade createUpdatedEntity() {
        Localidade localidade = new Localidade()
            .nome(UPDATED_NOME)
            .latitute(UPDATED_LATITUTE)
            .longitude(UPDATED_LONGITUDE);
        return localidade;
    }

    @BeforeEach
    public void initTest() {
        localidadeRepository.deleteAll();
        localidade = createEntity();
    }

    @Test
    public void createLocalidade() throws Exception {
        int databaseSizeBeforeCreate = localidadeRepository.findAll().size();

        // Create the Localidade
        restLocalidadeMockMvc.perform(post("/api/localidades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(localidade)))
            .andExpect(status().isCreated());

        // Validate the Localidade in the database
        List<Localidade> localidadeList = localidadeRepository.findAll();
        assertThat(localidadeList).hasSize(databaseSizeBeforeCreate + 1);
        Localidade testLocalidade = localidadeList.get(localidadeList.size() - 1);
        assertThat(testLocalidade.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testLocalidade.getLatitute()).isEqualTo(DEFAULT_LATITUTE);
        assertThat(testLocalidade.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);

        // Validate the Localidade in Elasticsearch
        verify(mockLocalidadeSearchRepository, times(1)).save(testLocalidade);
    }

    @Test
    public void createLocalidadeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = localidadeRepository.findAll().size();

        // Create the Localidade with an existing ID
        localidade.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalidadeMockMvc.perform(post("/api/localidades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(localidade)))
            .andExpect(status().isBadRequest());

        // Validate the Localidade in the database
        List<Localidade> localidadeList = localidadeRepository.findAll();
        assertThat(localidadeList).hasSize(databaseSizeBeforeCreate);

        // Validate the Localidade in Elasticsearch
        verify(mockLocalidadeSearchRepository, times(0)).save(localidade);
    }


    @Test
    public void getAllLocalidades() throws Exception {
        // Initialize the database
        localidadeRepository.save(localidade);

        // Get all the localidadeList
        restLocalidadeMockMvc.perform(get("/api/localidades?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localidade.getId())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].latitute").value(hasItem(DEFAULT_LATITUTE.intValue())))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.intValue())));
    }
    
    @Test
    public void getLocalidade() throws Exception {
        // Initialize the database
        localidadeRepository.save(localidade);

        // Get the localidade
        restLocalidadeMockMvc.perform(get("/api/localidades/{id}", localidade.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(localidade.getId()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.latitute").value(DEFAULT_LATITUTE.intValue()))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.intValue()));
    }

    @Test
    public void getNonExistingLocalidade() throws Exception {
        // Get the localidade
        restLocalidadeMockMvc.perform(get("/api/localidades/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateLocalidade() throws Exception {
        // Initialize the database
        localidadeRepository.save(localidade);

        int databaseSizeBeforeUpdate = localidadeRepository.findAll().size();

        // Update the localidade
        Localidade updatedLocalidade = localidadeRepository.findById(localidade.getId()).get();
        updatedLocalidade
            .nome(UPDATED_NOME)
            .latitute(UPDATED_LATITUTE)
            .longitude(UPDATED_LONGITUDE);

        restLocalidadeMockMvc.perform(put("/api/localidades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLocalidade)))
            .andExpect(status().isOk());

        // Validate the Localidade in the database
        List<Localidade> localidadeList = localidadeRepository.findAll();
        assertThat(localidadeList).hasSize(databaseSizeBeforeUpdate);
        Localidade testLocalidade = localidadeList.get(localidadeList.size() - 1);
        assertThat(testLocalidade.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testLocalidade.getLatitute()).isEqualTo(UPDATED_LATITUTE);
        assertThat(testLocalidade.getLongitude()).isEqualTo(UPDATED_LONGITUDE);

        // Validate the Localidade in Elasticsearch
        verify(mockLocalidadeSearchRepository, times(1)).save(testLocalidade);
    }

    @Test
    public void updateNonExistingLocalidade() throws Exception {
        int databaseSizeBeforeUpdate = localidadeRepository.findAll().size();

        // Create the Localidade

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalidadeMockMvc.perform(put("/api/localidades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(localidade)))
            .andExpect(status().isBadRequest());

        // Validate the Localidade in the database
        List<Localidade> localidadeList = localidadeRepository.findAll();
        assertThat(localidadeList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Localidade in Elasticsearch
        verify(mockLocalidadeSearchRepository, times(0)).save(localidade);
    }

    @Test
    public void deleteLocalidade() throws Exception {
        // Initialize the database
        localidadeRepository.save(localidade);

        int databaseSizeBeforeDelete = localidadeRepository.findAll().size();

        // Delete the localidade
        restLocalidadeMockMvc.perform(delete("/api/localidades/{id}", localidade.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Localidade> localidadeList = localidadeRepository.findAll();
        assertThat(localidadeList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Localidade in Elasticsearch
        verify(mockLocalidadeSearchRepository, times(1)).deleteById(localidade.getId());
    }

    @Test
    public void searchLocalidade() throws Exception {
        // Initialize the database
        localidadeRepository.save(localidade);
        when(mockLocalidadeSearchRepository.search(queryStringQuery("id:" + localidade.getId())))
            .thenReturn(Collections.singletonList(localidade));
        // Search the localidade
        restLocalidadeMockMvc.perform(get("/api/_search/localidades?query=id:" + localidade.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localidade.getId())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].latitute").value(hasItem(DEFAULT_LATITUTE.intValue())))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.intValue())));
    }
}
