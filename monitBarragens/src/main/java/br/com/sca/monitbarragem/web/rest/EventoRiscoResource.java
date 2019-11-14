package br.com.sca.monitbarragem.web.rest;

import br.com.sca.monitbarragem.domain.EventoRisco;
import br.com.sca.monitbarragem.repository.EventoRiscoRepository;
import br.com.sca.monitbarragem.repository.search.EventoRiscoSearchRepository;
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
 * REST controller for managing {@link br.com.sca.monitbarragem.domain.EventoRisco}.
 */
@RestController
@RequestMapping("/api")
public class EventoRiscoResource {

    private final Logger log = LoggerFactory.getLogger(EventoRiscoResource.class);

    private static final String ENTITY_NAME = "monitBarragensEventoRisco";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EventoRiscoRepository eventoRiscoRepository;

    private final EventoRiscoSearchRepository eventoRiscoSearchRepository;

    public EventoRiscoResource(EventoRiscoRepository eventoRiscoRepository, EventoRiscoSearchRepository eventoRiscoSearchRepository) {
        this.eventoRiscoRepository = eventoRiscoRepository;
        this.eventoRiscoSearchRepository = eventoRiscoSearchRepository;
    }

    /**
     * {@code POST  /evento-riscos} : Create a new eventoRisco.
     *
     * @param eventoRisco the eventoRisco to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new eventoRisco, or with status {@code 400 (Bad Request)} if the eventoRisco has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/evento-riscos")
    public ResponseEntity<EventoRisco> createEventoRisco(@RequestBody EventoRisco eventoRisco) throws URISyntaxException {
        log.debug("REST request to save EventoRisco : {}", eventoRisco);
        if (eventoRisco.getId() != null) {
            throw new BadRequestAlertException("A new eventoRisco cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EventoRisco result = eventoRiscoRepository.save(eventoRisco);
        eventoRiscoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/evento-riscos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /evento-riscos} : Updates an existing eventoRisco.
     *
     * @param eventoRisco the eventoRisco to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated eventoRisco,
     * or with status {@code 400 (Bad Request)} if the eventoRisco is not valid,
     * or with status {@code 500 (Internal Server Error)} if the eventoRisco couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/evento-riscos")
    public ResponseEntity<EventoRisco> updateEventoRisco(@RequestBody EventoRisco eventoRisco) throws URISyntaxException {
        log.debug("REST request to update EventoRisco : {}", eventoRisco);
        if (eventoRisco.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EventoRisco result = eventoRiscoRepository.save(eventoRisco);
        eventoRiscoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, eventoRisco.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /evento-riscos} : get all the eventoRiscos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of eventoRiscos in body.
     */
    @GetMapping("/evento-riscos")
    public List<EventoRisco> getAllEventoRiscos() {
        log.debug("REST request to get all EventoRiscos");
        return eventoRiscoRepository.findAll();
    }

    /**
     * {@code GET  /evento-riscos/:id} : get the "id" eventoRisco.
     *
     * @param id the id of the eventoRisco to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the eventoRisco, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/evento-riscos/{id}")
    public ResponseEntity<EventoRisco> getEventoRisco(@PathVariable String id) {
        log.debug("REST request to get EventoRisco : {}", id);
        Optional<EventoRisco> eventoRisco = eventoRiscoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(eventoRisco);
    }

    /**
     * {@code DELETE  /evento-riscos/:id} : delete the "id" eventoRisco.
     *
     * @param id the id of the eventoRisco to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/evento-riscos/{id}")
    public ResponseEntity<Void> deleteEventoRisco(@PathVariable String id) {
        log.debug("REST request to delete EventoRisco : {}", id);
        eventoRiscoRepository.deleteById(id);
        eventoRiscoSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/evento-riscos?query=:query} : search for the eventoRisco corresponding
     * to the query.
     *
     * @param query the query of the eventoRisco search.
     * @return the result of the search.
     */
    @GetMapping("/_search/evento-riscos")
    public List<EventoRisco> searchEventoRiscos(@RequestParam String query) {
        log.debug("REST request to search EventoRiscos for query {}", query);
        return StreamSupport
            .stream(eventoRiscoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
