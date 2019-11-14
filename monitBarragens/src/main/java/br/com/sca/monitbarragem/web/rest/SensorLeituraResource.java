package br.com.sca.monitbarragem.web.rest;

import br.com.sca.monitbarragem.domain.SensorLeitura;
import br.com.sca.monitbarragem.repository.SensorLeituraRepository;
import br.com.sca.monitbarragem.repository.search.SensorLeituraSearchRepository;
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
 * REST controller for managing {@link br.com.sca.monitbarragem.domain.SensorLeitura}.
 */
@RestController
@RequestMapping("/api")
public class SensorLeituraResource {

    private final Logger log = LoggerFactory.getLogger(SensorLeituraResource.class);

    private static final String ENTITY_NAME = "monitBarragensSensorLeitura";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SensorLeituraRepository sensorLeituraRepository;

    private final SensorLeituraSearchRepository sensorLeituraSearchRepository;

    public SensorLeituraResource(SensorLeituraRepository sensorLeituraRepository, SensorLeituraSearchRepository sensorLeituraSearchRepository) {
        this.sensorLeituraRepository = sensorLeituraRepository;
        this.sensorLeituraSearchRepository = sensorLeituraSearchRepository;
    }

    /**
     * {@code POST  /sensor-leituras} : Create a new sensorLeitura.
     *
     * @param sensorLeitura the sensorLeitura to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sensorLeitura, or with status {@code 400 (Bad Request)} if the sensorLeitura has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sensor-leituras")
    public ResponseEntity<SensorLeitura> createSensorLeitura(@RequestBody SensorLeitura sensorLeitura) throws URISyntaxException {
        log.debug("REST request to save SensorLeitura : {}", sensorLeitura);
        if (sensorLeitura.getId() != null) {
            throw new BadRequestAlertException("A new sensorLeitura cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SensorLeitura result = sensorLeituraRepository.save(sensorLeitura);
        sensorLeituraSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/sensor-leituras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sensor-leituras} : Updates an existing sensorLeitura.
     *
     * @param sensorLeitura the sensorLeitura to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sensorLeitura,
     * or with status {@code 400 (Bad Request)} if the sensorLeitura is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sensorLeitura couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sensor-leituras")
    public ResponseEntity<SensorLeitura> updateSensorLeitura(@RequestBody SensorLeitura sensorLeitura) throws URISyntaxException {
        log.debug("REST request to update SensorLeitura : {}", sensorLeitura);
        if (sensorLeitura.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SensorLeitura result = sensorLeituraRepository.save(sensorLeitura);
        sensorLeituraSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sensorLeitura.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sensor-leituras} : get all the sensorLeituras.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sensorLeituras in body.
     */
    @GetMapping("/sensor-leituras")
    public List<SensorLeitura> getAllSensorLeituras() {
        log.debug("REST request to get all SensorLeituras");
        return sensorLeituraRepository.findAll();
    }

    /**
     * {@code GET  /sensor-leituras/:id} : get the "id" sensorLeitura.
     *
     * @param id the id of the sensorLeitura to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sensorLeitura, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sensor-leituras/{id}")
    public ResponseEntity<SensorLeitura> getSensorLeitura(@PathVariable String id) {
        log.debug("REST request to get SensorLeitura : {}", id);
        Optional<SensorLeitura> sensorLeitura = sensorLeituraRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sensorLeitura);
    }

    /**
     * {@code DELETE  /sensor-leituras/:id} : delete the "id" sensorLeitura.
     *
     * @param id the id of the sensorLeitura to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sensor-leituras/{id}")
    public ResponseEntity<Void> deleteSensorLeitura(@PathVariable String id) {
        log.debug("REST request to delete SensorLeitura : {}", id);
        sensorLeituraRepository.deleteById(id);
        sensorLeituraSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/sensor-leituras?query=:query} : search for the sensorLeitura corresponding
     * to the query.
     *
     * @param query the query of the sensorLeitura search.
     * @return the result of the search.
     */
    @GetMapping("/_search/sensor-leituras")
    public List<SensorLeitura> searchSensorLeituras(@RequestParam String query) {
        log.debug("REST request to search SensorLeituras for query {}", query);
        return StreamSupport
            .stream(sensorLeituraSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
