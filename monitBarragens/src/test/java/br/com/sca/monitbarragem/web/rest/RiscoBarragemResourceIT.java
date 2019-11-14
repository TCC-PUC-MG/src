package br.com.sca.monitbarragem.web.rest;

import br.com.sca.monitbarragem.MonitBarragensApp;
import br.com.sca.monitbarragem.config.TestSecurityConfiguration;
import br.com.sca.monitbarragem.domain.RiscoBarragem;
import br.com.sca.monitbarragem.repository.RiscoBarragemRepository;
import br.com.sca.monitbarragem.repository.search.RiscoBarragemSearchRepository;
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
 * Integration tests for the {@link RiscoBarragemResource} REST controller.
 */
@SpringBootTest(classes = {MonitBarragensApp.class, TestSecurityConfiguration.class})
public class RiscoBarragemResourceIT {

    private static final String DEFAULT_DESCRICAO_RISCO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO_RISCO = "BBBBBBBBBB";

    private static final Integer DEFAULT_GRAU_DO_RISCO = 1;
    private static final Integer UPDATED_GRAU_DO_RISCO = 2;

    @Autowired
    private RiscoBarragemRepository riscoBarragemRepository;

    /**
     * This repository is mocked in the br.com.sca.monitbarragem.repository.search test package.
     *
     * @see br.com.sca.monitbarragem.repository.search.RiscoBarragemSearchRepositoryMockConfiguration
     */
    @Autowired
    private RiscoBarragemSearchRepository mockRiscoBarragemSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restRiscoBarragemMockMvc;

