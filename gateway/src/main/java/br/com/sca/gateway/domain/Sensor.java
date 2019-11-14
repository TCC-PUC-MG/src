package br.com.sca.gateway.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Sensor.
 */
@Document(collection = "sensor")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "sensor")
public class Sensor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private String id;

    @Field("numero")
    private Integer numero;

    @DBRef
    @Field("barragem")
    @JsonIgnoreProperties("sensors")
    private Barragem barragem;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getNumero() {
        return numero;
    }

    public Sensor numero(Integer numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public Barragem getBarragem() {
        return barragem;
    }

    public Sensor barragem(Barragem barragem) {
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
        if (!(o instanceof Sensor)) {
            return false;
        }
        return id != null && id.equals(((Sensor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Sensor{" +
            "id=" + getId() +
            ", numero=" + getNumero() +
            "}";
    }
}
