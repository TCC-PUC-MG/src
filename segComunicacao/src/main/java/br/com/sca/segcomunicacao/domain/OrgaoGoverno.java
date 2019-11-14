package br.com.sca.segcomunicacao.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A OrgaoGoverno.
 */
@Document(collection = "orgao_governo")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "orgaogoverno")
public class OrgaoGoverno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private String id;

    @Field("descricao")
    private String descricao;

    @Field("pessoa_contato")
    private String pessoaContato;

    @Field("telefone")
    private String telefone;

    @DBRef
    @Field("alertaOrgao")
    private Set<AlertaOrgao> alertaOrgaos = new HashSet<>();

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

    public OrgaoGoverno descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getPessoaContato() {
        return pessoaContato;
    }

    public OrgaoGoverno pessoaContato(String pessoaContato) {
        this.pessoaContato = pessoaContato;
        return this;
    }

    public void setPessoaContato(String pessoaContato) {
        this.pessoaContato = pessoaContato;
    }

    public String getTelefone() {
        return telefone;
    }

    public OrgaoGoverno telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Set<AlertaOrgao> getAlertaOrgaos() {
        return alertaOrgaos;
    }

    public OrgaoGoverno alertaOrgaos(Set<AlertaOrgao> alertaOrgaos) {
        this.alertaOrgaos = alertaOrgaos;
        return this;
    }

    public OrgaoGoverno addAlertaOrgao(AlertaOrgao alertaOrgao) {
        this.alertaOrgaos.add(alertaOrgao);
        alertaOrgao.setOrgaoGoverna(this);
        return this;
    }

    public OrgaoGoverno removeAlertaOrgao(AlertaOrgao alertaOrgao) {
        this.alertaOrgaos.remove(alertaOrgao);
        alertaOrgao.setOrgaoGoverna(null);
        return this;
    }

    public void setAlertaOrgaos(Set<AlertaOrgao> alertaOrgaos) {
        this.alertaOrgaos = alertaOrgaos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrgaoGoverno)) {
            return false;
        }
        return id != null && id.equals(((OrgaoGoverno) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OrgaoGoverno{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", pessoaContato='" + getPessoaContato() + "'" +
            ", telefone='" + getTelefone() + "'" +
            "}";
    }
}
