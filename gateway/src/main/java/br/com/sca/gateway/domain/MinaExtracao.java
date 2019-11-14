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
 * A MinaExtracao.
 */
@Document(collection = "mina_extracao")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "minaextracao")
public class MinaExtracao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private String id;

    @Field("tamanho")
    private String tamanho;

    @DBRef
    @Field("barragem")
    private Set<Barragem> barragems = new HashSet<>();

    @DBRef
    @Field("localidade")
    @JsonIgnoreProperties("minaExtracaos")
    private Localidade localidade;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTamanho() {
        return tamanho;
    }

    public MinaExtracao tamanho(String tamanho) {
        this.tamanho = tamanho;
        return this;
    }

    public void setTamanho(String tamanho) {
        this.tamanho = tamanho;
    }

    public Set<Barragem> getBarragems() {
        return barragems;
    }

    public MinaExtracao barragems(Set<Barragem> barragems) {
        this.barragems = barragems;
        return this;
    }

    public MinaExtracao addBarragem(Barragem barragem) {
        this.barragems.add(barragem);
        barragem.setMinaExtracao(this);
        return this;
    }

    public MinaExtracao removeBarragem(Barragem barragem) {
        this.barragems.remove(barragem);
        barragem.setMinaExtracao(null);
        return this;
    }

    public void setBarragems(Set<Barragem> barragems) {
        this.barragems = barragems;
    }

    public Localidade getLocalidade() {
        return localidade;
    }

    public MinaExtracao localidade(Localidade localidade) {
        this.localidade = localidade;
        return this;
    }

    public void setLocalidade(Localidade localidade) {
        this.localidade = localidade;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MinaExtracao)) {
            return false;
        }
        return id != null && id.equals(((MinaExtracao) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MinaExtracao{" +
            "id=" + getId() +
            ", tamanho='" + getTamanho() + "'" +
            "}";
    }
}
