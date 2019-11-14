package br.com.sca.gateway.web.rest;

import br.com.sca.gateway.domain.AlertaEnviados;
import br.com.sca.gateway.repository.AlertaEnviadosRepository;
import br.com.sca.gateway.repository.search.AlertaEnviadosSearchRepository;
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
 * REST controller for managing {@link br.com.sca.gateway.domain.AlertaEnviados}.
 */
@RestController
@RequestMapping("/api")
public class AlertaEnviadosResource {

    private final Logger log = LoggerFactory.getLogger(AlertaEnviadosResource.class);

    private static final String ENTITY_NAME = "alertaEnviados";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AlertaEnviadosRepository alertaEnviadosRepository;

    private final AlertaEnviadosSearchRepository alertaEnviadosSearchRepository;

    public AlertaEnviadosResource(AlertaEnviadosRepository alertaEnviadosRepository, AlertaEnviadosSearchRepository alertaEnviadosSearchRepository) {
        this.alertaEnviadosRepository = alertaEnviadosRepository;
        this.alertaEnviadosSearchRepository = alertaEnviadosSearchRepository;
    }

    /**
     * {@code POST  /alerta-enviados} : Create a new alertaEnviados.
     *
     * @param alertaEnviados the alertaEnviados to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new alertaEnviados, or with status {@code 400 (Bad Request)} if the alertaEnviados has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/alerta-enviados")
    public ResponseEntity<AlertaEnviados> createAlertaEnviados(@RequestBody AlertaEnviados alertaEnviados) throws URISyntaxException {
        log.debug("REST request to save AlertaEnviados : {}", alertaEnviados);
        if (alertaEnviados.getId() != null) {
            throw new BadRequestAlertException("A new alertaEnviados cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AlertaEnviados result = alertaEnviadosRepository.save(alertaEnviados);
        alertaEnviadosSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/alerta-enviados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /alerta-enviados} : Updates an existing alertaEnviados.
     *
     * @param alertaEnviados the alertaEnviados to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alertaEnviados,
     * or with status {@code 400 (Bad Request)} if the alertaEnviados is not valid,
     * or with status {@code 500 (Internal Server Error)} if the alertaEnviados couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/alerta-enviados")
    public ResponseEntity<AlertaEnviados> updateAlertaEnviados(@RequestBody AlertaEnviados alertaEnviados) throws URISyntaxException {
        log.debug("REST request to update AlertaEnviados : {}", alertaEnviados);
        if (alertaEnviados.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AlertaEnviados result = alertaEnviadosRepository.save(alertaEnviados);
        alertaEnviadosSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, alertaEnviados.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /alerta-enviados} : get all the alertaEnviados.
     *

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of alertaEnviados in body.
     */
    @GetMapping("/alerta-enviados")
    public List<AlertaEnviados> getAllAlertaEnviados(@RequestParam(required = false) String filter) {
        if ("alertaorgaos-is-null".equals(filter)) {
            log.debug("REST request to get all AlertaEnviadoss where alertaOrgaos is null");
            return StreamSupport
                .stream(alertaEnviadosRepository.findAll().spliterator(), false)
                .filter(alertaEnviados -> alertaEnviados.getAlertaOrgaos() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all AlertaEnviados");
        return alertaEnviadosRepository.findAll();
    }

    /**
     * {@code GET  /alerta-enviados/:id} : get the "id" alertaEnviados.
     *
     * @param id the id of the alertaEnviados to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the alertaEnviados, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/alerta-enviados/{id}")
    public ResponseEntity<AlertaEnviados> getAlertaEnviados(@PathVariable String id) {
        log.debug("REST request to get AlertaEnviados : {}", id);
        Optional<AlertaEnviados> alertaEnviados = alertaEnviadosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(alertaEnviados);
    }

    /**
     * {@code DELETE  /alerta-enviados/:id} : delete the "id" alertaEnviados.
     *
     * @param id the id of the alertaEnviados to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/alerta-enviados/{id}")
    public ResponseEntity<Void> deleteAlertaEnviados(@PathVariable String id) {
        log.debug("REST request to delete AlertaEnviados : {}", id);
        alertaEnviadosRepository.deleteById(id);
        alertaEnviadosSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/alerta-enviados?query=:query} : search for the alertaEnviados corresponding
     * to the query.
     *
     * @param query the query of the alertaEnviados search.
     * @return the result of the search.
     */
    @GetMapping("/_search/alerta-enviados")
    public List<AlertaEnviados> searchAlertaEnviados(@RequestParam String query) {
        log.debug("REST request to search AlertaEnviados for query {}", query);
        return StreamSupport
            .stream(alertaEnviadosSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
