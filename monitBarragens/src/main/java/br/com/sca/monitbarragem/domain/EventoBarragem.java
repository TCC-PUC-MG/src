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
 * A EventoBarragem.
 */
@Document(collection = "evento_barragem")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "eventobarragem")
public class EventoBarragem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private String id;

    @DBRef
    @Field("eventoRisco")
    private Set<EventoRisco> eventoRiscos = new HashSet<>();

    @DBRef
    @Field("sensorLeitura")
    @JsonIgnoreProperties("eventoBarragems")
    private SensorLeitura sensorLeitura;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<EventoRisco> getEventoRiscos() {
        return eventoRiscos;
    }

    public EventoBarragem eventoRiscos(Set<EventoRisco> eventoRiscos) {
        this.eventoRiscos = eventoRiscos;
        return this;
    }

    public EventoBarragem addEventoRisco(EventoRisco eventoRisco) {
        this.eventoRiscos.add(eventoRisco);
        eventoRisco.setEventoBarragem(this);
        return this;
    }

    public EventoBarragem removeEventoRisco(EventoRisco eventoRisco) {
        this.eventoRiscos.remove(eventoRisco);
        eventoRisco.setEventoBarragem(null);
        return this;
    }

    public void setEventoRiscos(Set<EventoRisco> eventoRiscos) {
        this.eventoRiscos = eventoRiscos;
    }

    public SensorLeitura getSensorLeitura() {
        return sensorLeitura;
    }

    public EventoBarragem sensorLeitura(SensorLeitura sensorLeitura) {
        this.sensorLeitura = sensorLeitura;
        return this;
    }

    public void setSensorLeitura(SensorLeitura sensorLeitura) {
        this.sensorLeitura = sensorLeitura;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EventoBarragem)) {
            return false;
        }
        return id != null && id.equals(((EventoBarragem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EventoBarragem{" +
            "id=" + getId() +
            "}";
    }
}
