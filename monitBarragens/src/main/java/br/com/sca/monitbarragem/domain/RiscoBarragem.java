package br.com.sca.monitbarragem.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A RiscoBarragem.
 */
@Document(collection = "risco_barragem")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "riscobarragem")
public class RiscoBarragem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private String id;

    @Field("descricao_risco")
    private String descricaoRisco;

    @Field("grau_do_risco")
    private Integer grauDoRisco;

    @DBRef
    @Field("eventoRisco")
    @JsonIgnoreProperties("riscoBarragems")
    private EventoRisco eventoRisco;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescricaoRisco() {
        return descricaoRisco;
    }

    public RiscoBarragem descricaoRisco(String descricaoRisco) {
        this.descricaoRisco = descricaoRisco;
        return this;
    }

    public void setDescricaoRisco(String descricaoRisco) {
        this.descricaoRisco = descricaoRisco;
    }

    public Integer getGrauDoRisco() {
        return grauDoRisco;
    }

    public RiscoBarragem grauDoRisco(Integer grauDoRisco) {
        this.grauDoRisco = grauDoRisco;
        return this;
    }

    public void setGrauDoRisco(Integer grauDoRisco) {
        this.grauDoRisco = grauDoRisco;
    }

    public EventoRisco getEventoRisco() {
        return eventoRisco;
    }

    public RiscoBarragem eventoRisco(EventoRisco eventoRisco) {
        this.eventoRisco = eventoRisco;
        return this;
    }

    public void setEventoRisco(EventoRisco eventoRisco) {
        this.eventoRisco = eventoRisco;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RiscoBarragem)) {
            return false;
        }
        return id != null && id.equals(((RiscoBarragem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RiscoBarragem{" +
            "id=" + getId() +
            ", descricaoRisco='" + getDescricaoRisco() + "'" +
            ", grauDoRisco=" + getGrauDoRisco() +
            "}";
    }
}
