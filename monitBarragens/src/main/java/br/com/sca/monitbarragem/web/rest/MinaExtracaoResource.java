package br.com.sca.monitbarragem.web.rest;

import br.com.sca.monitbarragem.domain.MinaExtracao;
import br.com.sca.monitbarragem.repository.MinaExtracaoRepository;
import br.com.sca.monitbarragem.repository.search.MinaExtracaoSearchRepository;
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
 * REST controller for managing {@link br.com.sca.monitbarragem.domain.MinaExtracao}.
 */
@RestController
@RequestMapping("/api")
public class MinaExtracaoResource {

    private final Logger log = LoggerFactory.getLogger(MinaExtracaoResource.class);

    private static final String ENTITY_NAME = "monitBarragensMinaExtracao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MinaExtracaoRepository minaExtracaoRepository;

    private final MinaExtracaoSearchRepository minaExtracaoSearchRepository;

    public MinaExtracaoResource(MinaExtracaoRepository minaExtracaoRepository, MinaExtracaoSearchRepository minaExtracaoSearchRepository) {
        this.minaExtracaoRepository = minaExtracaoRepository;
        this.minaExtracaoSearchRepository = minaExtracaoSearchRepository;
    }

    /**
     * {@code POST  /mina-extracaos} : Create a new minaExtracao.
     *
     * @param minaExtracao the minaExtracao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new minaExtracao, or with status {@code 400 (Bad Request)} if the minaExtracao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/mina-extracaos")
    public ResponseEntity<MinaExtracao> createMinaExtracao(@RequestBody MinaExtracao minaExtracao) throws URISyntaxException {
        log.debug("REST request to save MinaExtracao : {}", minaExtracao);
        if (minaExtracao.getId() != null) {
            throw new BadRequestAlertException("A new minaExtracao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MinaExtracao result = minaExtracaoRepository.save(minaExtracao);
        minaExtracaoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/mina-extracaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /mina-extracaos} : Updates an existing minaExtracao.
     *
     * @param minaExtracao the minaExtracao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated minaExtracao,
     * or with status {@code 400 (Bad Request)} if the minaExtracao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the minaExtracao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/mina-extracaos")
    public ResponseEntity<MinaExtracao> updateMinaExtracao(@RequestBody MinaExtracao minaExtracao) throws URISyntaxException {
        log.debug("REST request to update MinaExtracao : {}", minaExtracao);
        if (minaExtracao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MinaExtracao result = minaExtracaoRepository.save(minaExtracao);
        minaExtracaoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, minaExtracao.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /mina-extracaos} : get all the minaExtracaos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of minaExtracaos in body.
     */
    @GetMapping("/mina-extracaos")
    public List<MinaExtracao> getAllMinaExtracaos() {
        log.debug("REST request to get all MinaExtracaos");
        return minaExtracaoRepository.findAll();
    }

    /**
     * {@code GET  /mina-extracaos/:id} : get the "id" minaExtracao.
     *
     * @param id the id of the minaExtracao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the minaExtracao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/mina-extracaos/{id}")
    public ResponseEntity<MinaExtracao> getMinaExtracao(@PathVariable String id) {
        log.debug("REST request to get MinaExtracao : {}", id);
        Optional<MinaExtracao> minaExtracao = minaExtracaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(minaExtracao);
    }

    /**
     * {@code DELETE  /mina-extracaos/:id} : delete the "id" minaExtracao.
     *
     * @param id the id of the minaExtracao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/mina-extracaos/{id}")
    public ResponseEntity<Void> deleteMinaExtracao(@PathVariable String id) {
        log.debug("REST request to delete MinaExtracao : {}", id);
        minaExtracaoRepository.deleteById(id);
        minaExtracaoSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/mina-extracaos?query=:query} : search for the minaExtracao corresponding
     * to the query.
     *
     * @param query the query of the minaExtracao search.
     * @return the result of the search.
     */
    @GetMapping("/_search/mina-extracaos")
    public List<MinaExtracao> searchMinaExtracaos(@RequestParam String query) {
        log.debug("REST request to search MinaExtracaos for query {}", query);
        return StreamSupport
            .stream(minaExtracaoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
