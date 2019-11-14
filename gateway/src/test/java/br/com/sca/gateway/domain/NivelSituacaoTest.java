package br.com.sca.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.sca.gateway.web.rest.TestUtil;

public class NivelSituacaoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NivelSituacao.class);
        NivelSituacao nivelSituacao1 = new NivelSituacao();
        nivelSituacao1.setId("id1");
        NivelSituacao nivelSituacao2 = new NivelSituacao();
        nivelSituacao2.setId(nivelSituacao1.getId());
        assertThat(nivelSituacao1).isEqualTo(nivelSituacao2);
        nivelSituacao2.setId("id2");
        assertThat(nivelSituacao1).isNotEqualTo(nivelSituacao2);
        nivelSituacao1.setId(null);
        assertThat(nivelSituacao1).isNotEqualTo(nivelSituacao2);
    }
}