    private RiscoBarragem riscoBarragem;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RiscoBarragemResource riscoBarragemResource = new RiscoBarragemResource(riscoBarragemRepository, mockRiscoBarragemSearchRepository);
        this.restRiscoBarragemMockMvc = MockMvcBuilders.standaloneSetup(riscoBarragemResource)
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
    public static RiscoBarragem createEntity() {
        RiscoBarragem riscoBarragem = new RiscoBarragem()
            .descricaoRisco(DEFAULT_DESCRICAO_RISCO)
            .grauDoRisco(DEFAULT_GRAU_DO_RISCO);
        return riscoBarragem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RiscoBarragem createUpdatedEntity() {
        RiscoBarragem riscoBarragem = new RiscoBarragem()
            .descricaoRisco(UPDATED_DESCRICAO_RISCO)
            .grauDoRisco(UPDATED_GRAU_DO_RISCO);
        return riscoBarragem;
    }

    @BeforeEach
    public void initTest() {
        riscoBarragemRepository.deleteAll();
        riscoBarragem = createEntity();
    }

    @Test
    public void createRiscoBarragem() throws Exception {
        int databaseSizeBeforeCreate = riscoBarragemRepository.findAll().size();

        // Create the RiscoBarragem
        restRiscoBarragemMockMvc.perform(post("/api/risco-barragems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(riscoBarragem)))
            .andExpect(status().isCreated());

        // Validate the RiscoBarragem in the database
        List<RiscoBarragem> riscoBarragemList = riscoBarragemRepository.findAll();
        assertThat(riscoBarragemList).hasSize(databaseSizeBeforeCreate + 1);
        RiscoBarragem testRiscoBarragem = riscoBarragemList.get(riscoBarragemList.size() - 1);
        assertThat(testRiscoBarragem.getDescricaoRisco()).isEqualTo(DEFAULT_DESCRICAO_RISCO);
        assertThat(testRiscoBarragem.getGrauDoRisco()).isEqualTo(DEFAULT_GRAU_DO_RISCO);

        // Validate the RiscoBarragem in Elasticsearch
        verify(mockRiscoBarragemSearchRepository, times(1)).save(testRiscoBarragem);
    }

    @Test
    public void createRiscoBarragemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = riscoBarragemRepository.findAll().size();

        // Create the RiscoBarragem with an existing ID
        riscoBarragem.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restRiscoBarragemMockMvc.perform(post("/api/risco-barragems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(riscoBarragem)))
            .andExpect(status().isBadRequest());

        // Validate the RiscoBarragem in the database
        List<RiscoBarragem> riscoBarragemList = riscoBarragemRepository.findAll();
        assertThat(riscoBarragemList).hasSize(databaseSizeBeforeCreate);

        // Validate the RiscoBarragem in Elasticsearch
        verify(mockRiscoBarragemSearchRepository, times(0)).save(riscoBarragem);
    }


    @Test
    public void getAllRiscoBarragems() throws Exception {
        // Initialize the database
        riscoBarragemRepository.save(riscoBarragem);

        // Get all the riscoBarragemList
        restRiscoBarragemMockMvc.perform(get("/api/risco-barragems?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(riscoBarragem.getId())))
            .andExpect(jsonPath("$.[*].descricaoRisco").value(hasItem(DEFAULT_DESCRICAO_RISCO)))
            .andExpect(jsonPath("$.[*].grauDoRisco").value(hasItem(DEFAULT_GRAU_DO_RISCO)));
    }
    
    @Test
    public void getRiscoBarragem() throws Exception {
        // Initialize the database
        riscoBarragemRepository.save(riscoBarragem);

        // Get the riscoBarragem
        restRiscoBarragemMockMvc.perform(get("/api/risco-barragems/{id}", riscoBarragem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(riscoBarragem.getId()))
            .andExpect(jsonPath("$.descricaoRisco").value(DEFAULT_DESCRICAO_RISCO))
            .andExpect(jsonPath("$.grauDoRisco").value(DEFAULT_GRAU_DO_RISCO));
    }

    @Test
    public void getNonExistingRiscoBarragem() throws Exception {
        // Get the riscoBarragem
        restRiscoBarragemMockMvc.perform(get("/api/risco-barragems/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateRiscoBarragem() throws Exception {
        // Initialize the database
        riscoBarragemRepository.save(riscoBarragem);

        int databaseSizeBeforeUpdate = riscoBarragemRepository.findAll().size();

        // Update the riscoBarragem
        RiscoBarragem updatedRiscoBarragem = riscoBarragemRepository.findById(riscoBarragem.getId()).get();
        updatedRiscoBarragem
            .descricaoRisco(UPDATED_DESCRICAO_RISCO)
            .grauDoRisco(UPDATED_GRAU_DO_RISCO);

        restRiscoBarragemMockMvc.perform(put("/api/risco-barragems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRiscoBarragem)))
            .andExpect(status().isOk());

        // Validate the RiscoBarragem in the database
        List<RiscoBarragem> riscoBarragemList = riscoBarragemRepository.findAll();
        assertThat(riscoBarragemList).hasSize(databaseSizeBeforeUpdate);
        RiscoBarragem testRiscoBarragem = riscoBarragemList.get(riscoBarragemList.size() - 1);
        assertThat(testRiscoBarragem.getDescricaoRisco()).isEqualTo(UPDATED_DESCRICAO_RISCO);
        assertThat(testRiscoBarragem.getGrauDoRisco()).isEqualTo(UPDATED_GRAU_DO_RISCO);

        // Validate the RiscoBarragem in Elasticsearch
        verify(mockRiscoBarragemSearchRepository, times(1)).save(testRiscoBarragem);
    }

    @Test
    public void updateNonExistingRiscoBarragem() throws Exception {
        int databaseSizeBeforeUpdate = riscoBarragemRepository.findAll().size();

        // Create the RiscoBarragem

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRiscoBarragemMockMvc.perform(put("/api/risco-barragems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(riscoBarragem)))
            .andExpect(status().isBadRequest());

        // Validate the RiscoBarragem in the database
        List<RiscoBarragem> riscoBarragemList = riscoBarragemRepository.findAll();
        assertThat(riscoBarragemList).hasSize(databaseSizeBeforeUpdate);

        // Validate the RiscoBarragem in Elasticsearch
        verify(mockRiscoBarragemSearchRepository, times(0)).save(riscoBarragem);
    }

    @Test
    public void deleteRiscoBarragem() throws Exception {
        // Initialize the database
        riscoBarragemRepository.save(riscoBarragem);

        int databaseSizeBeforeDelete = riscoBarragemRepository.findAll().size();

        // Delete the riscoBarragem
        restRiscoBarragemMockMvc.perform(delete("/api/risco-barragems/{id}", riscoBarragem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RiscoBarragem> riscoBarragemList = riscoBarragemRepository.findAll();
        assertThat(riscoBarragemList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the RiscoBarragem in Elasticsearch
        verify(mockRiscoBarragemSearchRepository, times(1)).deleteById(riscoBarragem.getId());
    }

    @Test
    public void searchRiscoBarragem() throws Exception {
        // Initialize the database
        riscoBarragemRepository.save(riscoBarragem);
        when(mockRiscoBarragemSearchRepository.search(queryStringQuery("id:" + riscoBarragem.getId())))
            .thenReturn(Collections.singletonList(riscoBarragem));
        // Search the riscoBarragem
        restRiscoBarragemMockMvc.perform(get("/api/_search/risco-barragems?query=id:" + riscoBarragem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(riscoBarragem.getId())))
            .andExpect(jsonPath("$.[*].descricaoRisco").value(hasItem(DEFAULT_DESCRICAO_RISCO)))
            .andExpect(jsonPath("$.[*].grauDoRisco").value(hasItem(DEFAULT_GRAU_DO_RISCO)));
    }
}
