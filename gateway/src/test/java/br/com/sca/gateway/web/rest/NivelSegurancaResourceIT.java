package br.com.sca.gateway.web.rest;

import br.com.sca.gateway.GatewayApp;
import br.com.sca.gateway.config.TestSecurityConfiguration;
import br.com.sca.gateway.domain.NivelSeguranca;
import br.com.sca.gateway.repository.NivelSegurancaRepository;
import br.com.sca.gateway.repository.search.NivelSegurancaSearchRepository;
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
 * Integration tests for the {@link NivelSegurancaResource} REST controller.
 */
@SpringBootTest(classes = {GatewayApp.class, TestSecurityConfiguration.class})
public class NivelSegurancaResourceIT {

    private static final String DEFAULT_NIVEL = "AAAAAAAAAA";
    private static final String UPDATED_NIVEL = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private NivelSegurancaRepository nivelSegurancaRepository;

    /**
     * This repository is mocked in the br.com.sca.gateway.repository.search test package.
     *
     * @see br.com.sca.gateway.repository.search.NivelSegurancaSearchRepositoryMockConfiguration
     */
    @Autowired
    private NivelSegurancaSearchRepository mockNivelSegurancaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restNivelSegurancaMockMvc;

    private NivelSeguranca nivelSeguranca;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NivelSegurancaResource nivelSegurancaResource = new NivelSegurancaResource(nivelSegurancaRepository, mockNivelSegurancaSearchRepository);
        this.restNivelSegurancaMockMvc = MockMvcBuilders.standaloneSetup(nivelSegurancaResource)
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
    public static NivelSeguranca createEntity() {
        NivelSeguranca nivelSeguranca = new NivelSeguranca()
            .nivel(DEFAULT_NIVEL)
            .descricao(DEFAULT_DESCRICAO);
        return nivelSeguranca;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NivelSeguranca createUpdatedEntity() {
        NivelSeguranca nivelSeguranca = new NivelSeguranca()
            .nivel(UPDATED_NIVEL)
            .descricao(UPDATED_DESCRICAO);
        return nivelSeguranca;
    }

    @BeforeEach
    public void initTest() {
        nivelSegurancaRepository.deleteAll();
        nivelSeguranca = createEntity();
    }

    @Test
    public void createNivelSeguranca() throws Exception {
        int databaseSizeBeforeCreate = nivelSegurancaRepository.findAll().size();

        // Create the NivelSeguranca
        restNivelSegurancaMockMvc.perform(post("/api/nivel-segurancas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nivelSeguranca)))
            .andExpect(status().isCreated());

        // Validate the NivelSeguranca in the database
        List<NivelSeguranca> nivelSegurancaList = nivelSegurancaRepository.findAll();
        assertThat(nivelSegurancaList).hasSize(databaseSizeBeforeCreate + 1);
        NivelSeguranca testNivelSeguranca = nivelSegurancaList.get(nivelSegurancaList.size() - 1);
        assertThat(testNivelSeguranca.getNivel()).isEqualTo(DEFAULT_NIVEL);
        assertThat(testNivelSeguranca.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);

        // Validate the NivelSeguranca in Elasticsearch
        verify(mockNivelSegurancaSearchRepository, times(1)).save(testNivelSeguranca);
    }

    @Test
    public void createNivelSegurancaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nivelSegurancaRepository.findAll().size();

        // Create the NivelSeguranca with an existing ID
        nivelSeguranca.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restNivelSegurancaMockMvc.perform(post("/api/nivel-segurancas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nivelSeguranca)))
            .andExpect(status().isBadRequest());

        // Validate the NivelSeguranca in the database
        List<NivelSeguranca> nivelSegurancaList = nivelSegurancaRepository.findAll();
        assertThat(nivelSegurancaList).hasSize(databaseSizeBeforeCreate);

        // Validate the NivelSeguranca in Elasticsearch
        verify(mockNivelSegurancaSearchRepository, times(0)).save(nivelSeguranca);
    }


    @Test
    public void getAllNivelSegurancas() throws Exception {
        // Initialize the database
        nivelSegurancaRepository.save(nivelSeguranca);

        // Get all the nivelSegurancaList
        restNivelSegurancaMockMvc.perform(get("/api/nivel-segurancas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nivelSeguranca.getId())))
            .andExpect(jsonPath("$.[*].nivel").value(hasItem(DEFAULT_NIVEL)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }
    
    @Test
    public void getNivelSeguranca() throws Exception {
        // Initialize the database
        nivelSegurancaRepository.save(nivelSeguranca);

        // Get the nivelSeguranca
        restNivelSegurancaMockMvc.perform(get("/api/nivel-segurancas/{id}", nivelSeguranca.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nivelSeguranca.getId()))
            .andExpect(jsonPath("$.nivel").value(DEFAULT_NIVEL))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }

    @Test
    public void getNonExistingNivelSeguranca() throws Exception {
        // Get the nivelSeguranca
        restNivelSegurancaMockMvc.perform(get("/api/nivel-segurancas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateNivelSeguranca() throws Exception {
        // Initialize the database
        nivelSegurancaRepository.save(nivelSeguranca);

        int databaseSizeBeforeUpdate = nivelSegurancaRepository.findAll().size();

        // Update the nivelSeguranca
        NivelSeguranca updatedNivelSeguranca = nivelSegurancaRepository.findById(nivelSeguranca.getId()).get();
        updatedNivelSeguranca
            .nivel(UPDATED_NIVEL)
            .descricao(UPDATED_DESCRICAO);

        restNivelSegurancaMockMvc.perform(put("/api/nivel-segurancas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNivelSeguranca)))
            .andExpect(status().isOk());

        // Validate the NivelSeguranca in the database
        List<NivelSeguranca> nivelSegurancaList = nivelSegurancaRepository.findAll();
        assertThat(nivelSegurancaList).hasSize(databaseSizeBeforeUpdate);
        NivelSeguranca testNivelSeguranca = nivelSegurancaList.get(nivelSegurancaList.size() - 1);
        assertThat(testNivelSeguranca.getNivel()).isEqualTo(UPDATED_NIVEL);
        assertThat(testNivelSeguranca.getDescricao()).isEqualTo(UPDATED_DESCRICAO);

        // Validate the NivelSeguranca in Elasticsearch
        verify(mockNivelSegurancaSearchRepository, times(1)).save(testNivelSeguranca);
    }

    @Test
    public void updateNonExistingNivelSeguranca() throws Exception {
        int databaseSizeBeforeUpdate = nivelSegurancaRepository.findAll().size();

        // Create the NivelSeguranca

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNivelSegurancaMockMvc.perform(put("/api/nivel-segurancas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nivelSeguranca)))
            .andExpect(status().isBadRequest());

        // Validate the NivelSeguranca in the database
        List<NivelSeguranca> nivelSegurancaList = nivelSegurancaRepository.findAll();
        assertThat(nivelSegurancaList).hasSize(databaseSizeBeforeUpdate);

        // Validate the NivelSeguranca in Elasticsearch
        verify(mockNivelSegurancaSearchRepository, times(0)).save(nivelSeguranca);
    }

    @Test
    public void deleteNivelSeguranca() throws Exception {
        // Initialize the database
        nivelSegurancaRepository.save(nivelSeguranca);

        int databaseSizeBeforeDelete = nivelSegurancaRepository.findAll().size();

        // Delete the nivelSeguranca
        restNivelSegurancaMockMvc.perform(delete("/api/nivel-segurancas/{id}", nivelSeguranca.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NivelSeguranca> nivelSegurancaList = nivelSegurancaRepository.findAll();
        assertThat(nivelSegurancaList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the NivelSeguranca in Elasticsearch
        verify(mockNivelSegurancaSearchRepository, times(1)).deleteById(nivelSeguranca.getId());
    }

    @Test
    public void searchNivelSeguranca() throws Exception {
        // Initialize the database
        nivelSegurancaRepository.save(nivelSeguranca);
        when(mockNivelSegurancaSearchRepository.search(queryStringQuery("id:" + nivelSeguranca.getId())))
            .thenReturn(Collections.singletonList(nivelSeguranca));
        // Search the nivelSeguranca
        restNivelSegurancaMockMvc.perform(get("/api/_search/nivel-segurancas?query=id:" + nivelSeguranca.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nivelSeguranca.getId())))
            .andExpect(jsonPath("$.[*].nivel").value(hasItem(DEFAULT_NIVEL)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }
}
