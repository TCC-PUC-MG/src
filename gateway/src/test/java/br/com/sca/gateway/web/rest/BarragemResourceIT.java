package br.com.sca.gateway.web.rest;

import br.com.sca.gateway.GatewayApp;
import br.com.sca.gateway.config.TestSecurityConfiguration;
import br.com.sca.gateway.domain.Barragem;
import br.com.sca.gateway.repository.BarragemRepository;
import br.com.sca.gateway.repository.search.BarragemSearchRepository;
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
 * Integration tests for the {@link BarragemResource} REST controller.
 */
@SpringBootTest(classes = {GatewayApp.class, TestSecurityConfiguration.class})
public class BarragemResourceIT {

    @Autowired
    private BarragemRepository barragemRepository;

    /**
     * This repository is mocked in the br.com.sca.gateway.repository.search test package.
     *
     * @see br.com.sca.gateway.repository.search.BarragemSearchRepositoryMockConfiguration
     */
    @Autowired
    private BarragemSearchRepository mockBarragemSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restBarragemMockMvc;

    private Barragem barragem;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BarragemResource barragemResource = new BarragemResource(barragemRepository, mockBarragemSearchRepository);
        this.restBarragemMockMvc = MockMvcBuilders.standaloneSetup(barragemResource)
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
    public static Barragem createEntity() {
        Barragem barragem = new Barragem();
        return barragem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Barragem createUpdatedEntity() {
        Barragem barragem = new Barragem();
        return barragem;
    }

    @BeforeEach
    public void initTest() {
        barragemRepository.deleteAll();
        barragem = createEntity();
    }

    @Test
    public void createBarragem() throws Exception {
        int databaseSizeBeforeCreate = barragemRepository.findAll().size();

        // Create the Barragem
        restBarragemMockMvc.perform(post("/api/barragems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barragem)))
            .andExpect(status().isCreated());

        // Validate the Barragem in the database
        List<Barragem> barragemList = barragemRepository.findAll();
        assertThat(barragemList).hasSize(databaseSizeBeforeCreate + 1);
        Barragem testBarragem = barragemList.get(barragemList.size() - 1);

        // Validate the Barragem in Elasticsearch
        verify(mockBarragemSearchRepository, times(1)).save(testBarragem);
    }

    @Test
    public void createBarragemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = barragemRepository.findAll().size();

        // Create the Barragem with an existing ID
        barragem.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restBarragemMockMvc.perform(post("/api/barragems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barragem)))
            .andExpect(status().isBadRequest());

        // Validate the Barragem in the database
        List<Barragem> barragemList = barragemRepository.findAll();
        assertThat(barragemList).hasSize(databaseSizeBeforeCreate);

        // Validate the Barragem in Elasticsearch
        verify(mockBarragemSearchRepository, times(0)).save(barragem);
    }


    @Test
    public void getAllBarragems() throws Exception {
        // Initialize the database
        barragemRepository.save(barragem);

        // Get all the barragemList
        restBarragemMockMvc.perform(get("/api/barragems?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(barragem.getId())));
    }
    
    @Test
    public void getBarragem() throws Exception {
        // Initialize the database
        barragemRepository.save(barragem);

        // Get the barragem
        restBarragemMockMvc.perform(get("/api/barragems/{id}", barragem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(barragem.getId()));
    }

    @Test
    public void getNonExistingBarragem() throws Exception {
        // Get the barragem
        restBarragemMockMvc.perform(get("/api/barragems/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateBarragem() throws Exception {
        // Initialize the database
        barragemRepository.save(barragem);

        int databaseSizeBeforeUpdate = barragemRepository.findAll().size();

        // Update the barragem
        Barragem updatedBarragem = barragemRepository.findById(barragem.getId()).get();

        restBarragemMockMvc.perform(put("/api/barragems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBarragem)))
            .andExpect(status().isOk());

        // Validate the Barragem in the database
        List<Barragem> barragemList = barragemRepository.findAll();
        assertThat(barragemList).hasSize(databaseSizeBeforeUpdate);
        Barragem testBarragem = barragemList.get(barragemList.size() - 1);

        // Validate the Barragem in Elasticsearch
        verify(mockBarragemSearchRepository, times(1)).save(testBarragem);
    }

    @Test
    public void updateNonExistingBarragem() throws Exception {
        int databaseSizeBeforeUpdate = barragemRepository.findAll().size();

        // Create the Barragem

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBarragemMockMvc.perform(put("/api/barragems")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barragem)))
            .andExpect(status().isBadRequest());

        // Validate the Barragem in the database
        List<Barragem> barragemList = barragemRepository.findAll();
        assertThat(barragemList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Barragem in Elasticsearch
        verify(mockBarragemSearchRepository, times(0)).save(barragem);
    }

    @Test
    public void deleteBarragem() throws Exception {
        // Initialize the database
        barragemRepository.save(barragem);

        int databaseSizeBeforeDelete = barragemRepository.findAll().size();

        // Delete the barragem
        restBarragemMockMvc.perform(delete("/api/barragems/{id}", barragem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Barragem> barragemList = barragemRepository.findAll();
        assertThat(barragemList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Barragem in Elasticsearch
        verify(mockBarragemSearchRepository, times(1)).deleteById(barragem.getId());
    }

    @Test
    public void searchBarragem() throws Exception {
        // Initialize the database
        barragemRepository.save(barragem);
        when(mockBarragemSearchRepository.search(queryStringQuery("id:" + barragem.getId())))
            .thenReturn(Collections.singletonList(barragem));
        // Search the barragem
        restBarragemMockMvc.perform(get("/api/_search/barragems?query=id:" + barragem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(barragem.getId())));
    }
}
