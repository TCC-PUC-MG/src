package br.com.sca.gateway.web.rest;

import br.com.sca.gateway.GatewayApp;
import br.com.sca.gateway.config.TestSecurityConfiguration;
import br.com.sca.gateway.domain.OrgaoGoverno;
import br.com.sca.gateway.repository.OrgaoGovernoRepository;
import br.com.sca.gateway.repository.search.OrgaoGovernoSearchRepository;
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
 * Integration tests for the {@link OrgaoGovernoResource} REST controller.
 */
@SpringBootTest(classes = {GatewayApp.class, TestSecurityConfiguration.class})
public class OrgaoGovernoResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String DEFAULT_PESSOA_CONTATO = "AAAAAAAAAA";
    private static final String UPDATED_PESSOA_CONTATO = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE = "BBBBBBBBBB";

    @Autowired
    private OrgaoGovernoRepository orgaoGovernoRepository;

    /**
     * This repository is mocked in the br.com.sca.gateway.repository.search test package.
     *
     * @see br.com.sca.gateway.repository.search.OrgaoGovernoSearchRepositoryMockConfiguration
     */
    @Autowired
    private OrgaoGovernoSearchRepository mockOrgaoGovernoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restOrgaoGovernoMockMvc;

    private OrgaoGoverno orgaoGoverno;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrgaoGovernoResource orgaoGovernoResource = new OrgaoGovernoResource(orgaoGovernoRepository, mockOrgaoGovernoSearchRepository);
        this.restOrgaoGovernoMockMvc = MockMvcBuilders.standaloneSetup(orgaoGovernoResource)
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
    public static OrgaoGoverno createEntity() {
        OrgaoGoverno orgaoGoverno = new OrgaoGoverno()
            .descricao(DEFAULT_DESCRICAO)
            .pessoaContato(DEFAULT_PESSOA_CONTATO)
            .telefone(DEFAULT_TELEFONE);
        return orgaoGoverno;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrgaoGoverno createUpdatedEntity() {
        OrgaoGoverno orgaoGoverno = new OrgaoGoverno()
            .descricao(UPDATED_DESCRICAO)
            .pessoaContato(UPDATED_PESSOA_CONTATO)
            .telefone(UPDATED_TELEFONE);
        return orgaoGoverno;
    }

    @BeforeEach
    public void initTest() {
        orgaoGovernoRepository.deleteAll();
        orgaoGoverno = createEntity();
    }

    @Test
    public void createOrgaoGoverno() throws Exception {
        int databaseSizeBeforeCreate = orgaoGovernoRepository.findAll().size();

        // Create the OrgaoGoverno
        restOrgaoGovernoMockMvc.perform(post("/api/orgao-governos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orgaoGoverno)))
            .andExpect(status().isCreated());

        // Validate the OrgaoGoverno in the database
        List<OrgaoGoverno> orgaoGovernoList = orgaoGovernoRepository.findAll();
        assertThat(orgaoGovernoList).hasSize(databaseSizeBeforeCreate + 1);
        OrgaoGoverno testOrgaoGoverno = orgaoGovernoList.get(orgaoGovernoList.size() - 1);
        assertThat(testOrgaoGoverno.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testOrgaoGoverno.getPessoaContato()).isEqualTo(DEFAULT_PESSOA_CONTATO);
        assertThat(testOrgaoGoverno.getTelefone()).isEqualTo(DEFAULT_TELEFONE);

        // Validate the OrgaoGoverno in Elasticsearch
        verify(mockOrgaoGovernoSearchRepository, times(1)).save(testOrgaoGoverno);
    }

    @Test
    public void createOrgaoGovernoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orgaoGovernoRepository.findAll().size();

        // Create the OrgaoGoverno with an existing ID
        orgaoGoverno.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrgaoGovernoMockMvc.perform(post("/api/orgao-governos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orgaoGoverno)))
            .andExpect(status().isBadRequest());

        // Validate the OrgaoGoverno in the database
        List<OrgaoGoverno> orgaoGovernoList = orgaoGovernoRepository.findAll();
        assertThat(orgaoGovernoList).hasSize(databaseSizeBeforeCreate);

        // Validate the OrgaoGoverno in Elasticsearch
        verify(mockOrgaoGovernoSearchRepository, times(0)).save(orgaoGoverno);
    }


    @Test
    public void getAllOrgaoGovernos() throws Exception {
        // Initialize the database
        orgaoGovernoRepository.save(orgaoGoverno);

        // Get all the orgaoGovernoList
        restOrgaoGovernoMockMvc.perform(get("/api/orgao-governos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orgaoGoverno.getId())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].pessoaContato").value(hasItem(DEFAULT_PESSOA_CONTATO)))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE)));
    }
    
    @Test
    public void getOrgaoGoverno() throws Exception {
        // Initialize the database
        orgaoGovernoRepository.save(orgaoGoverno);

        // Get the orgaoGoverno
        restOrgaoGovernoMockMvc.perform(get("/api/orgao-governos/{id}", orgaoGoverno.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orgaoGoverno.getId()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.pessoaContato").value(DEFAULT_PESSOA_CONTATO))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE));
    }

    @Test
    public void getNonExistingOrgaoGoverno() throws Exception {
        // Get the orgaoGoverno
        restOrgaoGovernoMockMvc.perform(get("/api/orgao-governos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateOrgaoGoverno() throws Exception {
        // Initialize the database
        orgaoGovernoRepository.save(orgaoGoverno);

        int databaseSizeBeforeUpdate = orgaoGovernoRepository.findAll().size();

        // Update the orgaoGoverno
        OrgaoGoverno updatedOrgaoGoverno = orgaoGovernoRepository.findById(orgaoGoverno.getId()).get();
        updatedOrgaoGoverno
            .descricao(UPDATED_DESCRICAO)
            .pessoaContato(UPDATED_PESSOA_CONTATO)
            .telefone(UPDATED_TELEFONE);

        restOrgaoGovernoMockMvc.perform(put("/api/orgao-governos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrgaoGoverno)))
            .andExpect(status().isOk());

        // Validate the OrgaoGoverno in the database
        List<OrgaoGoverno> orgaoGovernoList = orgaoGovernoRepository.findAll();
        assertThat(orgaoGovernoList).hasSize(databaseSizeBeforeUpdate);
        OrgaoGoverno testOrgaoGoverno = orgaoGovernoList.get(orgaoGovernoList.size() - 1);
        assertThat(testOrgaoGoverno.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testOrgaoGoverno.getPessoaContato()).isEqualTo(UPDATED_PESSOA_CONTATO);
        assertThat(testOrgaoGoverno.getTelefone()).isEqualTo(UPDATED_TELEFONE);

        // Validate the OrgaoGoverno in Elasticsearch
        verify(mockOrgaoGovernoSearchRepository, times(1)).save(testOrgaoGoverno);
    }

    @Test
    public void updateNonExistingOrgaoGoverno() throws Exception {
        int databaseSizeBeforeUpdate = orgaoGovernoRepository.findAll().size();

        // Create the OrgaoGoverno

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrgaoGovernoMockMvc.perform(put("/api/orgao-governos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orgaoGoverno)))
            .andExpect(status().isBadRequest());

        // Validate the OrgaoGoverno in the database
        List<OrgaoGoverno> orgaoGovernoList = orgaoGovernoRepository.findAll();
        assertThat(orgaoGovernoList).hasSize(databaseSizeBeforeUpdate);

        // Validate the OrgaoGoverno in Elasticsearch
        verify(mockOrgaoGovernoSearchRepository, times(0)).save(orgaoGoverno);
    }

    @Test
    public void deleteOrgaoGoverno() throws Exception {
        // Initialize the database
        orgaoGovernoRepository.save(orgaoGoverno);

        int databaseSizeBeforeDelete = orgaoGovernoRepository.findAll().size();

        // Delete the orgaoGoverno
        restOrgaoGovernoMockMvc.perform(delete("/api/orgao-governos/{id}", orgaoGoverno.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OrgaoGoverno> orgaoGovernoList = orgaoGovernoRepository.findAll();
        assertThat(orgaoGovernoList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the OrgaoGoverno in Elasticsearch
        verify(mockOrgaoGovernoSearchRepository, times(1)).deleteById(orgaoGoverno.getId());
    }

    @Test
    public void searchOrgaoGoverno() throws Exception {
        // Initialize the database
        orgaoGovernoRepository.save(orgaoGoverno);
        when(mockOrgaoGovernoSearchRepository.search(queryStringQuery("id:" + orgaoGoverno.getId())))
            .thenReturn(Collections.singletonList(orgaoGoverno));
        // Search the orgaoGoverno
        restOrgaoGovernoMockMvc.perform(get("/api/_search/orgao-governos?query=id:" + orgaoGoverno.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orgaoGoverno.getId())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].pessoaContato").value(hasItem(DEFAULT_PESSOA_CONTATO)))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE)));
    }
}
