package br.com.sca.monitbarragem.domain;
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
 * A SensorLeitura.
 */
@Document(collection = "sensor_leitura")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "sensorleitura")
public class SensorLeitura implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private String id;

    @Field("leitura")
    private String leitura;

    @DBRef
    @Field("eventoBarragem")
    private Set<EventoBarragem> eventoBarragems = new HashSet<>();

    @DBRef
    @Field("barragem")
    @JsonIgnoreProperties("sensorLeituras")
    private Barragem barragem;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLeitura() {
        return leitura;
    }

    public SensorLeitura leitura(String leitura) {
        this.leitura = leitura;
        return this;
    }

    public void setLeitura(String leitura) {
        this.leitura = leitura;
    }

    public Set<EventoBarragem> getEventoBarragems() {
        return eventoBarragems;
    }

    public SensorLeitura eventoBarragems(Set<EventoBarragem> eventoBarragems) {
        this.eventoBarragems = eventoBarragems;
        return this;
    }

    public SensorLeitura addEventoBarragem(EventoBarragem eventoBarragem) {
        this.eventoBarragems.add(eventoBarragem);
        eventoBarragem.setSensorLeitura(this);
        return this;
    }

    public SensorLeitura removeEventoBarragem(EventoBarragem eventoBarragem) {
        this.eventoBarragems.remove(eventoBarragem);
        eventoBarragem.setSensorLeitura(null);
        return this;
    }

    public void setEventoBarragems(Set<EventoBarragem> eventoBarragems) {
        this.eventoBarragems = eventoBarragems;
    }

    public Barragem getBarragem() {
        return barragem;
    }

    public SensorLeitura barragem(Barragem barragem) {
        this.barragem = barragem;
        return this;
    }

    public void setBarragem(Barragem barragem) {
        this.barragem = barragem;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SensorLeitura)) {
            return false;
        }
        return id != null && id.equals(((SensorLeitura) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SensorLeitura{" +
            "id=" + getId() +
            ", leitura='" + getLeitura() + "'" +
            "}";
    }
}
