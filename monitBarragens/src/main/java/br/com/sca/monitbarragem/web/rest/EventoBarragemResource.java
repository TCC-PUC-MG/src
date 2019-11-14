package br.com.sca.monitbarragem.web.rest;

import br.com.sca.monitbarragem.domain.EventoBarragem;
import br.com.sca.monitbarragem.repository.EventoBarragemRepository;
import br.com.sca.monitbarragem.repository.search.EventoBarragemSearchRepository;
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
 * REST controller for managing {@link br.com.sca.monitbarragem.domain.EventoBarragem}.
 */
@RestController
@RequestMapping("/api")
public class EventoBarragemResource {

    private final Logger log = LoggerFactory.getLogger(EventoBarragemResource.class);

    private static final String ENTITY_NAME = "monitBarragensEventoBarragem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EventoBarragemRepository eventoBarragemRepository;

    private final EventoBarragemSearchRepository eventoBarragemSearchRepository;

    public EventoBarragemResource(EventoBarragemRepository eventoBarragemRepository, EventoBarragemSearchRepository eventoBarragemSearchRepository) {
        this.eventoBarragemRepository = eventoBarragemRepository;
        this.eventoBarragemSearchRepository = eventoBarragemSearchRepository;
    }

    /**
     * {@code POST  /evento-barragems} : Create a new eventoBarragem.
     *
     * @param eventoBarragem the eventoBarragem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new eventoBarragem, or with status {@code 400 (Bad Request)} if the eventoBarragem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/evento-barragems")
    public ResponseEntity<EventoBarragem> createEventoBarragem(@RequestBody EventoBarragem eventoBarragem) throws URISyntaxException {
        log.debug("REST request to save EventoBarragem : {}", eventoBarragem);
        if (eventoBarragem.getId() != null) {
            throw new BadRequestAlertException("A new eventoBarragem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EventoBarragem result = eventoBarragemRepository.save(eventoBarragem);
        eventoBarragemSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/evento-barragems/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /evento-barragems} : Updates an existing eventoBarragem.
     *
     * @param eventoBarragem the eventoBarragem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated eventoBarragem,
     * or with status {@code 400 (Bad Request)} if the eventoBarragem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the eventoBarragem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/evento-barragems")
    public ResponseEntity<EventoBarragem> updateEventoBarragem(@RequestBody EventoBarragem eventoBarragem) throws URISyntaxException {
        log.debug("REST request to update EventoBarragem : {}", eventoBarragem);
        if (eventoBarragem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EventoBarragem result = eventoBarragemRepository.save(eventoBarragem);
        eventoBarragemSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, eventoBarragem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /evento-barragems} : get all the eventoBarragems.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of eventoBarragems in body.
     */
    @GetMapping("/evento-barragems")
    public List<EventoBarragem> getAllEventoBarragems() {
        log.debug("REST request to get all EventoBarragems");
        return eventoBarragemRepository.findAll();
    }

    /**
     * {@code GET  /evento-barragems/:id} : get the "id" eventoBarragem.
     *
     * @param id the id of the eventoBarragem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the eventoBarragem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/evento-barragems/{id}")
    public ResponseEntity<EventoBarragem> getEventoBarragem(@PathVariable String id) {
        log.debug("REST request to get EventoBarragem : {}", id);
        Optional<EventoBarragem> eventoBarragem = eventoBarragemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(eventoBarragem);
    }

    /**
     * {@code DELETE  /evento-barragems/:id} : delete the "id" eventoBarragem.
     *
     * @param id the id of the eventoBarragem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/evento-barragems/{id}")
    public ResponseEntity<Void> deleteEventoBarragem(@PathVariable String id) {
        log.debug("REST request to delete EventoBarragem : {}", id);
        eventoBarragemRepository.deleteById(id);
        eventoBarragemSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/evento-barragems?query=:query} : search for the eventoBarragem corresponding
     * to the query.
     *
     * @param query the query of the eventoBarragem search.
     * @return the result of the search.
     */
    @GetMapping("/_search/evento-barragems")
    public List<EventoBarragem> searchEventoBarragems(@RequestParam String query) {
        log.debug("REST request to search EventoBarragems for query {}", query);
        return StreamSupport
            .stream(eventoBarragemSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
