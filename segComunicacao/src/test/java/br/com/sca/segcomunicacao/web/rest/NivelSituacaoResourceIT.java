package br.com.sca.segcomunicacao.web.rest;

import br.com.sca.segcomunicacao.SegComunicacaoApp;
import br.com.sca.segcomunicacao.config.TestSecurityConfiguration;
import br.com.sca.segcomunicacao.domain.NivelSituacao;
import br.com.sca.segcomunicacao.repository.NivelSituacaoRepository;
import br.com.sca.segcomunicacao.repository.search.NivelSituacaoSearchRepository;
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
 * Integration tests for the {@link NivelSituacaoResource} REST controller.
 */
@SpringBootTest(classes = {SegComunicacaoApp.class, TestSecurityConfiguration.class})
public class NivelSituacaoResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private NivelSituacaoRepository nivelSituacaoRepository;

    /**
     * This repository is mocked in the br.com.sca.segcomunicacao.repository.search test package.
     *
     * @see br.com.sca.segcomunicacao.repository.search.NivelSituacaoSearchRepositoryMockConfiguration
     */
    @Autowired
    private NivelSituacaoSearchRepository mockNivelSituacaoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restNivelSituacaoMockMvc;

    private NivelSituacao nivelSituacao;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NivelSituacaoResource nivelSituacaoResource = new NivelSituacaoResource(nivelSituacaoRepository, mockNivelSituacaoSearchRepository);
        this.restNivelSituacaoMockMvc = MockMvcBuilders.standaloneSetup(nivelSituacaoResource)
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
    public static NivelSituacao createEntity() {
        NivelSituacao nivelSituacao = new NivelSituacao()
            .descricao(DEFAULT_DESCRICAO);
        return nivelSituacao;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NivelSituacao createUpdatedEntity() {
        NivelSituacao nivelSituacao = new NivelSituacao()
            .descricao(UPDATED_DESCRICAO);
        return nivelSituacao;
    }

    @BeforeEach
    public void initTest() {
        nivelSituacaoRepository.deleteAll();
        nivelSituacao = createEntity();
    }

    @Test
    public void createNivelSituacao() throws Exception {
        int databaseSizeBeforeCreate = nivelSituacaoRepository.findAll().size();

        // Create the NivelSituacao
        restNivelSituacaoMockMvc.perform(post("/api/nivel-situacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nivelSituacao)))
            .andExpect(status().isCreated());

        // Validate the NivelSituacao in the database
        List<NivelSituacao> nivelSituacaoList = nivelSituacaoRepository.findAll();
        assertThat(nivelSituacaoList).hasSize(databaseSizeBeforeCreate + 1);
        NivelSituacao testNivelSituacao = nivelSituacaoList.get(nivelSituacaoList.size() - 1);
        assertThat(testNivelSituacao.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);

        // Validate the NivelSituacao in Elasticsearch
        verify(mockNivelSituacaoSearchRepository, times(1)).save(testNivelSituacao);
    }

    @Test
    public void createNivelSituacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nivelSituacaoRepository.findAll().size();

        // Create the NivelSituacao with an existing ID
        nivelSituacao.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restNivelSituacaoMockMvc.perform(post("/api/nivel-situacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nivelSituacao)))
            .andExpect(status().isBadRequest());

        // Validate the NivelSituacao in the database
        List<NivelSituacao> nivelSituacaoList = nivelSituacaoRepository.findAll();
        assertThat(nivelSituacaoList).hasSize(databaseSizeBeforeCreate);

        // Validate the NivelSituacao in Elasticsearch
        verify(mockNivelSituacaoSearchRepository, times(0)).save(nivelSituacao);
    }


    @Test
    public void getAllNivelSituacaos() throws Exception {
        // Initialize the database
        nivelSituacaoRepository.save(nivelSituacao);

        // Get all the nivelSituacaoList
        restNivelSituacaoMockMvc.perform(get("/api/nivel-situacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nivelSituacao.getId())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }
    
    @Test
    public void getNivelSituacao() throws Exception {
        // Initialize the database
        nivelSituacaoRepository.save(nivelSituacao);

        // Get the nivelSituacao
        restNivelSituacaoMockMvc.perform(get("/api/nivel-situacaos/{id}", nivelSituacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nivelSituacao.getId()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }

    @Test
    public void getNonExistingNivelSituacao() throws Exception {
        // Get the nivelSituacao
        restNivelSituacaoMockMvc.perform(get("/api/nivel-situacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateNivelSituacao() throws Exception {
        // Initialize the database
        nivelSituacaoRepository.save(nivelSituacao);

        int databaseSizeBeforeUpdate = nivelSituacaoRepository.findAll().size();

        // Update the nivelSituacao
        NivelSituacao updatedNivelSituacao = nivelSituacaoRepository.findById(nivelSituacao.getId()).get();
        updatedNivelSituacao
            .descricao(UPDATED_DESCRICAO);

        restNivelSituacaoMockMvc.perform(put("/api/nivel-situacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNivelSituacao)))
            .andExpect(status().isOk());

        // Validate the NivelSituacao in the database
        List<NivelSituacao> nivelSituacaoList = nivelSituacaoRepository.findAll();
        assertThat(nivelSituacaoList).hasSize(databaseSizeBeforeUpdate);
        NivelSituacao testNivelSituacao = nivelSituacaoList.get(nivelSituacaoList.size() - 1);
        assertThat(testNivelSituacao.getDescricao()).isEqualTo(UPDATED_DESCRICAO);

        // Validate the NivelSituacao in Elasticsearch
        verify(mockNivelSituacaoSearchRepository, times(1)).save(testNivelSituacao);
    }

    @Test
    public void updateNonExistingNivelSituacao() throws Exception {
        int databaseSizeBeforeUpdate = nivelSituacaoRepository.findAll().size();

        // Create the NivelSituacao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNivelSituacaoMockMvc.perform(put("/api/nivel-situacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nivelSituacao)))
            .andExpect(status().isBadRequest());

        // Validate the NivelSituacao in the database
        List<NivelSituacao> nivelSituacaoList = nivelSituacaoRepository.findAll();
        assertThat(nivelSituacaoList).hasSize(databaseSizeBeforeUpdate);

        // Validate the NivelSituacao in Elasticsearch
        verify(mockNivelSituacaoSearchRepository, times(0)).save(nivelSituacao);
    }

    @Test
    public void deleteNivelSituacao() throws Exception {
        // Initialize the database
        nivelSituacaoRepository.save(nivelSituacao);

        int databaseSizeBeforeDelete = nivelSituacaoRepository.findAll().size();

        // Delete the nivelSituacao
        restNivelSituacaoMockMvc.perform(delete("/api/nivel-situacaos/{id}", nivelSituacao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NivelSituacao> nivelSituacaoList = nivelSituacaoRepository.findAll();
        assertThat(nivelSituacaoList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the NivelSituacao in Elasticsearch
        verify(mockNivelSituacaoSearchRepository, times(1)).deleteById(nivelSituacao.getId());
    }

    @Test
    public void searchNivelSituacao() throws Exception {
        // Initialize the database
        nivelSituacaoRepository.save(nivelSituacao);
        when(mockNivelSituacaoSearchRepository.search(queryStringQuery("id:" + nivelSituacao.getId())))
            .thenReturn(Collections.singletonList(nivelSituacao));
        // Search the nivelSituacao
        restNivelSituacaoMockMvc.perform(get("/api/_search/nivel-situacaos?query=id:" + nivelSituacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nivelSituacao.getId())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }
}
