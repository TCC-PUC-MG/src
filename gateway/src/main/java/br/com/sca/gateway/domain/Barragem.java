package br.com.sca.gateway.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Barragem.
 */
@Document(collection = "barragem")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "barragem")
public class Barragem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private String id;

    @DBRef
    @Field("sensor")
    private Set<Sensor> sensors = new HashSet<>();

    @DBRef
    @Field("sensorLeitura")
    private Set<SensorLeitura> sensorLeituras = new HashSet<>();

    @DBRef
    @Field("minaExtracao")
    @JsonIgnoreProperties("barragems")
    private MinaExtracao minaExtracao;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<Sensor> getSensors() {
        return sensors;
    }

    public Barragem sensors(Set<Sensor> sensors) {
        this.sensors = sensors;
        return this;
    }

    public Barragem addSensor(Sensor sensor) {
        this.sensors.add(sensor);
        sensor.setBarragem(this);
        return this;
    }

    public Barragem removeSensor(Sensor sensor) {
        this.sensors.remove(sensor);
        sensor.setBarragem(null);
        return this;
    }

    public void setSensors(Set<Sensor> sensors) {
        this.sensors = sensors;
    }

    public Set<SensorLeitura> getSensorLeituras() {
        return sensorLeituras;
    }

    public Barragem sensorLeituras(Set<SensorLeitura> sensorLeituras) {
        this.sensorLeituras = sensorLeituras;
        return this;
    }

    public Barragem addSensorLeitura(SensorLeitura sensorLeitura) {
        this.sensorLeituras.add(sensorLeitura);
        sensorLeitura.setBarragem(this);
        return this;
    }

    public Barragem removeSensorLeitura(SensorLeitura sensorLeitura) {
        this.sensorLeituras.remove(sensorLeitura);
        sensorLeitura.setBarragem(null);
        return this;
    }

    public void setSensorLeituras(Set<SensorLeitura> sensorLeituras) {
        this.sensorLeituras = sensorLeituras;
    }

    public MinaExtracao getMinaExtracao() {
        return minaExtracao;
    }

    public Barragem minaExtracao(MinaExtracao minaExtracao) {
        this.minaExtracao = minaExtracao;
        return this;
    }

    public void setMinaExtracao(MinaExtracao minaExtracao) {
        this.minaExtracao = minaExtracao;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Barragem)) {
            return false;
        }
        return id != null && id.equals(((Barragem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Barragem{" +
            "id=" + getId() +
            "}";
    }
}
