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
 * A Ocorrencias.
 */
@Document(collection = "ocorrencias")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "ocorrencias")
public class Ocorrencias implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private String id;

    @Field("descricao")
    private String descricao;

    @DBRef
    @Field("tipoAlerta")
    private Set<TipoAlerta> tipoAlertas = new HashSet<>();

    @DBRef
    @Field("nivelSituacao")
    @JsonIgnoreProperties("ocorrencias")
    private NivelSituacao nivelSituacao;

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

    public Ocorrencias descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<TipoAlerta> getTipoAlertas() {
        return tipoAlertas;
    }

    public Ocorrencias tipoAlertas(Set<TipoAlerta> tipoAlertas) {
        this.tipoAlertas = tipoAlertas;
        return this;
    }

    public Ocorrencias addTipoAlerta(TipoAlerta tipoAlerta) {
        this.tipoAlertas.add(tipoAlerta);
        tipoAlerta.setOcorrencias(this);
        return this;
    }

    public Ocorrencias removeTipoAlerta(TipoAlerta tipoAlerta) {
        this.tipoAlertas.remove(tipoAlerta);
        tipoAlerta.setOcorrencias(null);
        return this;
    }

    public void setTipoAlertas(Set<TipoAlerta> tipoAlertas) {
        this.tipoAlertas = tipoAlertas;
    }

    public NivelSituacao getNivelSituacao() {
        return nivelSituacao;
    }

    public Ocorrencias nivelSituacao(NivelSituacao nivelSituacao) {
        this.nivelSituacao = nivelSituacao;
        return this;
    }

    public void setNivelSituacao(NivelSituacao nivelSituacao) {
        this.nivelSituacao = nivelSituacao;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ocorrencias)) {
            return false;
        }
        return id != null && id.equals(((Ocorrencias) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Ocorrencias{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
