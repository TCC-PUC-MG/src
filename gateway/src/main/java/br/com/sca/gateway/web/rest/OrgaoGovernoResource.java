package br.com.sca.gateway.web.rest;

import br.com.sca.gateway.domain.OrgaoGoverno;
import br.com.sca.gateway.repository.OrgaoGovernoRepository;
import br.com.sca.gateway.repository.search.OrgaoGovernoSearchRepository;
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
 * REST controller for managing {@link br.com.sca.gateway.domain.OrgaoGoverno}.
 */
@RestController
@RequestMapping("/api")
public class OrgaoGovernoResource {

    private final Logger log = LoggerFactory.getLogger(OrgaoGovernoResource.class);

    private static final String ENTITY_NAME = "orgaoGoverno";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrgaoGovernoRepository orgaoGovernoRepository;

    private final OrgaoGovernoSearchRepository orgaoGovernoSearchRepository;

    public OrgaoGovernoResource(OrgaoGovernoRepository orgaoGovernoRepository, OrgaoGovernoSearchRepository orgaoGovernoSearchRepository) {
        this.orgaoGovernoRepository = orgaoGovernoRepository;
        this.orgaoGovernoSearchRepository = orgaoGovernoSearchRepository;
    }

    /**
     * {@code POST  /orgao-governos} : Create a new orgaoGoverno.
     *
     * @param orgaoGoverno the orgaoGoverno to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new orgaoGoverno, or with status {@code 400 (Bad Request)} if the orgaoGoverno has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/orgao-governos")
    public ResponseEntity<OrgaoGoverno> createOrgaoGoverno(@RequestBody OrgaoGoverno orgaoGoverno) throws URISyntaxException {
        log.debug("REST request to save OrgaoGoverno : {}", orgaoGoverno);
        if (orgaoGoverno.getId() != null) {
            throw new BadRequestAlertException("A new orgaoGoverno cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrgaoGoverno result = orgaoGovernoRepository.save(orgaoGoverno);
        orgaoGovernoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/orgao-governos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /orgao-governos} : Updates an existing orgaoGoverno.
     *
     * @param orgaoGoverno the orgaoGoverno to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated orgaoGoverno,
     * or with status {@code 400 (Bad Request)} if the orgaoGoverno is not valid,
     * or with status {@code 500 (Internal Server Error)} if the orgaoGoverno couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/orgao-governos")
    public ResponseEntity<OrgaoGoverno> updateOrgaoGoverno(@RequestBody OrgaoGoverno orgaoGoverno) throws URISyntaxException {
        log.debug("REST request to update OrgaoGoverno : {}", orgaoGoverno);
        if (orgaoGoverno.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrgaoGoverno result = orgaoGovernoRepository.save(orgaoGoverno);
        orgaoGovernoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, orgaoGoverno.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /orgao-governos} : get all the orgaoGovernos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of orgaoGovernos in body.
     */
    @GetMapping("/orgao-governos")
    public List<OrgaoGoverno> getAllOrgaoGovernos() {
        log.debug("REST request to get all OrgaoGovernos");
        return orgaoGovernoRepository.findAll();
    }

    /**
     * {@code GET  /orgao-governos/:id} : get the "id" orgaoGoverno.
     *
     * @param id the id of the orgaoGoverno to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the orgaoGoverno, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/orgao-governos/{id}")
    public ResponseEntity<OrgaoGoverno> getOrgaoGoverno(@PathVariable String id) {
        log.debug("REST request to get OrgaoGoverno : {}", id);
        Optional<OrgaoGoverno> orgaoGoverno = orgaoGovernoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(orgaoGoverno);
    }

    /**
     * {@code DELETE  /orgao-governos/:id} : delete the "id" orgaoGoverno.
     *
     * @param id the id of the orgaoGoverno to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/orgao-governos/{id}")
    public ResponseEntity<Void> deleteOrgaoGoverno(@PathVariable String id) {
        log.debug("REST request to delete OrgaoGoverno : {}", id);
        orgaoGovernoRepository.deleteById(id);
        orgaoGovernoSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/orgao-governos?query=:query} : search for the orgaoGoverno corresponding
     * to the query.
     *
     * @param query the query of the orgaoGoverno search.
     * @return the result of the search.
     */
    @GetMapping("/_search/orgao-governos")
    public List<OrgaoGoverno> searchOrgaoGovernos(@RequestParam String query) {
        log.debug("REST request to search OrgaoGovernos for query {}", query);
        return StreamSupport
            .stream(orgaoGovernoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
