package br.com.sca.segcomunicacao.web.rest;

import br.com.sca.segcomunicacao.domain.NivelSituacao;
import br.com.sca.segcomunicacao.repository.NivelSituacaoRepository;
import br.com.sca.segcomunicacao.repository.search.NivelSituacaoSearchRepository;
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
 * REST controller for managing {@link br.com.sca.segcomunicacao.domain.NivelSituacao}.
 */
@RestController
@RequestMapping("/api")
public class NivelSituacaoResource {

    private final Logger log = LoggerFactory.getLogger(NivelSituacaoResource.class);

    private static final String ENTITY_NAME = "segComunicacaoNivelSituacao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NivelSituacaoRepository nivelSituacaoRepository;

    private final NivelSituacaoSearchRepository nivelSituacaoSearchRepository;

    public NivelSituacaoResource(NivelSituacaoRepository nivelSituacaoRepository, NivelSituacaoSearchRepository nivelSituacaoSearchRepository) {
        this.nivelSituacaoRepository = nivelSituacaoRepository;
        this.nivelSituacaoSearchRepository = nivelSituacaoSearchRepository;
    }

    /**
     * {@code POST  /nivel-situacaos} : Create a new nivelSituacao.
     *
     * @param nivelSituacao the nivelSituacao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nivelSituacao, or with status {@code 400 (Bad Request)} if the nivelSituacao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nivel-situacaos")
    public ResponseEntity<NivelSituacao> createNivelSituacao(@RequestBody NivelSituacao nivelSituacao) throws URISyntaxException {
        log.debug("REST request to save NivelSituacao : {}", nivelSituacao);
        if (nivelSituacao.getId() != null) {
            throw new BadRequestAlertException("A new nivelSituacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NivelSituacao result = nivelSituacaoRepository.save(nivelSituacao);
        nivelSituacaoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/nivel-situacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nivel-situacaos} : Updates an existing nivelSituacao.
     *
     * @param nivelSituacao the nivelSituacao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nivelSituacao,
     * or with status {@code 400 (Bad Request)} if the nivelSituacao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nivelSituacao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nivel-situacaos")
    public ResponseEntity<NivelSituacao> updateNivelSituacao(@RequestBody NivelSituacao nivelSituacao) throws URISyntaxException {
        log.debug("REST request to update NivelSituacao : {}", nivelSituacao);
        if (nivelSituacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NivelSituacao result = nivelSituacaoRepository.save(nivelSituacao);
        nivelSituacaoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, nivelSituacao.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /nivel-situacaos} : get all the nivelSituacaos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nivelSituacaos in body.
     */
    @GetMapping("/nivel-situacaos")
    public List<NivelSituacao> getAllNivelSituacaos() {
        log.debug("REST request to get all NivelSituacaos");
        return nivelSituacaoRepository.findAll();
    }

    /**
     * {@code GET  /nivel-situacaos/:id} : get the "id" nivelSituacao.
     *
     * @param id the id of the nivelSituacao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nivelSituacao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nivel-situacaos/{id}")
    public ResponseEntity<NivelSituacao> getNivelSituacao(@PathVariable String id) {
        log.debug("REST request to get NivelSituacao : {}", id);
        Optional<NivelSituacao> nivelSituacao = nivelSituacaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(nivelSituacao);
    }

    /**
     * {@code DELETE  /nivel-situacaos/:id} : delete the "id" nivelSituacao.
     *
     * @param id the id of the nivelSituacao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nivel-situacaos/{id}")
    public ResponseEntity<Void> deleteNivelSituacao(@PathVariable String id) {
        log.debug("REST request to delete NivelSituacao : {}", id);
        nivelSituacaoRepository.deleteById(id);
        nivelSituacaoSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/nivel-situacaos?query=:query} : search for the nivelSituacao corresponding
     * to the query.
     *
     * @param query the query of the nivelSituacao search.
     * @return the result of the search.
     */
    @GetMapping("/_search/nivel-situacaos")
    public List<NivelSituacao> searchNivelSituacaos(@RequestParam String query) {
        log.debug("REST request to search NivelSituacaos for query {}", query);
        return StreamSupport
            .stream(nivelSituacaoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
