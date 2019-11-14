package br.com.sca.segcomunicacao.domain;
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
 * A TipoAlerta.
 */
@Document(collection = "tipo_alerta")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "tipoalerta")
public class TipoAlerta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private String id;

    @Field("descricao")
    private String descricao;

    @DBRef
    @Field("alertaOrgao")
    private Set<AlertaOrgao> alertaOrgaos = new HashSet<>();

    @DBRef
    @Field("ocorrencias")
    @JsonIgnoreProperties("tipoAlertas")
    private Ocorrencias ocorrencias;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public TipoAlerta descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<AlertaOrgao> getAlertaOrgaos() {
        return alertaOrgaos;
    }

    public TipoAlerta alertaOrgaos(Set<AlertaOrgao> alertaOrgaos) {
        this.alertaOrgaos = alertaOrgaos;
        return this;
    }

    public TipoAlerta addAlertaOrgao(AlertaOrgao alertaOrgao) {
        this.alertaOrgaos.add(alertaOrgao);
        alertaOrgao.setTipoAlerta(this);
        return this;
    }

    public TipoAlerta removeAlertaOrgao(AlertaOrgao alertaOrgao) {
        this.alertaOrgaos.remove(alertaOrgao);
        alertaOrgao.setTipoAlerta(null);
        return this;
    }

    public void setAlertaOrgaos(Set<AlertaOrgao> alertaOrgaos) {
        this.alertaOrgaos = alertaOrgaos;
    }

    public Ocorrencias getOcorrencias() {
        return ocorrencias;
    }

    public TipoAlerta ocorrencias(Ocorrencias ocorrencias) {
        this.ocorrencias = ocorrencias;
        return this;
    }

    public void setOcorrencias(Ocorrencias ocorrencias) {
        this.ocorrencias = ocorrencias;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoAlerta)) {
            return false;
        }
        return id != null && id.equals(((TipoAlerta) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TipoAlerta{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
