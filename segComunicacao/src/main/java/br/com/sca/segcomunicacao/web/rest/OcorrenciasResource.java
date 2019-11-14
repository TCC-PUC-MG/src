package br.com.sca.segcomunicacao.web.rest;

import br.com.sca.segcomunicacao.domain.Ocorrencias;
import br.com.sca.segcomunicacao.repository.OcorrenciasRepository;
import br.com.sca.segcomunicacao.repository.search.OcorrenciasSearchRepository;
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
 * REST controller for managing {@link br.com.sca.segcomunicacao.domain.Ocorrencias}.
 */
@RestController
@RequestMapping("/api")
public class OcorrenciasResource {

    private final Logger log = LoggerFactory.getLogger(OcorrenciasResource.class);

    private static final String ENTITY_NAME = "segComunicacaoOcorrencias";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OcorrenciasRepository ocorrenciasRepository;

    private final OcorrenciasSearchRepository ocorrenciasSearchRepository;

    public OcorrenciasResource(OcorrenciasRepository ocorrenciasRepository, OcorrenciasSearchRepository ocorrenciasSearchRepository) {
        this.ocorrenciasRepository = ocorrenciasRepository;
        this.ocorrenciasSearchRepository = ocorrenciasSearchRepository;
    }

    /**
     * {@code POST  /ocorrencias} : Create a new ocorrencias.
     *
     * @param ocorrencias the ocorrencias to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ocorrencias, or with status {@code 400 (Bad Request)} if the ocorrencias has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ocorrencias")
    public ResponseEntity<Ocorrencias> createOcorrencias(@RequestBody Ocorrencias ocorrencias) throws URISyntaxException {
        log.debug("REST request to save Ocorrencias : {}", ocorrencias);
        if (ocorrencias.getId() != null) {
            throw new BadRequestAlertException("A new ocorrencias cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ocorrencias result = ocorrenciasRepository.save(ocorrencias);
        ocorrenciasSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/ocorrencias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ocorrencias} : Updates an existing ocorrencias.
     *
     * @param ocorrencias the ocorrencias to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ocorrencias,
     * or with status {@code 400 (Bad Request)} if the ocorrencias is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ocorrencias couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ocorrencias")
    public ResponseEntity<Ocorrencias> updateOcorrencias(@RequestBody Ocorrencias ocorrencias) throws URISyntaxException {
        log.debug("REST request to update Ocorrencias : {}", ocorrencias);
        if (ocorrencias.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ocorrencias result = ocorrenciasRepository.save(ocorrencias);
        ocorrenciasSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ocorrencias.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ocorrencias} : get all the ocorrencias.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ocorrencias in body.
     */
    @GetMapping("/ocorrencias")
    public List<Ocorrencias> getAllOcorrencias() {
        log.debug("REST request to get all Ocorrencias");
        return ocorrenciasRepository.findAll();
    }

    /**
     * {@code GET  /ocorrencias/:id} : get the "id" ocorrencias.
     *
     * @param id the id of the ocorrencias to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ocorrencias, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ocorrencias/{id}")
    public ResponseEntity<Ocorrencias> getOcorrencias(@PathVariable String id) {
        log.debug("REST request to get Ocorrencias : {}", id);
        Optional<Ocorrencias> ocorrencias = ocorrenciasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ocorrencias);
    }

    /**
     * {@code DELETE  /ocorrencias/:id} : delete the "id" ocorrencias.
     *
     * @param id the id of the ocorrencias to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ocorrencias/{id}")
    public ResponseEntity<Void> deleteOcorrencias(@PathVariable String id) {
        log.debug("REST request to delete Ocorrencias : {}", id);
        ocorrenciasRepository.deleteById(id);
        ocorrenciasSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/ocorrencias?query=:query} : search for the ocorrencias corresponding
     * to the query.
     *
     * @param query the query of the ocorrencias search.
     * @return the result of the search.
     */
    @GetMapping("/_search/ocorrencias")
    public List<Ocorrencias> searchOcorrencias(@RequestParam String query) {
        log.debug("REST request to search Ocorrencias for query {}", query);
        return StreamSupport
            .stream(ocorrenciasSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
