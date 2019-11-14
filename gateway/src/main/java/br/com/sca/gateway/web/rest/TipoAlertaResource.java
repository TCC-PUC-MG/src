package br.com.sca.gateway.web.rest;

import br.com.sca.gateway.domain.TipoAlerta;
import br.com.sca.gateway.repository.TipoAlertaRepository;
import br.com.sca.gateway.repository.search.TipoAlertaSearchRepository;
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
 * REST controller for managing {@link br.com.sca.gateway.domain.TipoAlerta}.
 */
@RestController
@RequestMapping("/api")
public class TipoAlertaResource {

    private final Logger log = LoggerFactory.getLogger(TipoAlertaResource.class);

    private static final String ENTITY_NAME = "tipoAlerta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoAlertaRepository tipoAlertaRepository;

    private final TipoAlertaSearchRepository tipoAlertaSearchRepository;

    public TipoAlertaResource(TipoAlertaRepository tipoAlertaRepository, TipoAlertaSearchRepository tipoAlertaSearchRepository) {
        this.tipoAlertaRepository = tipoAlertaRepository;
        this.tipoAlertaSearchRepository = tipoAlertaSearchRepository;
    }

    /**
     * {@code POST  /tipo-alertas} : Create a new tipoAlerta.
     *
     * @param tipoAlerta the tipoAlerta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoAlerta, or with status {@code 400 (Bad Request)} if the tipoAlerta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-alertas")
    public ResponseEntity<TipoAlerta> createTipoAlerta(@RequestBody TipoAlerta tipoAlerta) throws URISyntaxException {
        log.debug("REST request to save TipoAlerta : {}", tipoAlerta);
        if (tipoAlerta.getId() != null) {
            throw new BadRequestAlertException("A new tipoAlerta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoAlerta result = tipoAlertaRepository.save(tipoAlerta);
        tipoAlertaSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/tipo-alertas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-alertas} : Updates an existing tipoAlerta.
     *
     * @param tipoAlerta the tipoAlerta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoAlerta,
     * or with status {@code 400 (Bad Request)} if the tipoAlerta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoAlerta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-alertas")
    public ResponseEntity<TipoAlerta> updateTipoAlerta(@RequestBody TipoAlerta tipoAlerta) throws URISyntaxException {
        log.debug("REST request to update TipoAlerta : {}", tipoAlerta);
        if (tipoAlerta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoAlerta result = tipoAlertaRepository.save(tipoAlerta);
        tipoAlertaSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoAlerta.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-alertas} : get all the tipoAlertas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoAlertas in body.
     */
    @GetMapping("/tipo-alertas")
    public List<TipoAlerta> getAllTipoAlertas() {
        log.debug("REST request to get all TipoAlertas");
        return tipoAlertaRepository.findAll();
    }

    /**
     * {@code GET  /tipo-alertas/:id} : get the "id" tipoAlerta.
     *
     * @param id the id of the tipoAlerta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoAlerta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-alertas/{id}")
    public ResponseEntity<TipoAlerta> getTipoAlerta(@PathVariable String id) {
        log.debug("REST request to get TipoAlerta : {}", id);
        Optional<TipoAlerta> tipoAlerta = tipoAlertaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoAlerta);
    }

    /**
     * {@code DELETE  /tipo-alertas/:id} : delete the "id" tipoAlerta.
     *
     * @param id the id of the tipoAlerta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-alertas/{id}")
    public ResponseEntity<Void> deleteTipoAlerta(@PathVariable String id) {
        log.debug("REST request to delete TipoAlerta : {}", id);
        tipoAlertaRepository.deleteById(id);
        tipoAlertaSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/tipo-alertas?query=:query} : search for the tipoAlerta corresponding
     * to the query.
     *
     * @param query the query of the tipoAlerta search.
     * @return the result of the search.
     */
    @GetMapping("/_search/tipo-alertas")
    public List<TipoAlerta> searchTipoAlertas(@RequestParam String query) {
        log.debug("REST request to search TipoAlertas for query {}", query);
        return StreamSupport
            .stream(tipoAlertaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
