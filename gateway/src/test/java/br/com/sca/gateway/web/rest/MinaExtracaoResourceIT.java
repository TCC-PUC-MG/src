package br.com.sca.gateway.web.rest;

import br.com.sca.gateway.GatewayApp;
import br.com.sca.gateway.config.TestSecurityConfiguration;
import br.com.sca.gateway.domain.MinaExtracao;
import br.com.sca.gateway.repository.MinaExtracaoRepository;
import br.com.sca.gateway.repository.search.MinaExtracaoSearchRepository;
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
 * Integration tests for the {@link MinaExtracaoResource} REST controller.
 */
@SpringBootTest(classes = {GatewayApp.class, TestSecurityConfiguration.class})
public class MinaExtracaoResourceIT {

    private static final String DEFAULT_TAMANHO = "AAAAAAAAAA";
    private static final String UPDATED_TAMANHO = "BBBBBBBBBB";

    @Autowired
    private MinaExtracaoRepository minaExtracaoRepository;

    /**
     * This repository is mocked in the br.com.sca.gateway.repository.search test package.
     *
     * @see br.com.sca.gateway.repository.search.MinaExtracaoSearchRepositoryMockConfiguration
     */
    @Autowired
    private MinaExtracaoSearchRepository mockMinaExtracaoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restMinaExtracaoMockMvc;

