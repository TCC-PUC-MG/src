package br.com.sca.gateway.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A AlertaEnviados.
 */
@Document(collection = "alerta_enviados")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "alertaenviados")
public class AlertaEnviados implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private String id;

    @DBRef
    @Field("alertaOrgaos")
    @com.fasterxml.jackson.annotation.JsonBackReference
    private AlertaOrgao alertaOrgaos;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public AlertaOrgao getAlertaOrgaos() {
        return alertaOrgaos;
    }

    public AlertaEnviados alertaOrgaos(AlertaOrgao alertaOrgao) {
        this.alertaOrgaos = alertaOrgao;
        return this;
    }

    public void setAlertaOrgaos(AlertaOrgao alertaOrgao) {
        this.alertaOrgaos = alertaOrgao;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AlertaEnviados)) {
            return false;
        }
        return id != null && id.equals(((AlertaEnviados) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AlertaEnviados{" +
            "id=" + getId() +
            "}";
    }
}
