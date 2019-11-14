package br.com.sca.monitbarragem.web.rest;

import br.com.sca.monitbarragem.domain.Sensor;
import br.com.sca.monitbarragem.repository.SensorRepository;
import br.com.sca.monitbarragem.repository.search.SensorSearchRepository;
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
 * REST controller for managing {@link br.com.sca.monitbarragem.domain.Sensor}.
 */
@RestController
@RequestMapping("/api")
public class SensorResource {

    private final Logger log = LoggerFactory.getLogger(SensorResource.class);

    private static final String ENTITY_NAME = "monitBarragensSensor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SensorRepository sensorRepository;

    private final SensorSearchRepository sensorSearchRepository;

    public SensorResource(SensorRepository sensorRepository, SensorSearchRepository sensorSearchRepository) {
        this.sensorRepository = sensorRepository;
        this.sensorSearchRepository = sensorSearchRepository;
    }

    /**
     * {@code POST  /sensors} : Create a new sensor.
     *
     * @param sensor the sensor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sensor, or with status {@code 400 (Bad Request)} if the sensor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sensors")
    public ResponseEntity<Sensor> createSensor(@RequestBody Sensor sensor) throws URISyntaxException {
        log.debug("REST request to save Sensor : {}", sensor);
        if (sensor.getId() != null) {
            throw new BadRequestAlertException("A new sensor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sensor result = sensorRepository.save(sensor);
        sensorSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/sensors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sensors} : Updates an existing sensor.
     *
     * @param sensor the sensor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sensor,
     * or with status {@code 400 (Bad Request)} if the sensor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sensor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sensors")
    public ResponseEntity<Sensor> updateSensor(@RequestBody Sensor sensor) throws URISyntaxException {
        log.debug("REST request to update Sensor : {}", sensor);
        if (sensor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Sensor result = sensorRepository.save(sensor);
        sensorSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sensor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sensors} : get all the sensors.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sensors in body.
     */
    @GetMapping("/sensors")
    public List<Sensor> getAllSensors() {
        log.debug("REST request to get all Sensors");
        return sensorRepository.findAll();
    }

    /**
     * {@code GET  /sensors/:id} : get the "id" sensor.
     *
     * @param id the id of the sensor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sensor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sensors/{id}")
    public ResponseEntity<Sensor> getSensor(@PathVariable String id) {
        log.debug("REST request to get Sensor : {}", id);
        Optional<Sensor> sensor = sensorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sensor);
    }

    /**
     * {@code DELETE  /sensors/:id} : delete the "id" sensor.
     *
     * @param id the id of the sensor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sensors/{id}")
    public ResponseEntity<Void> deleteSensor(@PathVariable String id) {
        log.debug("REST request to delete Sensor : {}", id);
        sensorRepository.deleteById(id);
        sensorSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/sensors?query=:query} : search for the sensor corresponding
     * to the query.
     *
     * @param query the query of the sensor search.
     * @return the result of the search.
     */
    @GetMapping("/_search/sensors")
    public List<Sensor> searchSensors(@RequestParam String query) {
        log.debug("REST request to search Sensors for query {}", query);
        return StreamSupport
            .stream(sensorSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
