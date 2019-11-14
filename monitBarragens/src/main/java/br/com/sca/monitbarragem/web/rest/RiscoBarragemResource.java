package br.com.sca.monitbarragem.web.rest;

import br.com.sca.monitbarragem.domain.RiscoBarragem;
import br.com.sca.monitbarragem.repository.RiscoBarragemRepository;
import br.com.sca.monitbarragem.repository.search.RiscoBarragemSearchRepository;
import br.com.sca.monitbarragem.web.rest.errors.BadRequestAlertException;

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
 * REST controller for managing {@link br.com.sca.monitbarragem.domain.RiscoBarragem}.
 */
@RestController
@RequestMapping("/api")
public class RiscoBarragemResource {

    private final Logger log = LoggerFactory.getLogger(RiscoBarragemResource.class);

    private static final String ENTITY_NAME = "monitBarragensRiscoBarragem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RiscoBarragemRepository riscoBarragemRepository;

    private final RiscoBarragemSearchRepository riscoBarragemSearchRepository;

    public RiscoBarragemResource(RiscoBarragemRepository riscoBarragemRepository, RiscoBarragemSearchRepository riscoBarragemSearchRepository) {
        this.riscoBarragemRepository = riscoBarragemRepository;
        this.riscoBarragemSearchRepository = riscoBarragemSearchRepository;
    }

    /**
     * {@code POST  /risco-barragems} : Create a new riscoBarragem.
     *
     * @param riscoBarragem the riscoBarragem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new riscoBarragem, or with status {@code 400 (Bad Request)} if the riscoBarragem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/risco-barragems")
    public ResponseEntity<RiscoBarragem> createRiscoBarragem(@RequestBody RiscoBarragem riscoBarragem) throws URISyntaxException {
        log.debug("REST request to save RiscoBarragem : {}", riscoBarragem);
        if (riscoBarragem.getId() != null) {
            throw new BadRequestAlertException("A new riscoBarragem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RiscoBarragem result = riscoBarragemRepository.save(riscoBarragem);
        riscoBarragemSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/risco-barragems/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /risco-barragems} : Updates an existing riscoBarragem.
     *
     * @param riscoBarragem the riscoBarragem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated riscoBarragem,
     * or with status {@code 400 (Bad Request)} if the riscoBarragem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the riscoBarragem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/risco-barragems")
    public ResponseEntity<RiscoBarragem> updateRiscoBarragem(@RequestBody RiscoBarragem riscoBarragem) throws URISyntaxException {
        log.debug("REST request to update RiscoBarragem : {}", riscoBarragem);
        if (riscoBarragem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RiscoBarragem result = riscoBarragemRepository.save(riscoBarragem);
        riscoBarragemSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, riscoBarragem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /risco-barragems} : get all the riscoBarragems.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of riscoBarragems in body.
     */
    @GetMapping("/risco-barragems")
    public List<RiscoBarragem> getAllRiscoBarragems() {
        log.debug("REST request to get all RiscoBarragems");
        return riscoBarragemRepository.findAll();
    }

    /**
     * {@code GET  /risco-barragems/:id} : get the "id" riscoBarragem.
     *
     * @param id the id of the riscoBarragem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the riscoBarragem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/risco-barragems/{id}")
    public ResponseEntity<RiscoBarragem> getRiscoBarragem(@PathVariable String id) {
        log.debug("REST request to get RiscoBarragem : {}", id);
        Optional<RiscoBarragem> riscoBarragem = riscoBarragemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(riscoBarragem);
    }

    /**
     * {@code DELETE  /risco-barragems/:id} : delete the "id" riscoBarragem.
     *
     * @param id the id of the riscoBarragem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/risco-barragems/{id}")
    public ResponseEntity<Void> deleteRiscoBarragem(@PathVariable String id) {
        log.debug("REST request to delete RiscoBarragem : {}", id);
        riscoBarragemRepository.deleteById(id);
        riscoBarragemSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/risco-barragems?query=:query} : search for the riscoBarragem corresponding
     * to the query.
     *
     * @param query the query of the riscoBarragem search.
     * @return the result of the search.
     */
    @GetMapping("/_search/risco-barragems")
    public List<RiscoBarragem> searchRiscoBarragems(@RequestParam String query) {
        log.debug("REST request to search RiscoBarragems for query {}", query);
        return StreamSupport
            .stream(riscoBarragemSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
