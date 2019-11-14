package br.com.sca.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.sca.gateway.web.rest.TestUtil;

public class NivelSegurancaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NivelSeguranca.class);
        NivelSeguranca nivelSeguranca1 = new NivelSeguranca();
        nivelSeguranca1.setId("id1");
        NivelSeguranca nivelSeguranca2 = new NivelSeguranca();
        nivelSeguranca2.setId(nivelSeguranca1.getId());
        assertThat(nivelSeguranca1).isEqualTo(nivelSeguranca2);
        nivelSeguranca2.setId("id2");
        assertThat(nivelSeguranca1).isNotEqualTo(nivelSeguranca2);
        nivelSeguranca1.setId(null);
        assertThat(nivelSeguranca1).isNotEqualTo(nivelSeguranca2);
    }
}
