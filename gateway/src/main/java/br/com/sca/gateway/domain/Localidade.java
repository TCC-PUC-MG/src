package br.com.sca.gateway.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * A Localidade.
 */
@Document(collection = "localidade")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "localidade")
public class Localidade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private String id;

    @Field("nome")
    private String nome;

    @Field("latitute")
    private BigDecimal latitute;

    @Field("longitude")
    private BigDecimal longitude;

    @DBRef
    @Field("minaExtracao")
    private Set<MinaExtracao> minaExtracaos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Localidade nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public BigDecimal getLatitute() {
        return latitute;
    }

    public Localidade latitute(BigDecimal latitute) {
        this.latitute = latitute;
        return this;
    }

    public void setLatitute(BigDecimal latitute) {
        this.latitute = latitute;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public Localidade longitude(BigDecimal longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public Set<MinaExtracao> getMinaExtracaos() {
        return minaExtracaos;
    }

    public Localidade minaExtracaos(Set<MinaExtracao> minaExtracaos) {
        this.minaExtracaos = minaExtracaos;
        return this;
    }

    public Localidade addMinaExtracao(MinaExtracao minaExtracao) {
        this.minaExtracaos.add(minaExtracao);
        minaExtracao.setLocalidade(this);
        return this;
    }

    public Localidade removeMinaExtracao(MinaExtracao minaExtracao) {
        this.minaExtracaos.remove(minaExtracao);
        minaExtracao.setLocalidade(null);
        return this;
    }

    public void setMinaExtracaos(Set<MinaExtracao> minaExtracaos) {
        this.minaExtracaos = minaExtracaos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Localidade)) {
            return false;
        }
        return id != null && id.equals(((Localidade) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Localidade{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", latitute=" + getLatitute() +
            ", longitude=" + getLongitude() +
            "}";
    }
}
