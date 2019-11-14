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
 * A EventoRisco.
 */
@Document(collection = "evento_risco")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "eventorisco")
public class EventoRisco implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private String id;

    @Field("eventos_barragem")
    private String eventosBarragem;

    @DBRef
    @Field("riscoBarragem")
    private Set<RiscoBarragem> riscoBarragems = new HashSet<>();

    @DBRef
    @Field("eventoBarragem")
    @JsonIgnoreProperties("eventoRiscos")
    private EventoBarragem eventoBarragem;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEventosBarragem() {
        return eventosBarragem;
    }

    public EventoRisco eventosBarragem(String eventosBarragem) {
        this.eventosBarragem = eventosBarragem;
        return this;
    }

    public void setEventosBarragem(String eventosBarragem) {
        this.eventosBarragem = eventosBarragem;
    }

    public Set<RiscoBarragem> getRiscoBarragems() {
        return riscoBarragems;
    }

    public EventoRisco riscoBarragems(Set<RiscoBarragem> riscoBarragems) {
        this.riscoBarragems = riscoBarragems;
        return this;
    }

    public EventoRisco addRiscoBarragem(RiscoBarragem riscoBarragem) {
        this.riscoBarragems.add(riscoBarragem);
        riscoBarragem.setEventoRisco(this);
        return this;
    }

    public EventoRisco removeRiscoBarragem(RiscoBarragem riscoBarragem) {
        this.riscoBarragems.remove(riscoBarragem);
        riscoBarragem.setEventoRisco(null);
        return this;
    }

    public void setRiscoBarragems(Set<RiscoBarragem> riscoBarragems) {
        this.riscoBarragems = riscoBarragems;
    }

    public EventoBarragem getEventoBarragem() {
        return eventoBarragem;
    }

    public EventoRisco eventoBarragem(EventoBarragem eventoBarragem) {
        this.eventoBarragem = eventoBarragem;
        return this;
    }

    public void setEventoBarragem(EventoBarragem eventoBarragem) {
        this.eventoBarragem = eventoBarragem;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EventoRisco)) {
            return false;
        }
        return id != null && id.equals(((EventoRisco) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EventoRisco{" +
            "id=" + getId() +
            ", eventosBarragem='" + getEventosBarragem() + "'" +
            "}";
    }
}
