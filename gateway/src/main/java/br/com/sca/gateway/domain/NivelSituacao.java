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
 * A NivelSituacao.
 */
@Document(collection = "nivel_situacao")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "nivelsituacao")
public class NivelSituacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private String id;

    @Field("descricao")
    private String descricao;

    @DBRef
    @Field("ocorrencias")
    private Set<Ocorrencias> ocorrencias = new HashSet<>();

    @DBRef
    @Field("nivelSeguranca")
    @JsonIgnoreProperties("nivelSituacaos")
    private NivelSeguranca nivelSeguranca;

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

    public NivelSituacao descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<Ocorrencias> getOcorrencias() {
        return ocorrencias;
    }

    public NivelSituacao ocorrencias(Set<Ocorrencias> ocorrencias) {
        this.ocorrencias = ocorrencias;
        return this;
    }

    public NivelSituacao addOcorrencias(Ocorrencias ocorrencias) {
        this.ocorrencias.add(ocorrencias);
        ocorrencias.setNivelSituacao(this);
        return this;
    }

    public NivelSituacao removeOcorrencias(Ocorrencias ocorrencias) {
        this.ocorrencias.remove(ocorrencias);
        ocorrencias.setNivelSituacao(null);
        return this;
    }

    public void setOcorrencias(Set<Ocorrencias> ocorrencias) {
        this.ocorrencias = ocorrencias;
    }

    public NivelSeguranca getNivelSeguranca() {
        return nivelSeguranca;
    }

    public NivelSituacao nivelSeguranca(NivelSeguranca nivelSeguranca) {
        this.nivelSeguranca = nivelSeguranca;
        return this;
    }

    public void setNivelSeguranca(NivelSeguranca nivelSeguranca) {
        this.nivelSeguranca = nivelSeguranca;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NivelSituacao)) {
            return false;
        }
        return id != null && id.equals(((NivelSituacao) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "NivelSituacao{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
