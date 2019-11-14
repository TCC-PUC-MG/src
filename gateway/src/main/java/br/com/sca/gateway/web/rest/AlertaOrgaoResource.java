package br.com.sca.gateway.web.rest;

import br.com.sca.gateway.domain.AlertaOrgao;
import br.com.sca.gateway.repository.AlertaOrgaoRepository;
import br.com.sca.gateway.repository.search.AlertaOrgaoSearchRepository;
import br.com.sca.gateway.web.rest.errors.BadRequestAlertException;

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
 * REST controller for managing {@link br.com.sca.gateway.domain.AlertaOrgao}.
 */
@RestController
@RequestMapping("/api")
public class AlertaOrgaoResource {

    private final Logger log = LoggerFactory.getLogger(AlertaOrgaoResource.class);

    private static final String ENTITY_NAME = "alertaOrgao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AlertaOrgaoRepository alertaOrgaoRepository;

    private final AlertaOrgaoSearchRepository alertaOrgaoSearchRepository;

    public AlertaOrgaoResource(AlertaOrgaoRepository alertaOrgaoRepository, AlertaOrgaoSearchRepository alertaOrgaoSearchRepository) {
        this.alertaOrgaoRepository = alertaOrgaoRepository;
        this.alertaOrgaoSearchRepository = alertaOrgaoSearchRepository;
    }

    /**
     * {@code POST  /alerta-orgaos} : Create a new alertaOrgao.
     *
     * @param alertaOrgao the alertaOrgao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new alertaOrgao, or with status {@code 400 (Bad Request)} if the alertaOrgao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/alerta-orgaos")
    public ResponseEntity<AlertaOrgao> createAlertaOrgao(@RequestBody AlertaOrgao alertaOrgao) throws URISyntaxException {
        log.debug("REST request to save AlertaOrgao : {}", alertaOrgao);
        if (alertaOrgao.getId() != null) {
            throw new BadRequestAlertException("A new alertaOrgao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AlertaOrgao result = alertaOrgaoRepository.save(alertaOrgao);
        alertaOrgaoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/alerta-orgaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /alerta-orgaos} : Updates an existing alertaOrgao.
     *
     * @param alertaOrgao the alertaOrgao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alertaOrgao,
     * or with status {@code 400 (Bad Request)} if the alertaOrgao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the alertaOrgao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/alerta-orgaos")
    public ResponseEntity<AlertaOrgao> updateAlertaOrgao(@RequestBody AlertaOrgao alertaOrgao) throws URISyntaxException {
        log.debug("REST request to update AlertaOrgao : {}", alertaOrgao);
        if (alertaOrgao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AlertaOrgao result = alertaOrgaoRepository.save(alertaOrgao);
        alertaOrgaoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, alertaOrgao.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /alerta-orgaos} : get all the alertaOrgaos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of alertaOrgaos in body.
     */
    @GetMapping("/alerta-orgaos")
    public List<AlertaOrgao> getAllAlertaOrgaos() {
        log.debug("REST request to get all AlertaOrgaos");
        return alertaOrgaoRepository.findAll();
    }

    /**
     * {@code GET  /alerta-orgaos/:id} : get the "id" alertaOrgao.
     *
     * @param id the id of the alertaOrgao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the alertaOrgao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/alerta-orgaos/{id}")
    public ResponseEntity<AlertaOrgao> getAlertaOrgao(@PathVariable String id) {
        log.debug("REST request to get AlertaOrgao : {}", id);
        Optional<AlertaOrgao> alertaOrgao = alertaOrgaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(alertaOrgao);
    }

    /**
     * {@code DELETE  /alerta-orgaos/:id} : delete the "id" alertaOrgao.
     *
     * @param id the id of the alertaOrgao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/alerta-orgaos/{id}")
    public ResponseEntity<Void> deleteAlertaOrgao(@PathVariable String id) {
        log.debug("REST request to delete AlertaOrgao : {}", id);
        alertaOrgaoRepository.deleteById(id);
        alertaOrgaoSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/alerta-orgaos?query=:query} : search for the alertaOrgao corresponding
     * to the query.
     *
     * @param query the query of the alertaOrgao search.
     * @return the result of the search.
     */
    @GetMapping("/_search/alerta-orgaos")
    public List<AlertaOrgao> searchAlertaOrgaos(@RequestParam String query) {
        log.debug("REST request to search AlertaOrgaos for query {}", query);
        return StreamSupport
            .stream(alertaOrgaoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
