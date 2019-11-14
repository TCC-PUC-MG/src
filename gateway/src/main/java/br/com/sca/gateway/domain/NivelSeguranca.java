package br.com.sca.gateway.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A NivelSeguranca.
 */
@Document(collection = "nivel_seguranca")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "nivelseguranca")
public class NivelSeguranca implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private String id;

    @Field("nivel")
    private String nivel;

    @Field("descricao")
    private String descricao;

    @DBRef
    @Field("nivelSituacao")
    private Set<NivelSituacao> nivelSituacaos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNivel() {
        return nivel;
    }

    public NivelSeguranca nivel(String nivel) {
        this.nivel = nivel;
        return this;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    public String getDescricao() {
        return descricao;
    }

    public NivelSeguranca descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<NivelSituacao> getNivelSituacaos() {
        return nivelSituacaos;
    }

    public NivelSeguranca nivelSituacaos(Set<NivelSituacao> nivelSituacaos) {
        this.nivelSituacaos = nivelSituacaos;
        return this;
    }

    public NivelSeguranca addNivelSituacao(NivelSituacao nivelSituacao) {
        this.nivelSituacaos.add(nivelSituacao);
        nivelSituacao.setNivelSeguranca(this);
        return this;
    }

    public NivelSeguranca removeNivelSituacao(NivelSituacao nivelSituacao) {
        this.nivelSituacaos.remove(nivelSituacao);
        nivelSituacao.setNivelSeguranca(null);
        return this;
    }

    public void setNivelSituacaos(Set<NivelSituacao> nivelSituacaos) {
        this.nivelSituacaos = nivelSituacaos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NivelSeguranca)) {
            return false;
        }
        return id != null && id.equals(((NivelSeguranca) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "NivelSeguranca{" +
            "id=" + getId() +
            ", nivel='" + getNivel() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
