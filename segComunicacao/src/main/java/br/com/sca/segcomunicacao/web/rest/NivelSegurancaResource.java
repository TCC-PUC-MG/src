package br.com.sca.segcomunicacao.web.rest;

import br.com.sca.segcomunicacao.domain.NivelSeguranca;
import br.com.sca.segcomunicacao.repository.NivelSegurancaRepository;
import br.com.sca.segcomunicacao.repository.search.NivelSegurancaSearchRepository;
import br.com.sca.segcomunicacao.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link br.com.sca.segcomunicacao.domain.NivelSeguranca}.
 */
@RestController
@RequestMapping("/api")
public class NivelSegurancaResource {

    private final Logger log = LoggerFactory.getLogger(NivelSegurancaResource.class);

    private static final String ENTITY_NAME = "segComunicacaoNivelSeguranca";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NivelSegurancaRepository nivelSegurancaRepository;

    private final NivelSegurancaSearchRepository nivelSegurancaSearchRepository;

    public NivelSegurancaResource(NivelSegurancaRepository nivelSegurancaRepository, NivelSegurancaSearchRepository nivelSegurancaSearchRepository) {
        this.nivelSegurancaRepository = nivelSegurancaRepository;
        this.nivelSegurancaSearchRepository = nivelSegurancaSearchRepository;
    }

    /**
     * {@code POST  /nivel-segurancas} : Create a new nivelSeguranca.
     *
     * @param nivelSeguranca the nivelSeguranca to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nivelSeguranca, or with status {@code 400 (Bad Request)} if the nivelSeguranca has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nivel-segurancas")
    public ResponseEntity<NivelSeguranca> createNivelSeguranca(@RequestBody NivelSeguranca nivelSeguranca) throws URISyntaxException {
        log.debug("REST request to save NivelSeguranca : {}", nivelSeguranca);
        if (nivelSeguranca.getId() != null) {
            throw new BadRequestAlertException("A new nivelSeguranca cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NivelSeguranca result = nivelSegurancaRepository.save(nivelSeguranca);
        nivelSegurancaSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/nivel-segurancas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nivel-segurancas} : Updates an existing nivelSeguranca.
     *
     * @param nivelSeguranca the nivelSeguranca to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nivelSeguranca,
     * or with status {@code 400 (Bad Request)} if the nivelSeguranca is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nivelSeguranca couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nivel-segurancas")
    public ResponseEntity<NivelSeguranca> updateNivelSeguranca(@RequestBody NivelSeguranca nivelSeguranca) throws URISyntaxException {
        log.debug("REST request to update NivelSeguranca : {}", nivelSeguranca);
        if (nivelSeguranca.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NivelSeguranca result = nivelSegurancaRepository.save(nivelSeguranca);
        nivelSegurancaSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, nivelSeguranca.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /nivel-segurancas} : get all the nivelSegurancas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nivelSegurancas in body.
     */
    @GetMapping("/nivel-segurancas")
    public List<NivelSeguranca> getAllNivelSegurancas() {
        log.debug("REST request to get all NivelSegurancas");
        return nivelSegurancaRepository.findAll();
    }

    /**
     * {@code GET  /nivel-segurancas/:id} : get the "id" nivelSeguranca.
     *
     * @param id the id of the nivelSeguranca to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nivelSeguranca, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nivel-segurancas/{id}")
    public ResponseEntity<NivelSeguranca> getNivelSeguranca(@PathVariable String id) {
        log.debug("REST request to get NivelSeguranca : {}", id);
        Optional<NivelSeguranca> nivelSeguranca = nivelSegurancaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(nivelSeguranca);
    }

    /**
     * {@code DELETE  /nivel-segurancas/:id} : delete the "id" nivelSeguranca.
     *
     * @param id the id of the nivelSeguranca to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nivel-segurancas/{id}")
    public ResponseEntity<Void> deleteNivelSeguranca(@PathVariable String id) {
        log.debug("REST request to delete NivelSeguranca : {}", id);
        nivelSegurancaRepository.deleteById(id);
        nivelSegurancaSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/nivel-segurancas?query=:query} : search for the nivelSeguranca corresponding
     * to the query.
     *
     * @param query the query of the nivelSeguranca search.
     * @return the result of the search.
     */
    @GetMapping("/_search/nivel-segurancas")
    public List<NivelSeguranca> searchNivelSegurancas(@RequestParam String query) {
        log.debug("REST request to search NivelSegurancas for query {}", query);
        return StreamSupport
            .stream(nivelSegurancaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
