package br.com.sca.gateway.web.rest;

import br.com.sca.gateway.domain.Localidade;
import br.com.sca.gateway.repository.LocalidadeRepository;
import br.com.sca.gateway.repository.search.LocalidadeSearchRepository;
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
 * REST controller for managing {@link br.com.sca.gateway.domain.Localidade}.
 */
@RestController
@RequestMapping("/api")
public class LocalidadeResource {

    private final Logger log = LoggerFactory.getLogger(LocalidadeResource.class);

    private static final String ENTITY_NAME = "localidade";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LocalidadeRepository localidadeRepository;

    private final LocalidadeSearchRepository localidadeSearchRepository;

    public LocalidadeResource(LocalidadeRepository localidadeRepository, LocalidadeSearchRepository localidadeSearchRepository) {
        this.localidadeRepository = localidadeRepository;
        this.localidadeSearchRepository = localidadeSearchRepository;
    }

    /**
     * {@code POST  /localidades} : Create a new localidade.
     *
     * @param localidade the localidade to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new localidade, or with status {@code 400 (Bad Request)} if the localidade has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/localidades")
    public ResponseEntity<Localidade> createLocalidade(@RequestBody Localidade localidade) throws URISyntaxException {
        log.debug("REST request to save Localidade : {}", localidade);
        if (localidade.getId() != null) {
            throw new BadRequestAlertException("A new localidade cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Localidade result = localidadeRepository.save(localidade);
        localidadeSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/localidades/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /localidades} : Updates an existing localidade.
     *
     * @param localidade the localidade to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated localidade,
     * or with status {@code 400 (Bad Request)} if the localidade is not valid,
     * or with status {@code 500 (Internal Server Error)} if the localidade couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/localidades")
    public ResponseEntity<Localidade> updateLocalidade(@RequestBody Localidade localidade) throws URISyntaxException {
        log.debug("REST request to update Localidade : {}", localidade);
        if (localidade.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Localidade result = localidadeRepository.save(localidade);
        localidadeSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, localidade.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /localidades} : get all the localidades.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localidades in body.
     */
    @GetMapping("/localidades")
    public List<Localidade> getAllLocalidades() {
        log.debug("REST request to get all Localidades");
        return localidadeRepository.findAll();
    }

    /**
     * {@code GET  /localidades/:id} : get the "id" localidade.
     *
     * @param id the id of the localidade to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the localidade, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/localidades/{id}")
    public ResponseEntity<Localidade> getLocalidade(@PathVariable String id) {
        log.debug("REST request to get Localidade : {}", id);
        Optional<Localidade> localidade = localidadeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(localidade);
    }

    /**
     * {@code DELETE  /localidades/:id} : delete the "id" localidade.
     *
     * @param id the id of the localidade to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/localidades/{id}")
    public ResponseEntity<Void> deleteLocalidade(@PathVariable String id) {
        log.debug("REST request to delete Localidade : {}", id);
        localidadeRepository.deleteById(id);
        localidadeSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/localidades?query=:query} : search for the localidade corresponding
     * to the query.
     *
     * @param query the query of the localidade search.
     * @return the result of the search.
     */
    @GetMapping("/_search/localidades")
    public List<Localidade> searchLocalidades(@RequestParam String query) {
        log.debug("REST request to search Localidades for query {}", query);
        return StreamSupport
            .stream(localidadeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
