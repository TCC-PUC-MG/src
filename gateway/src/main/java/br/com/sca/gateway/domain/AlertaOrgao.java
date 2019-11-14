package br.com.sca.gateway.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A AlertaOrgao.
 */
@Document(collection = "alerta_orgao")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "alertaorgao")
public class AlertaOrgao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private String id;

    @DBRef
    @Field("alertaEnviados")
    private AlertaEnviados alertaEnviados;

    @DBRef
    @Field("tipoAlerta")
    @JsonIgnoreProperties("alertaOrgaos")
    private TipoAlerta tipoAlerta;

    @DBRef
    @Field("orgaoGoverna")
    @JsonIgnoreProperties("alertaOrgaos")
    private OrgaoGoverno orgaoGoverna;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public AlertaEnviados getAlertaEnviados() {
        return alertaEnviados;
    }

    public AlertaOrgao alertaEnviados(AlertaEnviados alertaEnviados) {
        this.alertaEnviados = alertaEnviados;
        return this;
    }

    public void setAlertaEnviados(AlertaEnviados alertaEnviados) {
        this.alertaEnviados = alertaEnviados;
    }

    public TipoAlerta getTipoAlerta() {
        return tipoAlerta;
    }

    public AlertaOrgao tipoAlerta(TipoAlerta tipoAlerta) {
        this.tipoAlerta = tipoAlerta;
        return this;
    }

    public void setTipoAlerta(TipoAlerta tipoAlerta) {
        this.tipoAlerta = tipoAlerta;
    }

    public OrgaoGoverno getOrgaoGoverna() {
        return orgaoGoverna;
    }

    public AlertaOrgao orgaoGoverna(OrgaoGoverno orgaoGoverno) {
        this.orgaoGoverna = orgaoGoverno;
        return this;
    }

    public void setOrgaoGoverna(OrgaoGoverno orgaoGoverno) {
        this.orgaoGoverna = orgaoGoverno;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AlertaOrgao)) {
            return false;
        }
        return id != null && id.equals(((AlertaOrgao) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AlertaOrgao{" +
            "id=" + getId() +
            "}";
    }
}
