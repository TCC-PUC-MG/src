package br.com.sca.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.sca.gateway.web.rest.TestUtil;

public class OcorrenciasTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ocorrencias.class);
        Ocorrencias ocorrencias1 = new Ocorrencias();
        ocorrencias1.setId("id1");
        Ocorrencias ocorrencias2 = new Ocorrencias();
        ocorrencias2.setId(ocorrencias1.getId());
        assertThat(ocorrencias1).isEqualTo(ocorrencias2);
        ocorrencias2.setId("id2");
        assertThat(ocorrencias1).isNotEqualTo(ocorrencias2);
        ocorrencias1.setId(null);
        assertThat(ocorrencias1).isNotEqualTo(ocorrencias2);
    }
}
