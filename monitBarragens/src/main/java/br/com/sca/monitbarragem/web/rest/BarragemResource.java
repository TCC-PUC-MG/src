package br.com.sca.monitbarragem.web.rest;

import br.com.sca.monitbarragem.domain.Barragem;
import br.com.sca.monitbarragem.repository.BarragemRepository;
import br.com.sca.monitbarragem.repository.search.BarragemSearchRepository;
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
 * REST controller for managing {@link br.com.sca.monitbarragem.domain.Barragem}.
 */
@RestController
@RequestMapping("/api")
public class BarragemResource {

    private final Logger log = LoggerFactory.getLogger(BarragemResource.class);

    private static final String ENTITY_NAME = "monitBarragensBarragem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BarragemRepository barragemRepository;

    private final BarragemSearchRepository barragemSearchRepository;

    public BarragemResource(BarragemRepository barragemRepository, BarragemSearchRepository barragemSearchRepository) {
        this.barragemRepository = barragemRepository;
        this.barragemSearchRepository = barragemSearchRepository;
    }

    /**
     * {@code POST  /barragems} : Create a new barragem.
     *
     * @param barragem the barragem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new barragem, or with status {@code 400 (Bad Request)} if the barragem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/barragems")
    public ResponseEntity<Barragem> createBarragem(@RequestBody Barragem barragem) throws URISyntaxException {
        log.debug("REST request to save Barragem : {}", barragem);
        if (barragem.getId() != null) {
            throw new BadRequestAlertException("A new barragem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Barragem result = barragemRepository.save(barragem);
        barragemSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/barragems/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /barragems} : Updates an existing barragem.
     *
     * @param barragem the barragem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated barragem,
     * or with status {@code 400 (Bad Request)} if the barragem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the barragem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/barragems")
    public ResponseEntity<Barragem> updateBarragem(@RequestBody Barragem barragem) throws URISyntaxException {
        log.debug("REST request to update Barragem : {}", barragem);
        if (barragem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Barragem result = barragemRepository.save(barragem);
        barragemSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, barragem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /barragems} : get all the barragems.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of barragems in body.
     */
    @GetMapping("/barragems")
    public List<Barragem> getAllBarragems() {
        log.debug("REST request to get all Barragems");
        return barragemRepository.findAll();
    }

    /**
     * {@code GET  /barragems/:id} : get the "id" barragem.
     *
     * @param id the id of the barragem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the barragem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/barragems/{id}")
    public ResponseEntity<Barragem> getBarragem(@PathVariable String id) {
        log.debug("REST request to get Barragem : {}", id);
        Optional<Barragem> barragem = barragemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(barragem);
    }

    /**
     * {@code DELETE  /barragems/:id} : delete the "id" barragem.
     *
     * @param id the id of the barragem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/barragems/{id}")
    public ResponseEntity<Void> deleteBarragem(@PathVariable String id) {
        log.debug("REST request to delete Barragem : {}", id);
        barragemRepository.deleteById(id);
        barragemSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/barragems?query=:query} : search for the barragem corresponding
     * to the query.
     *
     * @param query the query of the barragem search.
     * @return the result of the search.
     */
    @GetMapping("/_search/barragems")
    public List<Barragem> searchBarragems(@RequestParam String query) {
        log.debug("REST request to search Barragems for query {}", query);
        return StreamSupport
            .stream(barragemSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