    private MinaExtracao minaExtracao;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MinaExtracaoResource minaExtracaoResource = new MinaExtracaoResource(minaExtracaoRepository, mockMinaExtracaoSearchRepository);
        this.restMinaExtracaoMockMvc = MockMvcBuilders.standaloneSetup(minaExtracaoResource)
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
    public static MinaExtracao createEntity() {
        MinaExtracao minaExtracao = new MinaExtracao()
            .tamanho(DEFAULT_TAMANHO);
        return minaExtracao;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MinaExtracao createUpdatedEntity() {
        MinaExtracao minaExtracao = new MinaExtracao()
            .tamanho(UPDATED_TAMANHO);
        return minaExtracao;
    }

    @BeforeEach
    public void initTest() {
        minaExtracaoRepository.deleteAll();
        minaExtracao = createEntity();
    }

    @Test
    public void createMinaExtracao() throws Exception {
        int databaseSizeBeforeCreate = minaExtracaoRepository.findAll().size();

        // Create the MinaExtracao
        restMinaExtracaoMockMvc.perform(post("/api/mina-extracaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(minaExtracao)))
            .andExpect(status().isCreated());

        // Validate the MinaExtracao in the database
        List<MinaExtracao> minaExtracaoList = minaExtracaoRepository.findAll();
        assertThat(minaExtracaoList).hasSize(databaseSizeBeforeCreate + 1);
        MinaExtracao testMinaExtracao = minaExtracaoList.get(minaExtracaoList.size() - 1);
        assertThat(testMinaExtracao.getTamanho()).isEqualTo(DEFAULT_TAMANHO);

        // Validate the MinaExtracao in Elasticsearch
        verify(mockMinaExtracaoSearchRepository, times(1)).save(testMinaExtracao);
    }

    @Test
    public void createMinaExtracaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = minaExtracaoRepository.findAll().size();

        // Create the MinaExtracao with an existing ID
        minaExtracao.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restMinaExtracaoMockMvc.perform(post("/api/mina-extracaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(minaExtracao)))
            .andExpect(status().isBadRequest());

        // Validate the MinaExtracao in the database
        List<MinaExtracao> minaExtracaoList = minaExtracaoRepository.findAll();
        assertThat(minaExtracaoList).hasSize(databaseSizeBeforeCreate);

        // Validate the MinaExtracao in Elasticsearch
        verify(mockMinaExtracaoSearchRepository, times(0)).save(minaExtracao);
    }


    @Test
    public void getAllMinaExtracaos() throws Exception {
        // Initialize the database
        minaExtracaoRepository.save(minaExtracao);

        // Get all the minaExtracaoList
        restMinaExtracaoMockMvc.perform(get("/api/mina-extracaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(minaExtracao.getId())))
            .andExpect(jsonPath("$.[*].tamanho").value(hasItem(DEFAULT_TAMANHO)));
    }
    
    @Test
    public void getMinaExtracao() throws Exception {
        // Initialize the database
        minaExtracaoRepository.save(minaExtracao);

        // Get the minaExtracao
        restMinaExtracaoMockMvc.perform(get("/api/mina-extracaos/{id}", minaExtracao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(minaExtracao.getId()))
            .andExpect(jsonPath("$.tamanho").value(DEFAULT_TAMANHO));
    }

    @Test
    public void getNonExistingMinaExtracao() throws Exception {
        // Get the minaExtracao
        restMinaExtracaoMockMvc.perform(get("/api/mina-extracaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateMinaExtracao() throws Exception {
        // Initialize the database
        minaExtracaoRepository.save(minaExtracao);

        int databaseSizeBeforeUpdate = minaExtracaoRepository.findAll().size();

        // Update the minaExtracao
        MinaExtracao updatedMinaExtracao = minaExtracaoRepository.findById(minaExtracao.getId()).get();
        updatedMinaExtracao
            .tamanho(UPDATED_TAMANHO);

        restMinaExtracaoMockMvc.perform(put("/api/mina-extracaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMinaExtracao)))
            .andExpect(status().isOk());

        // Validate the MinaExtracao in the database
        List<MinaExtracao> minaExtracaoList = minaExtracaoRepository.findAll();
        assertThat(minaExtracaoList).hasSize(databaseSizeBeforeUpdate);
        MinaExtracao testMinaExtracao = minaExtracaoList.get(minaExtracaoList.size() - 1);
        assertThat(testMinaExtracao.getTamanho()).isEqualTo(UPDATED_TAMANHO);

        // Validate the MinaExtracao in Elasticsearch
        verify(mockMinaExtracaoSearchRepository, times(1)).save(testMinaExtracao);
    }

    @Test
    public void updateNonExistingMinaExtracao() throws Exception {
        int databaseSizeBeforeUpdate = minaExtracaoRepository.findAll().size();

        // Create the MinaExtracao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMinaExtracaoMockMvc.perform(put("/api/mina-extracaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(minaExtracao)))
            .andExpect(status().isBadRequest());

        // Validate the MinaExtracao in the database
        List<MinaExtracao> minaExtracaoList = minaExtracaoRepository.findAll();
        assertThat(minaExtracaoList).hasSize(databaseSizeBeforeUpdate);

        // Validate the MinaExtracao in Elasticsearch
        verify(mockMinaExtracaoSearchRepository, times(0)).save(minaExtracao);
    }

    @Test
    public void deleteMinaExtracao() throws Exception {
        // Initialize the database
        minaExtracaoRepository.save(minaExtracao);

        int databaseSizeBeforeDelete = minaExtracaoRepository.findAll().size();

        // Delete the minaExtracao
        restMinaExtracaoMockMvc.perform(delete("/api/mina-extracaos/{id}", minaExtracao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MinaExtracao> minaExtracaoList = minaExtracaoRepository.findAll();
        assertThat(minaExtracaoList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the MinaExtracao in Elasticsearch
        verify(mockMinaExtracaoSearchRepository, times(1)).deleteById(minaExtracao.getId());
    }

    @Test
    public void searchMinaExtracao() throws Exception {
        // Initialize the database
        minaExtracaoRepository.save(minaExtracao);
        when(mockMinaExtracaoSearchRepository.search(queryStringQuery("id:" + minaExtracao.getId())))
            .thenReturn(Collections.singletonList(minaExtracao));
        // Search the minaExtracao
        restMinaExtracaoMockMvc.perform(get("/api/_search/mina-extracaos?query=id:" + minaExtracao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(minaExtracao.getId())))
            .andExpect(jsonPath("$.[*].tamanho").value(hasItem(DEFAULT_TAMANHO)));
    }
}
